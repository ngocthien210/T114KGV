import {ADD_POST, GET_POSTS, POST_LOADING,DELETE_POST,GET_POST} from '../actions/types';

const initialState = {
    posts: [],
    post:{},
    loading:false
};

export default function(state = initialState,action){
    switch(action.type){
        case ADD_POST:
            return{
                ...state,
                posts: [action.data,...state.posts]
            }
        case POST_LOADING:
            return{
                ...state,
                loading: true
            } 
        case GET_POSTS:
            return{
                ...state,
                posts: action.data,
                loading: false
            }  
        case GET_POST:
            return{
                ...state,
                post: action.data,
                loading: false
            }     
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post=>post._id !== action.data)
            }                 
        default:
            return state;
    }
}