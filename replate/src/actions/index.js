import { axiosWithAuth } from '../utilities/axiosWithAuth';
//import '../utilities/addInterceptor';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = creds => dispatch => {
    dispatch({ type: LOGIN_START });
    return axiosWithAuth()
        .post('/auth/business/login', creds)
        .then(res => {
            console.log(res.data.user);
            localStorage.setItem('jwt', res.data.token);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data.user });
            return true;
        })
        .catch(err => console.log(`I can't let you do that, StarFox.`, err));
};

export const SIGNUP = 'SIGNUP';

export const signup = (newBusiness, userType) => dispatch => {
    dispatch({ type: SIGNUP });
    console.log('Signing Up', newBusiness)
    return axiosWithAuth()
        .post(`/auth/${userType}/register`, newBusiness)
        .then(res => {
            localStorage.setItem('jwt', res.data.token)
            dispatch({ type: LOGIN_SUCCESS, payload: res.data.user})
            return true;
        })
        .catch(err => {
            console.log('New Business ERR: ', err)
        });
};

export const ADD_FOOD = 'ADD_FOOD';

export const addFood = (newFood) => dispatch => {
    console.log(newFood);
    const token = localStorage.getItem('jwt');
    const requestConfig = {
        headers: {
            Authorization: token
        }
    }
    return axiosWithAuth()
    .post('/food', newFood, requestConfig)
    .then(res => {
        console.log('RESSSSSS', res);
        dispatch({ type: ADD_FOOD, payload: res.data})
    })
    .catch(err => {
        console.log('ERROR on ADD: ', err);
    });
};

