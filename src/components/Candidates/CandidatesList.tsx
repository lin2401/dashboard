import React from "react";
import { useSelector } from "react-redux";
import { IStateType, ICandidateState } from "../../store/models/root.interface";
import { ICandidate } from "../../store/models/candidate.interface";

export type candidateListProps = {
  onSelect?: (candidate: ICandidate) => void;
  children?: React.ReactNode;
};

function CandidateList(props: candidateListProps): JSX.Element  {
  const candidates: ICandidateState = useSelector((state: IStateType) => state.candidates);

  const candidateElements: (JSX.Element | null)[] = candidates.candidates.map(candidate => {
    if (!candidate) { return null; }
    return (<tr className={`table-row ${(candidates.selectedCandidate && candidates.selectedCandidate.id === candidate.id) ? "selected" : ""}`}
      onClick={() => {
        if(props.onSelect) props.onSelect(candidate);
      }}
      key={`candidate${candidate.id}`}>
      <th scope="row">{candidate.id}</th>
      <td>{candidate.name}</td>
      <td>{candidate.category}</td>
      <td>{candidate.experience}</td>
      
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
          {candidateElements}
        </tbody>
      </table>
    </div>

  );
}

export default CandidateList;
