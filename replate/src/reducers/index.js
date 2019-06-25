import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP,
    ADD_FOOD,
} from '../actions';

const initialState = {
    foods: [],
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
        case ADD_FOOD:
            return{
                ...state,
                foods: [...state.foods, action.payload]
            }
        default:
        return state;
    }
};

export default reducer;
