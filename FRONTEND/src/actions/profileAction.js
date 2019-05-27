import axios from 'axios';
import {GET_PROFILE,GET_PROFILES,PROFILE_LOADING,GET_ERRORS,CLEAR_CURRENT_PROFILE, SET_CURRENT_USER} from './types';

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
// Add experience
export const addExperience = (newExp, history)=> dispatch =>{
    axios.post('/api/profile/experience',newExp)
    .then(res => history.push('/dashboard'))
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            data: err.response.data
        })    
    )
}
// Add education
export const addEducation = (newEdu, history)=> dispatch =>{
    axios.post('/api/profile/education',newEdu)
    .then(res => history.push('/dashboard'))
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            data: err.response.data
        })    
    )
}
// delete experience
export const deleteExperience = (id_exp)=> dispatch =>{
    if(window.confirm('Are you sure? This can NOT be undone!')){
        axios.delete(`/api/profile/experience/${id_exp}`)
        .then(res => dispatch({
                type: GET_PROFILE,
                data: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                data: err.response.data
            })    
        )
    }
}
// delete education
export const deleteEducation = (id_edu)=> dispatch =>{
    if(window.confirm('Are you sure? This can NOT be undone!')){
        axios.delete(`/api/profile/education/${id_edu}`)
        .then(res => dispatch({
                type: GET_PROFILE,
                data: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                data: err.response.data
            })    
        )
    }
}
// get profiles
export const getProfiles = ()=> dispatch =>{
    dispatch(setProfileLoading());
    axios.get('/api/profile/all')
    .then(res=>{
        dispatch({
            type: GET_PROFILES,
            data: res.data
        })
    })
    .catch(err =>{
        dispatch({
            // không cần nhận error
            type: GET_PROFILES,
            data: null
        })
    })
}
// Get profile by handle
export const getProfileByHandle = (handle) =>dispatch =>{
    dispatch(setProfileLoading());
    axios.get(`/api/profile/handle/${handle}`)
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
            data: null
        })
    })
}
// Get profile by user id
export const getProfileByUserId = (id) =>dispatch =>{
    dispatch(setProfileLoading());
    axios.get(`/api/profile/user/${id}`)
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
            data: null
        })
    })
}