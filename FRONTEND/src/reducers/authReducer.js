// import {TEST_DISPATCH} from '../actions/types';
// import {GET_ERRORS} from '../actions/types';
import isEmpty from '../validation/is-empty';
import {SET_CURRENT_USER} from '../actions/types';
const initialState = {
    isAuthenticated : false,
    user: {}
}
export default function(state = initialState,action){
    switch(action.type){
        case SET_CURRENT_USER:
            return {
              ...state,
              isAuthenticated: !isEmpty(action.data),
              user: action.data 
            };
        default: return state;    
    }
};