import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import {createProfile, getCurrentProfile} from '../../actions/profileAction';
import {withRouter,Link} from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {
  constructor(props){
      super(props);
      this.state = {
        displaySocialInputs: false,
        handle:'',
        company:'',
        website:'',
        location:'',
        status:'',
        skills:'',
        githubusername:'',
        bio:'',
        twitter:'',
        facebook:'',
        linkedin:'',
        youtube:'',
        instagram:'',
        errors:{}
      }
  }  
  onSubmit = (event)=>{
    event.preventDefault();
    const profileData = {
      handle:this.state.handle,
      company:this.state.company,
      website:this.state.website,
      location:this.state.location,
      status:this.state.status,
      skills:this.state.skills,
      githubusername:this.state.githubusername,
      bio:this.state.bio,
      twitter:this.state.twitter,
      facebook:this.state.facebook,
      linkedin:this.state.linkedin,
      youtube:this.state.youtube,
      instagram:this.state.instagram
    }
    this.props.createProfile(profileData,this.props.history);
  }
  onChange = (event)=>{
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  showSocialInput = (event) =>{
    this.setState(prevState =>({
        displaySocialInputs: !prevState.displaySocialInputs
      })
    );
  }
  componentDidMount(){
      this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
        this.setState({errors: nextProps.errors});
    }
    if(nextProps.profile.profile){
        const profile = nextProps.profile.profile;
        // Bringskill array back to CSV
        const skillCSV = profile.skills.join(',');
        // If profile field doesnt exist =, make empty string
        profile.company = !isEmpty(profile.company) ? profile.company : '';
        profile.website = !isEmpty(profile.website) ? profile.website : '';
        profile.location = !isEmpty(profile.location) ? profile.location : '';
        profile.status = !isEmpty(profile.status) ? profile.status : '';
        profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
        profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
        profile.social = !isEmpty(profile.social) ? profile.social : {};
        profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
        profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
        profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
        profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';
        profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';

        // Set state
        this.setState({
            handle:profile.handle,
            company:profile.company,
            website:profile.website,
            location:profile.location,
            status:profile.status,
            skills:skillCSV,
            githubusername:profile.githubusername,
            bio:profile.bio,
            twitter:profile.twitter,
            facebook:profile.facebook,
            linkedin:profile.linkedin,
            youtube:profile.youtube,
            instagram:profile.instagram
        });
    }
    
  }

  render() {
    const {errors, displaySocialInputs} = this.state;
    const options = [
      {label:'* Select Professional Status',value: 0},
      {label:'Developer',value:'Developer'},
      {label:'Junior Developer',value:'Junior Developer'},
      {label:'Senior Developer',value:'Senior Developer'},
      {label:'Manager',value:'Manager'},
      {label:'Student or Learning',value:'Student or Learning'},
      {label:'Instructor or Teacher',value:'Instructor or Teacher'},
      {label:'Intern',value:'Intern'},
      {label:'Other',value:'Other'}
    ];
    let socialInputs;
    if(displaySocialInputs){
      socialInputs = (
        <div>
          <InputGroup 
            placeholder="Twitter"
            name="twitter"
            onChange={(event)=>this.onChange(event)}
            error={errors.twitter}
            type="text"
            icon="fab fa-twitter"
            value={this.state.twitter}
          />
          <InputGroup 
            placeholder="Facebook"
            name="facebook"
            onChange={(event)=>this.onChange(event)}
            error={errors.facebook}
            type="text"
            icon="fab fa-facebook"
            value={this.state.facebook}
          />
          <InputGroup 
            placeholder="Linkedin"
            name="linkedin"
            onChange={(event)=>this.onChange(event)}
            error={errors.linkedin}
            type="text"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
          />
          <InputGroup 
            placeholder="Instagram"
            name="instagram"
            onChange={(event)=>this.onChange(event)}
            error={errors.instagram}
            type="text"
            icon="fab fa-instagram"
            value={this.state.instagram}
          />
          <InputGroup 
            placeholder="Youtube"
            name="youtube"
            onChange={(event)=>this.onChange(event)}
            error={errors.youtube}
            type="text"
            icon="fab fa-youtube"
            value={this.state.youtube}
          />                               
        </div>
      )
    } 
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-secondary">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <p className="lead text-center">Let's get some information to make your profile stand out</p>
              <small className="d-block pb-3">* = required field</small>
              <form>
                <TextFieldGroup
                  placeholder="* Profile handle"
                  name="handle"
                  type="text"
                  onChange={(event)=>this.onChange(event)}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                  value={this.state.handle}
                  disabled={true}
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  onChange={(event)=>this.onChange(event)}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                  options={options}
                  value={this.state.status}
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  type="text"
                  onChange={(event)=>this.onChange(event)}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                  value={this.state.company}
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  type="text"
                  onChange={(event)=>this.onChange(event)}
                  error={errors.website}
                  info="Could be your own or a company website"
                  value={this.state.website}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  type="text"
                  onChange={(event)=>this.onChange(event)}
                  error={errors.location}
                  info="City &amp; state suggested (eg. Boston, MA)"
                  value={this.state.location}
                />
                <TextFieldGroup
                  placeholder="Skills"
                  name="skills"
                  type="text"
                  onChange={(event)=>this.onChange(event)}
                  error={errors.skills}
                  info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                  value={this.state.skills}
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  type="text"
                  onChange={(event)=>this.onChange(event)}
                  error={errors.website}
                  info="If you want your latest repos and a Github link, include your username"
                  value={this.state.githubusername}
                />
                <TextAreaFieldGroup
                  placeholder="A short bio of yourself"
                  name="bio"
                  type="text"
                  onChange={(event)=>this.onChange(event)}
                  error={errors.website}
                  info="Tell us a little about yourself"
                  value={this.state.bio}
                />        
                <div className="mb-3">
                  <button type="button" className="btn btn-secondary" onClick={(event)=>this.showSocialInput(event)}>Add Social Network Links</button>
                  <span className="text-muted"> (Optional)</span>
                </div>
                {socialInputs}  
                <input type="button" onClick={(event)=>this.onSubmit(event)} value="Submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired 
}
const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    errors: state.errors
  }
}
export default connect(mapStateToProps,{createProfile,getCurrentProfile})(withRouter(EditProfile));