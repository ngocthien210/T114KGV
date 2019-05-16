import axios from 'axios';
import {GET_PROFILE,PROFILE_LOADING,GET_ERRORS,CLEAR_CURRENT_PROFILE, SET_CURRENT_USER} from './types';

// get current profile
export const getCurrentProfile = () =>dispatch =>{
    dispatch(setProfileLoading());
    axios.get('/api/profile')
    .then(res=>{
        dispatch({
            type: GET_PROFILE,
            data: res.data
        })
    })
    .catch(err =>{
        dispatch({
            // không cần nhận error
            type: GET_PROFILE,
            data: {}
        })
    })
}
// profile loading
export const setProfileLoading = ()=>{
    return {
        type: PROFILE_LOADING
    }
}
// Clear profile
export const clearCurrentProfile = ()=>{
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}
// Create profile
export const createProfile = (profileData,history) => dispatch =>{
    axios.post('/api/profile',profileData)
        .then(res=>history.push('/dashboard'))
        .catch(err => dispatch({
                type: GET_ERRORS,
                data: err.response.data
            })
        );
}
//delete account $ profile
export const deleteAccount = ()=>dispatch=>{
    if(window.confirm('Are you sure? This can NOT be undone!')){
        axios.delete('/api/profile')
        .then(res => dispatch({
                type: SET_CURRENT_USER,
                data:{}
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                data: err.response.data
            })    
        );
    }
}