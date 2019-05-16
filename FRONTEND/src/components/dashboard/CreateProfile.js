import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import {createProfile} from '../../actions/profileAction';
import {withRouter,Link} from 'react-router-dom';

class CreateProfile extends Component {
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
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
        this.setState({errors: nextProps.errors});
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
          />
          <InputGroup 
            placeholder="Facebook"
            name="facebook"
            onChange={(event)=>this.onChange(event)}
            error={errors.facebook}
            type="text"
            icon="fab fa-facebook"
          />
          <InputGroup 
            placeholder="Linkedin"
            name="linkedin"
            onChange={(event)=>this.onChange(event)}
            error={errors.linkedin}
            type="text"
            icon="fab fa-linkedin"
          />
          <InputGroup 
            placeholder="Instagram"
            name="instagram"
            onChange={(event)=>this.onChange(event)}
            error={errors.instagram}
            type="text"
            icon="fab fa-instagram"
          />
          <InputGroup 
            placeholder="Youtube"
            name="youtube"
            onChange={(event)=>this.onChange(event)}
            error={errors.youtube}
            type="text"
            icon="fab fa-youtube"
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
              <h1 className="display-4 text-center">Create Your Profile</h1>
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
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  onChange={(event)=>this.onChange(event)}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                  options={options}
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  type="text"
                  onChange={(event)=>this.onChange(event)}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  type="text"
                  onChange={(event)=>this.onChange(event)}
                  error={errors.company}
                  info="Could be your own or a company website"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  type="text"
                  onChange={(event)=>this.onChange(event)}
                  error={errors.location}
                  info="City &amp; state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="Skills"
                  name="skills"
                  type="text"
                  onChange={(event)=>this.onChange(event)}
                  error={errors.skills}
                  info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  type="text"
                  onChange={(event)=>this.onChange(event)}
                  error={errors.website}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="A short bio of yourself"
                  name="bio"
                  type="text"
                  onChange={(event)=>this.onChange(event)}
                  error={errors.website}
                  info="Tell us a little about yourself"
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
CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired 
}
const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    errors: state.errors
  }
}
export default connect(mapStateToProps,{createProfile})(withRouter(CreateProfile));