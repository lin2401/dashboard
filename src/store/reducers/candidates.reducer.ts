import { ICandidateState, IActionBase } from "../models/root.interface";
import { ADD_CANDIDATE, CHANGE_CANDIDATE_PENDING_EDIT, EDIT_CANDIDATE, REMOVE_CANDIDATE,
    CLEAR_CANDIDATE_PENDING_EDIT, SET_MODIFICATION_STATE} from "../actions/candidates.action";
import { ICandidate, CandidateModificationStatus } from "../models/candidate.interface";



const initialState: ICandidateState = {
    modificationState: CandidateModificationStatus.None,
    selectedCandidate: null,
    candidates: [{
        id: 1, name: "PALJOR", description: "Developpeur Java",
        experience: "5 ans", category: "Developper"
    },
    {
        id: 2, name: "MIHA", description: "Developpeur React JS",
        experience: "2 ans", category: "Developper"
    },
    {
        id: 3, name: "ABDOULAYE", description: "Developpeur Java",
        experience: "3 ans", category: "Developper"
    },
    {
        id: 4, name: "FATIMA", description: "Developpeur J2EE",
        experience: "1 an", category: "Developper"
    },
    ]
};

function candidateReducer(state: ICandidateState = initialState, action: IActionBase): ICandidateState {
    switch (action.type) {
        case ADD_CANDIDATE: {
            let maxId: number = Math.max.apply(Math, state.candidates.map(function(o) { return o.id; }));
            action.candidate.id = maxId + 1;
            return { ...state, candidates: [...state.candidates, action.candidates]};
        }
        case EDIT_CANDIDATE: {
            const foundIndex: number = state.candidates.findIndex(pr => pr.id === action.candidate.id);
            let candidates: ICandidate[] = state.candidates;
            candidates[foundIndex] = action.candidate;
            return { ...state, candidates: candidates };
        }
        case REMOVE_CANDIDATE: {
            return { ...state, candidates: state.candidates.filter(pr => pr.id !== action.id) };
        }
        case CHANGE_CANDIDATE_PENDING_EDIT: {
            return { ...state, selectedCandidate: action.candidate };
        }
        case CLEAR_CANDIDATE_PENDING_EDIT: {
            return { ...state, selectedCandidate: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        
        default:
            return state;
    }
}


export default candidateReducer;