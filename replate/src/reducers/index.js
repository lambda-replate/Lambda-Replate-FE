import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    BUSINESS_SIGNUP,
    VOLUNTEER_SIGNUP,
} from '../actions';

const initialState = {
    foodInstance: [],
    error: '',
    loggingIn: false,
    fetchingData: false,
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_START:
            return{
                ...state,
                error: '',
                loggingIn: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                error: '',
                loggingIn: false,
            }
        default:
        return state;
    }
};

export default reducer;
