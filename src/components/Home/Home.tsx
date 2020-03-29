import React, { Fragment, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TopCard from "../../common/components/TopCard";
import { IOfferState, IStateType } from "../../store/models/root.interface";
import OfferList from "../Offers/OffersList";

const Home: React.FC = () => {
  const offers: IOfferState = useSelector((state: IStateType) => state.offers);
  const numberItemsCount: number = offers.offers.length;
  


  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("home", ""));

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Dashboard</h1>
      <p className="mb-4">Summary and overview of our admin stuff here</p>

      <div className="row">
        <TopCard title="OFFER COUNT" text={`${numberItemsCount}`} icon="box" class="primary" />
        
      </div>

      

      <div className="row">

        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Offer list</h6>
            </div>
            <div className="card-body">
              <OfferList />
            </div>
          </div>

        </div>

        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Order list</h6>
            </div>
            <div className="card-body">
              
            </div>
          </div>
        </div>

      </div>

    </Fragment>
  );
};

export default Home;
