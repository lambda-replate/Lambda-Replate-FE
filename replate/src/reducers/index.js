import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP,
} from '../actions';

const initialState = {
    foodInstance: [],
    user: {},
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
                user: {...action.payload}
            }
        case SIGNUP:
            return{
               ...state,
               error: '',
               loggingIn: false,
               user: {...action.payload} 
            }
        default:
        return state;
    }
};

export default reducer;
