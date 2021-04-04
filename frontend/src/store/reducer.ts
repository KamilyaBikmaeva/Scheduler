import * as Constants from './constants';
import * as Interfaces from './interfaces';

interface IReducerReturnValue {
    [key: string]: any;
};

const reducer = (
    state: Interfaces.IStore = {},
    action: Interfaces.IAction
): IReducerReturnValue => {

    switch(action.type) {
        case Constants.SET_USER_DATA:
            return { ...state, userData: action.payload };

        case Constants.SET_CARD_DATA:
            return { ...state, cardData: action.payload };

        case Constants.SET_CARDS_LIST_DATA:
            return { ...state, cardsList: action.payload };

        default:
            return { ...state };
    }
};


export default reducer;