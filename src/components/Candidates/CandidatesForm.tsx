import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, ICandidateState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ICandidate, CandidateModificationStatus } from "../../store/models/candidate.interface";
import TextInput from "../../common/components/TextInput";
import { editCandidate, clearSelectedCandidate, setModificationState, addCandidate } from "../../store/actions/candidates.action";
import { addNotification } from "../../store/actions/notifications.action";
import NumberInput from "../../common/components/NumberInput";

import SelectInput from "../../common/components/Select";
import { OnChangeModel, ICandidateFormState } from "../../common/types/Form.types";

const CandidateForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const candidates: ICandidateState | null = useSelector((state: IStateType) => state.candidates);
  let candidate: ICandidate | null = candidates.selectedCandidate;
  const isCreate: boolean = (candidates.modificationState === CandidateModificationStatus.Create);
  
  if (!candidate || isCreate) {
    candidate = { id: 0, name: "", description: "",  experience: "", category: "" };
  }

  const [formState, setFormState] = useState({
    name: { error: "", value: candidate.name },
    description: { error: "", value: candidate.description },
    experience: { error: "", value: candidate.experience },
    
    category: { error: "", value: candidate.category }
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function saveUser(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }

    let saveUserFn: Function = (isCreate) ? addCandidate : editCandidate;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: ICandidateFormState, saveFn: Function): void {
    if (candidate) {
      dispatch(saveFn({
        ...candidate,
        name: formState.name.value,
        description: formState.description.value,
        experience: formState.experience.value,
        
        
        category: formState.category.value
      }));

      dispatch(addNotification("Candidate edited", `Candidate ${formState.name.value} edited by you`));
      dispatch(clearSelectedCandidate());
      dispatch(setModificationState(CandidateModificationStatus.None));
    }
  }

  function cancelForm(): void {
    dispatch(setModificationState(CandidateModificationStatus.None));
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
            <h6 className="m-0 font-weight-bold text-green">Candidate {(isCreate ? "create" : "edit")}</h6>
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
                    options={["Developper", "Designer", "Business Analyst"]}
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

export default CandidateForm;
