
export interface IStore {
    [key: string]: any;
};

export interface IAction {
    type: string,
    payload: any
};

export interface ICard {
    "description": string;
    "end_date": string;
    "finished": boolean;
    "id": number;
    "required_time": string;
    "start_date": string;
    "title": string;
};

export type ICards = ICard[];