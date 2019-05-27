import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile, deleteAccount} from '../../actions/profileAction';
import Spinner from '../common/Spinner';
import ProfileAction from './ProfileAction';
import ExperienceTable from './ExperienceTable';
import EducationTable from './EducationTable';


class Dashboard extends Component {
  componentWillMount(){
    this.props.getCurrentProfile();
  }
  deleteAccount = (event)=>{
    event.preventDefault();
    this.props.deleteAccount();
  }
  render() {
    const {user} = this.props.auth;
    const {profile,loading} = this.props.profile;
    let dashboardContent;
    if(profile===null||loading){
      dashboardContent = <Spinner/>
    }
    else{
      // Check if logged in user has profile data
      if(Object.keys(profile).length > 0){
        dashboardContent = <div>
            <p className="lead text-muted"><Link to={`/profile/${profile.handle}`}>Welcome {user.name}</Link> </p>
            <ProfileAction/>
            {/* TODO: exp and edu */}
            <ExperienceTable experienceArr={profile.experience}/>
            <EducationTable educationArr={profile.education}/>
            <div style={{marginBottom:'60px'}}></div>
            <button type="button" onClick={(event)=>this.deleteAccount(event)} className="btn btn-danger">Delete my account</button>
        </div>
      }else{
        // User id logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">Create your profile</Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}
const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile,
    auth: state.auth
  }
}
export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard);