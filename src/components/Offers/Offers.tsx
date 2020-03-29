import React, { Fragment, Dispatch, useState, useEffect } from "react";
import OfferList from "./OffersList";
import OfferForm from "./OffersForm";
import TopCard from "../../common/components/TopCard";
import "./Offers.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IOfferState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import { removeOffer, clearSelectedOffer, setModificationState,
  changeSelectedOffer } from "../../store/actions/offers.action";
import { addNotification } from "../../store/actions/notifications.action";
import { OfferModificationStatus, IOffer } from "../../store/models/offer.interface";

const Offers: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const offers: IOfferState = useSelector((state: IStateType) => state.offers);
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  const numberItemsCount: number = offers.offers.length;
  
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    dispatch(clearSelectedOffer());
    dispatch(updateCurrentPath("offers", "list"));
  }, [path.area, dispatch]);

  function onOfferSelect(offer: IOffer): void {
    dispatch(changeSelectedOffer(offer));
    dispatch(setModificationState(OfferModificationStatus.None));
  }

  function onOfferRemove() {
    if(offers.selectedOffer) {
      setPopup(true);
    }
  }

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Offers</h1>
      <p className="mb-4">Offers here</p>
      <div className="row">
        <TopCard title="OFFER COUNT" text={`${numberItemsCount}`} icon="box" class="primary" />
        
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Offer List</h6>
              <div className="header-buttons">
                <button className="btn btn-success btn-green" onClick={() =>
                  dispatch(setModificationState(OfferModificationStatus.Create))}>
                  <i className="fas fa fa-plus"></i>
                </button>
                <button className="btn btn-success btn-blue" onClick={() =>
                  dispatch(setModificationState(OfferModificationStatus.Edit))}>
                  <i className="fas fa fa-pen"></i>
                </button>
                <button className="btn btn-success btn-red" onClick={() => onOfferRemove()}>
                  <i className="fas fa fa-times"></i>
                </button>
              </div>
            </div>
            <div className="card-body">
              <OfferList
                onSelect={onOfferSelect}
              />
            </div>
          </div>
        </div>
        {((offers.modificationState === OfferModificationStatus.Create)
          || (offers.modificationState === OfferModificationStatus.Edit && offers.selectedOffer)) ?
          <OfferForm /> : null}
      </div>


      <Popup
        className="popup-modal"
        open={popup}
        onClose={() => setPopup(false)}
        closeOnDocumentClick
      >
        <div className="popup-modal">
          <div className="popup-title">
            Are you sure?
          </div>
          <div className="popup-content">
            <button type="button"
              className="btn btn-danger"
              onClick={() => {
                if (!offers.selectedOffer) {
                  return;
                }
                dispatch(addNotification("Offer removed", `Offer ${offers.selectedOffer.name} was removed`));
                dispatch(removeOffer(offers.selectedOffer.id));
                dispatch(clearSelectedOffer());
                setPopup(false);
              }}>Remove
              </button>
          </div>
        </div>
      </Popup>
    </Fragment >
  );
};

export default Offers;
