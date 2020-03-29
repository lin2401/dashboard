import { ICandidate, CandidateModificationStatus } from "../models/candidate.interface";
export const ADD_CANDIDATE: string = "ADD_CANDIDATE";
export const EDIT_CANDIDATE: string = "EDIT_CANDIDATE";
export const REMOVE_CANDIDATE: string = "REMOVE_CANDIDATER";
export const CHANGE_CANDIDATE_AMOUNT: string = "CHANGE_CANDIDATE_AMOUNT";
export const CHANGE_CANDIDATE_PENDING_EDIT: string = "CHANGE_CANDIDATE_PENDING_EDIT";
export const CLEAR_CANDIDATE_PENDING_EDIT: string = "CLEAR_CANDIDATE_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";

export function addCandidate(candidate: ICandidate): IAddCandidateActionType {
    return { type: ADD_CANDIDATE, candidate: candidate };
}

export function editCandidate(candidate: ICandidate): IEditCandidateActionType {
    return { type: EDIT_CANDIDATE, candidate: candidate };
}

export function removeCandidate(id: number): IRemoveCandidateActionType {
    return { type: REMOVE_CANDIDATE, id: id };
}

export function changeCandidateAmount(id: number, amount: number): IChangeCandidateAmountType {
    return { type: CHANGE_CANDIDATE_AMOUNT, id: id, amount: amount };
}

export function changeSelectedCandidate(candidate: ICandidate): IChangeSelectedCandidateActionType {
    return { type: CHANGE_CANDIDATE_PENDING_EDIT, candidate: candidate };
}

export function clearSelectedCandidate(): IClearSelectedCandidateActionType {
    return { type: CLEAR_CANDIDATE_PENDING_EDIT };
}

export function setModificationState(value: CandidateModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddCandidateActionType { type: string, candidate: ICandidate };
interface IEditCandidateActionType { type: string, candidate: ICandidate };
interface IRemoveCandidateActionType { type: string, id: number };
interface IChangeSelectedCandidateActionType { type: string, candidate: ICandidate };
interface IClearSelectedCandidateActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  CandidateModificationStatus};
interface IChangeCandidateAmountType {type: string, id: number, amount: number};