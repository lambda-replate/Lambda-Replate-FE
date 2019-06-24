import { axiosWithAuth } from '../utilities/axiosWithAuth';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = creds => dispatch => {
    dispatch({ type: LOGIN_START });
    return axiosWithAuth()
        .post('/auth/business/login', creds)
        .then(res => {
            console.log(res);
            localStorage.setItem('jwt', res.data.token);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data.user });
            return true;
        })
        .catch(err => console.log(`I can't let you do that, StarFox.`, err));
};

export const SIGNUP = 'SIGNUP';

export const signup = (newBusiness, userType) => dispatch => {
    dispatch({ type: SIGNUP });
    return axiosWithAuth()
        .post(`/auth/${userType}/register`, newBusiness)
        .then(res => {
            localStorage.setItem('jwt', res.data.token)
            dispatch({ type: SIGNUP, payload: res.data.token})
        })
        .catch(err => {
            console.log('New Business ERR: ', err)
        });
};
