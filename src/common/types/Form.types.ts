


export type OnChangeModel = {
    value: string | number | boolean,
    error: string,
    touched: boolean,
    field: string
};

export interface IFormStateField<T> {error: string, value: T};

export interface IOfferFormState {
    name: IFormStateField<string>;
    description: IFormStateField<string>;
    experience: IFormStateField<string>;
     
    category: IFormStateField<string>;
}

export interface ICandidateFormState {
    name: IFormStateField<string>;
    description: IFormStateField<string>;
    experience: IFormStateField<string>;
    
    
    category: IFormStateField<string>;
}

