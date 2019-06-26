import { axiosWithAuth } from '../utilities/axiosWithAuth';
//import '../utilities/addInterceptor';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (userType, creds) => dispatch => {
    dispatch({ type: LOGIN_START });
    return axiosWithAuth()
        .post(`/auth/${userType}/login`, creds)
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

export const addFood = (newFood, proppedFunction) => dispatch => {
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
        proppedFunction();
    })
    .catch(err => {
        console.log('ERROR on ADD: ', err);
    });
};

export const DELETE_FOOD = 'DELETE_FOOD';

export const deleteFood = (id, proppedFunction) => dispatch => {
    const token = localStorage.getItem('jwt');
    const requestConfig = {
        headers: {
            Authorization: token
        }
    }
    return axiosWithAuth()
    .delete(`/food/${id}`, requestConfig)
    .then(res => {
        console.log(res);
        dispatch({ type: DELETE_FOOD, payload: res.data})
        proppedFunction();
    })
    .catch(err => {
        console.log(err)
    })
};

export const updateFood = (updatedFood, id, proppedFunction) => dispatch => {
        const token = localStorage.getItem('jwt');
        const requestConfig = {
            headers: {
                Authorization: token
            }
        }
        return axiosWithAuth()
        .put(`/food/${id}`, updatedFood, requestConfig)
        .then(res => {
            console.log(res);
            dispatch({ type: DELETE_FOOD, payload: res.data})
            proppedFunction();
        })
        .catch(err => {
            console.log(err)
        })
    };

    export const claimFood = (id, claimStatus, proppedFunction) => dispatch => {
        const token = localStorage.getItem('jwt');
        const requestConfig = {
            headers: {
                Authorization: token
            }
        }
        return axiosWithAuth()
        .put(`/food/claim/${id}`, claimStatus, requestConfig)
        .then(res => {
            console.log(res);
            dispatch({ type: DELETE_FOOD, payload: res.data});
            proppedFunction();

        })
        .catch(err => {
            console.log(err)
        })
    };