export interface ICandidate {
    id: number;
    name: string;
    category: string;
    description: string;
    experience: string;
    
}

export enum CandidateModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}