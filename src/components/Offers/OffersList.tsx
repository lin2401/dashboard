import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IOfferState } from "../../store/models/root.interface";
import { IOffer } from "../../store/models/offer.interface";

export type offerListProps = {
  onSelect?: (offer: IOffer) => void;
  children?: React.ReactNode;
};

function OfferList(props: offerListProps): JSX.Element  {
  const offers: IOfferState = useSelector((state: IStateType) => state.offers);

  const offerElements: (JSX.Element | null)[] = offers.offers.map(offer => {
    if (!offer) { return null; }
    return (<tr className={`table-row ${(offers.selectedOffer && offers.selectedOffer.id === offer.id) ? "selected" : ""}`}
      onClick={() => {
        if(props.onSelect) props.onSelect(offer);
      }}
      key={`offer${offer.id}`}>
      <th scope="row">{offer.id}</th>
      <td>{offer.name}</td>
      <td>{offer.category}</td>
      <td>{offer.experience}</td>
      
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Experience</th>
            
          </tr>
        </thead>
        <tbody>
          {offerElements}
        </tbody>
      </table>
    </div>

  );
}

export default OfferList;
