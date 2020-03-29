import { IOffer, OfferModificationStatus } from "./offer.interface";
import { ICandidate, CandidateModificationStatus } from "./candidate.interface";
import { INotification } from "./notification.interface";
import { IUser } from "./user.interface";
import { IAccount } from "./account.interface";

export interface IRootPageStateType {
    area: string;
    subArea: string;
}

export interface IRootStateType {
    page: IRootPageStateType;
}
export interface IStateType {
    root: IRootStateType;
    offers: IOfferState;
    candidates : ICandidateState;
    notifications: INotificationState;
    users: IUserState;
    account: IAccount;
}

export interface IOfferState {
    offers: IOffer[];
    selectedOffer: IOffer | null;
    modificationState: OfferModificationStatus;
}

export interface ICandidateState {
    candidates: ICandidate[];
    selectedCandidate: ICandidate | null;
    modificationState: CandidateModificationStatus;
}

export interface IActionBase {
    type: string;
    [prop: string]: any;
}



export interface INotificationState {
    notifications: INotification[];
}

export interface IUserState {
    users: IUser[];
    admins: IUser[];
}