import React, { Fragment, Dispatch, useState, useEffect } from "react";
import CandidateList from "./CandidatesList";
import CandidateForm from "./CandidatesForm";
import TopCard from "../../common/components/TopCard";
import "./Candidates.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { ICandidateState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import { removeCandidate, clearSelectedCandidate, setModificationState,
  changeSelectedCandidate } from "../../store/actions/candidates.action";
import { addNotification } from "../../store/actions/notifications.action";
import { CandidateModificationStatus, ICandidate } from "../../store/models/candidate.interface";

const Candidates: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const candidates: ICandidateState = useSelector((state: IStateType) => state.candidates);
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  const numberItemsCount: number = candidates.candidates.length;
  
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    dispatch(clearSelectedCandidate());
    dispatch(updateCurrentPath("candidates", "list"));
  }, [path.area, dispatch]);

  function onCandidateSelect(candidate: ICandidate): void {
    dispatch(changeSelectedCandidate(candidate));
    dispatch(setModificationState(CandidateModificationStatus.None));
  }

  function onCandidateRemove() {
    if(candidates.selectedCandidate) {
      setPopup(true);
    }
  }

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Candidates</h1>
      <p className="mb-4">Candidates here</p>
      <div className="row">
        <TopCard title="CANDIDATE COUNT" text={`${numberItemsCount}`} icon="box" class="primary" />
        
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Candidate List</h6>
              <div className="header-buttons">
                <button className="btn btn-success btn-green" onClick={() =>
                  dispatch(setModificationState(CandidateModificationStatus.Create))}>
                  <i className="fas fa fa-plus"></i>
                </button>
                <button className="btn btn-success btn-blue" onClick={() =>
                  dispatch(setModificationState(CandidateModificationStatus.Edit))}>
                  <i className="fas fa fa-pen"></i>
                </button>
                <button className="btn btn-success btn-red" onClick={() => onCandidateRemove()}>
                  <i className="fas fa fa-times"></i>
                </button>
              </div>
            </div>
            <div className="card-body">
              <CandidateList
                onSelect={onCandidateSelect}
              />
            </div>
          </div>
        </div>
        {((candidates.modificationState === CandidateModificationStatus.Create)
          || (candidates.modificationState === CandidateModificationStatus.Edit && candidates.selectedCandidate)) ?
          <CandidateForm /> : null}
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
                if (!candidates.selectedCandidate) {
                  return;
                }
                dispatch(addNotification("Candidate removed", `Candidate ${candidates.selectedCandidate.name} was removed`));
                dispatch(removeCandidate(candidates.selectedCandidate.id));
                dispatch(clearSelectedCandidate());
                setPopup(false);
              }}>Remove
              </button>
          </div>
        </div>
      </Popup>
    </Fragment >
  );
};

export default Candidates;
