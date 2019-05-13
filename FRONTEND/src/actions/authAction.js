import axios from 'axios';
// function add token
import setAuthToken from '../utils/setAuthToken';
// decoe jwt-token
import jwt_decode from 'jwt-decode';
// tên action dùng chung cho lúc tạo reducer và lúc gọi trong component
import {GET_ERRORS,SET_CURRENT_USER} from './types';
// Register 
// export const registerUser = (userData)=>{
//     return {
//         type: TEST_DISPATCH,
//         data: userData 
//     }
// }

// action được sử dụng trong component, cài đặt dispatch
export const registerUser = (userData, history) => dispatch =>{
    axios.post('/api/users/register',userData)
        .then(
            res => history.push('/login')
        )
        .catch(err=> dispatch({
            type: GET_ERRORS,
            data: err.response.data
        })
        )  ;
}
export const loginUser = (userData) => dispatch =>{
    axios.post('/api/users/login',userData)
    .then(res =>{
        // Get auth token
        const token = res.data.token;
        // Set token to localStorage
        localStorage.setItem('jwtToken',token);
        // Set token to Auth Header - custom function
        setAuthToken(token);
        // decode token to get user data
        const decodedUserData = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decodedUserData));
    })
    .catch(err=> dispatch({
        type: GET_ERRORS,
        data: err.response.data
        })
    );
}
// Set logged in user Function
export const setCurrentUser = (user) =>{
    return {
        type: SET_CURRENT_USER,
        data: user
    }
}
// Log user out
export const logoutUser = (history) => dispatch =>{
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove token from Header Authorization
    setAuthToken(false);
    // Set current user to {}
    dispatch(setCurrentUser({}));
    history.push('/login');

}