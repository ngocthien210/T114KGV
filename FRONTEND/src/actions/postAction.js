import axios from 'axios';
import {ADD_POST,GET_ERRORS, GET_POSTS, POST_LOADING, DELETE_POST,GET_POST,CLEAR_ERRORS} from './types';

// ADD POSTS
export const addPost = (postData) => dispatch =>{
    dispatch(clearErrors());
    axios.post('/api/posts',postData)
    .then(res => dispatch({
            type: ADD_POST,
            data: res.data
        })
    )
    .catch(err => dispatch({
            type: GET_ERRORS,
            data: err.response.data
        })
    )
}

// GET POSTS
export const getPosts = () => dispatch=>{
    dispatch(setPostLoading());
    axios.get('/api/posts')
    .then(res => dispatch({
            type: GET_POSTS,
            data: res.data
        })
    )
    .catch(err => dispatch({
            type: GET_POSTS,
            data: []
        })
    )
}
// DELETE POST
export const deletePost = (id) => dispatch =>{
    if(window.confirm('Are you sure? This can NOT be undone!')){
        axios.delete(`/api/posts/${id}`)
        .then(res => dispatch({
                type: DELETE_POST,
                data: id
            })
        )
        .catch(err => dispatch({
                type: GET_ERRORS,
                data: err.response.data
            })
        );
    }
}
// LIKE
export const likePost = (id) => dispatch =>{
    axios.post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch({
            type: GET_ERRORS,
            data: err.response.data
        })
    )
}
// UNLIKE
export const unlikePost = (id) => dispatch =>{
    axios.post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch({
            type: GET_ERRORS,
            data: err.response.data
        })
    )
}
// GET POST
export const getPost = (id) => dispatch=>{
    dispatch(setPostLoading());
    axios.get(`/api/posts/${id}`)
    .then(res => dispatch({
            type: GET_POST,
            data: res.data
        })
    )
    .catch(err => dispatch({
            type: GET_POST,
            data: {}
        })
    )
}

// ADD COMMENT
export const addComment = (postId, newComment) => dispatch =>{
    dispatch(clearErrors());
    axios.post(`/api/posts/comment/${postId}`,newComment)
    .then(res => dispatch({
            type: GET_POST,
            data: res.data
        })
    )
    .catch(err => dispatch({
            type: GET_ERRORS,
            data: err.response.data
        })
    )
}
// DELETE COMMENT
export const deleteComment = (postId, commentId) => dispatch =>{
    if(window.confirm('Are you sure? This can NOT be undone!')){
        axios.delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res => dispatch({
                type: GET_POST,
                data: res.data
            })
        )
        .catch(err => dispatch({
                type: GET_ERRORS,
                data: err.response.data
            })
        );
    }
}
// SET LOADING STATE
export const setPostLoading = () =>{
    return {
        type: POST_LOADING
    }
}
// CLEAR ERRORS
export const clearErrors = ()=>{
    return{
        type:CLEAR_ERRORS
    }
}