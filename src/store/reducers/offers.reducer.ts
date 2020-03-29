import { IOfferState, IActionBase } from "../models/root.interface";
import { ADD_OFFER, CHANGE_OFFER_PENDING_EDIT, EDIT_OFFER, REMOVE_OFFER,
    CLEAR_OFFER_PENDING_EDIT, SET_MODIFICATION_STATE} from "../actions/offers.action";
import { IOffer, OfferModificationStatus } from "../models/offer.interface";



const initialState: IOfferState = {
    modificationState: OfferModificationStatus.None,
    selectedOffer: null,
    offers: [{
        id: 1, name: "Developer java", description: "5 ans",
        experience : "5 ans", category: "Developper"
    },
    {
        id: 2, name: "Developper React", description: "3 ans",
        experience : "5 ans", category: "Developper"
    },
    {
        id: 3, name: "Designer", description: "2 ans",
        experience : "5 ans", category: "Designer"
    },
    {
        id: 4, name: "Business Analyst", description: "6 ans",
        experience : "5 ans", category: "Business Analyst"
    },
    ]
};

function offersReducer(state: IOfferState = initialState, action: IActionBase): IOfferState {
    switch (action.type) {
        case ADD_OFFER: {
            let maxId: number = Math.max.apply(Math, state.offers.map(function(o) { return o.id; }));
            action.offer.id = maxId + 1;
            return { ...state, offers: [...state.offers, action.offer]};
        }
        case EDIT_OFFER: {
            const foundIndex: number = state.offers.findIndex(pr => pr.id === action.offer.id);
            let offers: IOffer[] = state.offers;
            offers[foundIndex] = action.offer;
            return { ...state, offers: offers };
        }
        case REMOVE_OFFER: {
            return { ...state, offers: state.offers.filter(pr => pr.id !== action.id) };
        }
        case CHANGE_OFFER_PENDING_EDIT: {
            return { ...state, selectedOffer: action.offer };
        }
        case CLEAR_OFFER_PENDING_EDIT: {
            return { ...state, selectedOffer: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        
        default:
            return state;
    }
}


export default offersReducer;