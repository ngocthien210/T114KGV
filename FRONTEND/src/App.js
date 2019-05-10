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
