import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Spinner from '../common/Spinner';
import {getProfileByHandle,getProfileByUserId} from '../../actions/profileAction';
import ProfileGithub from './ProfileGithub';
import isEmpty from '../../validation/is-empty';

class Profile extends Component {
    componentDidMount(){  
        if(this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
        else if(this.props.match.params.id){
            this.props.getProfileByUserId(this.props.match.params.id);
        }
    }  
    componentWillReceiveProps(nextProps) {
        if(nextProps.profile.profile === null && this.props.profile.loading){
            this.props.history.push('/notfound');
        }
    } 
  render() {
      const dateFormat = new Intl.DateTimeFormat('en-GB');
      const {profile,loading} = this.props.profile;
      let profileContent;
      if(profile===null||loading){
        profileContent = <Spinner/>
      }else{
        profileContent = (
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                    
                        <div className="col-6">
                            <Link to="/profiles" className="btn btn-secondary mb-3 float-left">Back To Profiles</Link>
                        </div>                    
                        <div className="col-6">

                        </div>

                    </div>
                    {/* Profile Header*/}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-body bg-info text-white mb-3 w-100">
                                <div className="row">
                                    <div className="col-4 col-md-3 m-auto">
                                    <img className="rounded-circle" src={profile.user.avatar} alt={profile.user.name}/>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h1 className="display-4 text-center">{profile.user.name}</h1>
                                    <p className="lead text-center">{profile.status} - {profile.company}</p>
                                    <p>{profile.location}</p>
                                    <p>
                                        {profile.website ? (<Link className="text-white p-2" to={profile.website}>
                                            <i className="fas fa-globe fa-2x"></i>
                                        </Link>) : ''}
                                        {profile.social.twitter ? (<Link className="text-white p-2" to={profile.social.twitter}>
                                        <i className="fab fa-twitter fa-2x" />
                                        </Link>) : ''}
                                        {profile.social.facebook ? (<Link className="text-white p-2" to={profile.social.facebook}>
                                        <i className="fab fa-facebook fa-2x" />
                                        </Link>) : ''}
                                        {profile.social.linkedin ? (<Link className="text-white p-2" to={profile.social.linkedin}>
                                        <i className="fab fa-linkedin fa-2x" />
                                        </Link>) : ''}
                                        {profile.social.instagram ? (<Link className="text-white p-2" to={profile.social.instagram}>
                                        <i className="fab fa-instagram fa-2x" />
                                        </Link>) : ''}
                                        {profile.social.youtube ? (<Link className="text-white p-2" to={profile.social.youtube}>
                                        <i className="fab fa-youtube fa-2x" />
                                        </Link>) : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* profile about */}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-body bg-light mb-3">
                                <h3 className="text-center text-info">{profile.user.name}'s Bio</h3>
                                <p className="lead">
                                    {profile.bio}
                                </p>
                                <hr />
                                <h3 className="text-center text-info">Skill Set</h3>
                                <div className="row">
                                    <div className="d-flex flex-wrap justify-content-center align-items-center">
                                        {
                                            profile.skills.map((sk,index) =>(
                                                <div className="p-3" key={index}>
                                                    <i className="fa fa-check" /> {sk}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* profile creds */}
                    <div className="row">
                        <div className="col-md-6">
                            <h3 className="text-center text-info">Experience</h3>
                            <ul className="list-group">
                            {
                                profile.experience.map((exp) =>(
                                    <li className="list-group-item" key={exp._id}>      
                                        <h4>{exp.company}</h4>
                                        <p>From: {dateFormat.format(new Date(exp.from))}
                                         {' to '} 
                                         {exp.to ? dateFormat.format(new Date(exp.to)) : 'Now'}</p>
                                        <p>
                                        <strong>Position:</strong> {exp.title}
                                        </p>
                                        <p>
                                        <strong>Description:</strong> {exp.description}
                                        </p>
                                    </li>
                                ))
                            }  
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <h3 className="text-center text-info">Education</h3>
                            <ul className="list-group">
                            {
                                profile.education.map((edu) =>(
                                    <li className="list-group-item" key={edu._id}>
                                        <h4>{edu.school}</h4>
                                        <p>From: {dateFormat.format(new Date(edu.from))}
                                         {' to '} 
                                         {edu.to ? dateFormat.format(new Date(edu.to)) : 'Now'}</p>
                                        <p>
                                        <strong>Degree: </strong>{edu.degree}</p>
                                        <p>
                                        <strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
                                        <p>
                                        </p><p>
                                        <strong>Description: </strong>{edu.description}</p>
                                    </li>
                                ))
                            }
                            </ul>
                        </div>
                    </div>
                    {/* profile github */}
                    {isEmpty(profile.githubusername) ? null : <ProfileGithub username={profile.githubusername}/>}
                    {/* <ProfileGithub username={profile.githubusername}/> */}
                </div>
            </div>    
          )
      }
    return (
        <div className="profile">
            <div className="container">
                {profileContent}
            </div>
        </div>
    )
  }
}
Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileByUserId: PropTypes.func.isRequired,
    getProfileByHandle: PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}
export default connect(mapStateToProps,{getProfileByHandle,getProfileByUserId})(Profile);