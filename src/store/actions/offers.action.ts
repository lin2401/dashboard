import { IOffer, OfferModificationStatus } from "../models/offer.interface";
export const ADD_OFFER: string = "ADD_OFFER";
export const EDIT_OFFER: string = "EDIT_OFFER";
export const REMOVE_OFFER: string = "REMOVE_OFFER";
export const CHANGE_OFFER_AMOUNT: string = "CHANGE_OFFER_AMOUNT";
export const CHANGE_OFFER_PENDING_EDIT: string = "CHANGE_OFFER_PENDING_EDIT";
export const CLEAR_OFFER_PENDING_EDIT: string = "CLEAR_OFFER_PENDING_EDIT";
export const SET_MODIFICATION_STATE: string = "SET_MODIFICATION_STATE";

export function addOffer(offer: IOffer): IAddOfferActionType {
    return { type: ADD_OFFER, offer: offer };
}

export function editOffer(offer: IOffer): IEditOfferActionType {
    return { type: EDIT_OFFER, offer: offer };
}

export function removeOffer(id: number): IRemoveOfferActionType {
    return { type: REMOVE_OFFER, id: id };
}

export function changeOfferAmount(id: number, amount: number): IChangeOfferAmountType {
    return { type: CHANGE_OFFER_AMOUNT, id: id, amount: amount };
}

export function changeSelectedOffer(offer: IOffer): IChangeSelectedOfferActionType {
    return { type: CHANGE_OFFER_PENDING_EDIT, offer: offer };
}

export function clearSelectedOffer(): IClearSelectedOfferActionType {
    return { type: CLEAR_OFFER_PENDING_EDIT };
}

export function setModificationState(value: OfferModificationStatus): ISetModificationStateActionType {
    return { type: SET_MODIFICATION_STATE, value: value };
}

interface IAddOfferActionType { type: string, offer: IOffer };
interface IEditOfferActionType { type: string, offer: IOffer };
interface IRemoveOfferActionType { type: string, id: number };
interface IChangeSelectedOfferActionType { type: string, offer: IOffer };
interface IClearSelectedOfferActionType { type: string };
interface ISetModificationStateActionType { type: string, value:  OfferModificationStatus};
interface IChangeOfferAmountType {type: string, id: number, amount: number};