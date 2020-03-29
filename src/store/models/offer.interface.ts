export interface IOffer {
    id: number;
    name: string;
    category: string;
    description: string;
    experience: string;
    
    
}

export enum OfferModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2
}