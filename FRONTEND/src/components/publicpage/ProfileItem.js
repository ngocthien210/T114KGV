import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class ProfileItem extends Component {
  render() {
    const {profile} = this.props;
    return (
        <div className="card card-body bg-light mb-3">
            <div className="row">
                <div className="col-2">
                    <img className="rounded-circle" src={profile.user.avatar} />
                </div>
                <div className="col-lg-6 col-md-4 col-8">
                    <h3>{profile.name}</h3>
                    <p>{profile.status} - {profile.company ? profile.company : ''}</p>
                    <p>{profile.location ? profile.location : ''}</p>
                    <Link to={`/profile/${profile.handle}`} className="btn btn-info">View Profile</Link>
                </div>
                <div className="col-md-4 d-none d-lg-block">
                    <h4>Skill Set</h4>
                    <ul className="list-group">
                        {
                            profile.skills.map((sk,index) =>(
                                <li className="list-group-item" key={index}>
                                    <i className="fa fa-check pr-1" />
                                    {sk}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
  }
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}
export default ProfileItem;