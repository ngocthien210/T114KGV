import React from 'react';
// router
import {BrowserRouter as Router, Route} from 'react-router-dom';
// redux
import {Provider} from 'react-redux';
import _Store from './Store';
import './App.css';
// componet
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import setAuthToken from './utils/setAuthToken';
// decoe jwt-token
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authAction';


// Check token
if(localStorage.jwtToken){
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decodedData = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenicated 
  _Store.dispatch(setCurrentUser(decodedData));
  // Check expired token
  const currentTime = Date.now()/1000;
  if(decodedData.exp <currentTime){
    // Logout user
    _Store.dispatch(logoutUser());
    // Clear current profile
    // Redirect Login
    window.location.href = '/login';
  }
}

function App() {
  return (
  <Provider store={_Store}>
    <Router>
      <div>
        <Navbar/>
        <Route exact path="/" component={Landing}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Footer/>
      </div>
    </Router>
  </Provider>
  );
}

export default App;
