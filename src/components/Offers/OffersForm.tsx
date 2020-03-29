import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IOfferState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IOffer, OfferModificationStatus } from "../../store/models/offer.interface";
import TextInput from "../../common/components/TextInput";
import { editOffer, clearSelectedOffer, setModificationState, addOffer } from "../../store/actions/offers.action";
import { addNotification } from "../../store/actions/notifications.action";
import NumberInput from "../../common/components/NumberInput";

import SelectInput from "../../common/components/Select";
import { OnChangeModel, IOfferFormState } from "../../common/types/Form.types";

const OfferForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const offers: IOfferState | null = useSelector((state: IStateType) => state.offers);
  let offer: IOffer | null = offers.selectedOffer;
  const isCreate: boolean = (offers.modificationState === OfferModificationStatus.Create);
  
  if (!offer || isCreate) {
    offer = { id: 0, name: "", description: "", experience: "", category: "" };
  }

  const [formState, setFormState] = useState({
    name: { error: "", value: offer.name },
    description: { error: "", value: offer.description },
    
    experience: { error: "", value: offer.experience },
    
    category: { error: "", value: offer.category }
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function saveUser(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }

    let saveUserFn: Function = (isCreate) ? addOffer : editOffer;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: IOfferFormState, saveFn: Function): void {
    if (offer) {
      dispatch(saveFn({
        ...offer,
        name: formState.name.value,
        description: formState.description.value,
        experience: formState.experience.value,
       
       
        category: formState.category.value
      }));

      dispatch(addNotification("Offer edited", `Offer ${formState.name.value} edited by you`));
      dispatch(clearSelectedOffer());
      dispatch(setModificationState(OfferModificationStatus.None));
    }
  }

  function cancelForm(): void {
    dispatch(setModificationState(OfferModificationStatus.None));
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.description.error
      || formState.name.error || formState.experience.error
      || formState.category.error || !formState.name.value || !formState.category.value) as boolean;
}

  return (
    <Fragment>
      <div className="col-xl-7 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">Offer {(isCreate ? "create" : "edit")}</h6>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <TextInput id="input_email"
                    value={formState.name.value}
                    field="name"
                    onChange={hasFormValueChanged}
                    required={true}
                    maxLength={20}
                    label="Name"
                    placeholder="Name" />
                </div>
                <div className="form-group col-md-6">
                  <SelectInput
                    id="input_category"
                    field="category"
                    label="Category"
                    options={["Developper", "Designer", "Analyst"]}
                    required={true}
                    onChange={hasFormValueChanged}
                    value={formState.category.value}
                  />
                </div>
              </div>
              <div className="form-group">
                <TextInput id="input_description"
                field = "description"
                  value={formState.description.value}
                  onChange={hasFormValueChanged}
                  required={false}
                  maxLength={100}
                  label="Description"
                  placeholder="Description" />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  
                </div>
                <div className="form-group col-md-6">
                  <NumberInput id="input_price"
                    value={formState.experience.value}
                    field="experience"
                    onChange={hasFormValueChanged}
                    max={1000}
                    min={0}
                    label="Experience" />
                </div>
              </div>
              <div className="form-group">
                
              </div>
              <button className="btn btn-danger" onClick={() => cancelForm()}>Cancel</button>
              <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>Save</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OfferForm;
