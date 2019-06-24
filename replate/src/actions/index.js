import { axiosWithAuth } from '../utilities/axiosWithAuth';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = creds => dispatch => {
    dispatch({ type: LOGIN_START });
    return axiosWithAuth()
        .post('/auth/business/login', creds)
        .then(res => {
            localStorage.setItem('jwt', res.data.token);
            dispatch({ type: LOGIN_SUCCESS });
            return true;
        })
        .catch(err => console.log(`I can't let you do that, StarFox.`, err));
};

export const BUSINESS_SIGNUP = 'BUSINESS_SIGNUP';

export const bizSignup = (newBusiness) => dispatch => {
    dispatch({ type: BUSINESS_SIGNUP });
    return axiosWithAuth()
        .post('/auth/business/register', newBusiness)
        .then(res => {
            localStorage.setItem('jwt', res.data.token)
            dispatch({ type: BUSINESS_SIGNUP, payload: res.data.token})
        })
        .catch(err => {
            console.log('New Business ERR: ', err)
        });
};

export const VOLUNTEER_SIGNUP = 'VOLUNTEER_SIGNUP';

export const volunteerSignup = (newVolunteer) => dispatch => {
    dispatch({ type: VOLUNTEER_SIGNUP });
    return axiosWithAuth()
        .post('/auth/volunteer/register', newVolunteer)
        .then(res => {
            localStorage.setItem('jwt', res.data.token)
            dispatch({ type: VOLUNTEER_SIGNUP, payload: res.data.token })
        })
        .catch(err => {
            console.log('New VOLUNTEER ERR: ', err)
        });
};