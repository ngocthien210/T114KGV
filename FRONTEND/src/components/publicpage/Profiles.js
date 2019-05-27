import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import {getProfiles} from '../../actions/profileAction';
import ProfileItem from './ProfileItem';

class Profiles extends Component {
    componentDidMount(){
        this.props.getProfiles();
    }
    render() {
        const {profiles,loading} = this.props.profile;
        let profileItem;
        if(profiles===null||loading){
            profileItem = <Spinner/>
        }else{
            if(profiles.length > 0){
                profileItem = profiles.map(profile =>(
                    <ProfileItem key={profile._id} profile={profile}/>
                ))
            }else{
                profileItem = <h4>No profiles found ...</h4>
            }
        }
    return (
    <div className="profiles">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4 text-center">Developer Profiles</h1>
                    <p className="lead text-center">Browse and connect with developers</p>
                    {profileItem}
                </div>
            </div>
        </div>
    </div>

    )
    }
}
Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}
export default connect(mapStateToProps,{getProfiles})(Profiles);