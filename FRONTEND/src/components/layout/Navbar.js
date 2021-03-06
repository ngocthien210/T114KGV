import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logoutUser} from '../../actions/authAction';
// clear current profile
import {clearCurrentProfile} from '../../actions/profileAction';


class Navbar extends Component {
    onLogoutClick = (event)=>{
        event.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }
    render() {
        // console.log(this.props.auth);
        // const isAuthenticated = this.props.auth.isAuthenticated;
        // const  user = this.props.auth.user;
        const {isAuthenticated,user} = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/feed">Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(event)=>this.onLogoutClick(event)}>
                    <img src={user.avatar} alt={user.name} style={{width: '25px', marginRight:'5px'}} className="rounded-circle"/>{' '}
                    Log Out
                    </a>
                </li>
            </ul>
        );
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        );    
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">DevConnector</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                        <Link className="nav-link" to="/profiles"> Developers
                        </Link>
                        </li>
                    </ul>
                    {isAuthenticated ? authLinks : guestLinks }
                    </div>
                </div>
            </nav>

        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) =>{
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps,{logoutUser,clearCurrentProfile})(Navbar);