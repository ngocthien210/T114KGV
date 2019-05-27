import React from 'react';
// router
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
// redux
import {Provider} from 'react-redux';
import _Store from './Store';
import './App.css';
// decoe jwt-token
import jwt_decode from 'jwt-decode';
// action
import { setCurrentUser, logoutUser } from './actions/authAction';
import { clearCurrentProfile } from './actions/profileAction';
// componet
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/dashboard/CreateProfile';
import EditProfile from './components/dashboard/EditProfile';
import AddExperience from './components/dashboard/AddExperience';
import AddEducation from './components/dashboard/AddEducation';
import Profiles from './components/publicpage/Profiles';
import Profile from './components/publicpage/Profile';
import NotFound404 from './components/publicpage/NotFound404';
import Posts from "./components/posts/Posts";
import Post from "./components/posts/Post";

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
  if(decodedData.exp < currentTime){
    // Logout user
    _Store.dispatch(logoutUser());
    // Clear current profile
    _Store.dispatch(clearCurrentProfile());
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
        <Route exact  path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/profiles" component={Profiles}/>
        <Route exact path="/profile/:handle" component={Profile}/>
        {/* <Route exact path="/profile/:id" component={Profile}/> */}
        <Switch>
          {/* cusotm route for dashboard */}
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
        </Switch>
        <Switch>
          <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
        </Switch> 
        <Switch>
          <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
        </Switch>
        <Switch>
          <PrivateRoute exact path="/add-experience" component={AddExperience}/>
        </Switch> 
        <Switch>
          <PrivateRoute exact path="/add-education" component={AddEducation}/>
        </Switch> 
        <Switch>
          <PrivateRoute exact path="/feed" component={Posts}/>
        </Switch> 
        <Switch>
          <PrivateRoute exact path="/post/:id" component={Post}/>
        </Switch>        
        <Route exact path="/notfound" component={NotFound404}/>              
        <Footer/>
      </div>
    </Router>
  </Provider>
  );
}

export default App;
