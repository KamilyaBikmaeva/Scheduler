import * as Constants from './constants';
import * as Interfaces from './interfaces';

const baseURL = 'http://localhost:4000/';

export const fetchUserData = () => async (dispatch: any) => {
    const url = baseURL + 'user';

    const userData = await fetch(url)
        .then(response => response.json())
        .then(data => data);

    dispatch({
        type: Constants.SET_USER_DATA,
        payload: userData
    });

    return userData;
};

export const fetchTasksList = () => async (dispatch: any) => {
    const url = baseURL + 'cards';
    const tasksList = await fetch(url)
        .then(response => response.json())
        .then(data => data);

    dispatch({
        type: Constants.SET_CARDS_LIST_DATA,
        payload: tasksList
    });

    return tasksList;
};

export const createNewCard = (newCard: Interfaces.ICard) => async (dispatch: any) => {
    // const url = baseURL + 'card';

    // const response = await fetch(url, {
    //     method: 'POST',
    //     body: JSON.stringify(newCard),
    //     headers: { 'Content-Type': 'application/json' }
    // });
};

export const loginUser = () => async (dispatch: any, getState: any) => {
    const userData = getState().userData;
    const currDate = String(new Date().getDate()).padStart(2, '0')
        + '.' + String(new Date().getMonth() + 1).padStart(2, '0')
        + '.' + new Date().getFullYear();

    const time = parseInt(userData.dayHours) * 3600;

    localStorage.setItem('timer', time.toString());
    localStorage.setItem('startDate', currDate);
    localStorage.setItem('startTime', '');
    localStorage.setItem('isTimerStarted', 'false');
    localStorage.setItem('isTimerOutdated', 'false');
    localStorage.setItem('userToken', 'userToken123');
};

export const logoutUser = () => async (dispatch: any, getState: any) => {
    localStorage.removeItem('timer');
    localStorage.removeItem('startDate');
    localStorage.removeItem('startTime');
    localStorage.removeItem('isTimerStarted');
    localStorage.removeItem('isTimerOutdated');
    localStorage.removeItem('userToken');
};


export const updateUserData = (timerData: any) => async (dispatch: any, getState: any) => {
    // here is the request for data updating
    const storeUser = getState().userData;

    storeUser.timer['started'] = timerData[0];
    storeUser.timer['time_left'] = timerData[1];

    console.log(storeUser)

    const url = baseURL + 'user';

    fetch(url, storeUser);
};

export const updateTaskData = (taskData: any) => async (dispatch: any, getState: any) => {
    console.log(taskData)
};