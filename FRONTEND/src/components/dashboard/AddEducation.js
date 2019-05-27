import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addEducation} from '../../actions/profileAction';

class AddEducation extends Component {
    constructor(props){
        super(props);
        this.state = {
            school: '',
            degree: '',
            fieldofstudy:'',
            from:'',
            to:'',
            current:false,
            description: '',
            disabled: false,
            errors:{}
        }
    }
  onChange = (event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }  
  onSubmit = (event)=>{
    event.preventDefault();
    const newEdu = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy:this.state.fieldofstudy,
      from:this.state.from,
      to:this.state.to,
      current:this.state.current,
      description: this.state.description,
    }
    this.props.addEducation(newEdu,this.props.history);
  }
  isCheck = (event)=>{
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    })
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({
        errors : nextProps.errors
      })
    }
  }
  render() {
    const {errors} = this.state;
    // console.log(errors);
    return (
    <div className="section add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-secondary">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Your Education</h1>
            <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
            <small className="d-block pb-3">* = required field</small>
            <form onSubmit={(event)=>this.onSubmit(event)}>
              <TextFieldGroup
                placeholder="* School"
                name="school"
                value={this.state.school}
                onChange={(event)=>this.onChange(event)}
                error={errors.school}
              /> 
              <TextFieldGroup
                placeholder="* Degree"
                name="degree"
                value={this.state.degree}
                onChange={(event)=>this.onChange(event)}
                error={errors.dergree}
              /> 
              <TextFieldGroup
                placeholder="* Field of study"
                name="fieldofstudy"
                value={this.state.fieldofstudy}
                onChange={(event)=>this.onChange(event)}
                error={errors.fieldofstudy}
              /> 
              <h6>* From Date</h6>
              <TextFieldGroup
                placeholder="From"
                name="from"
                value={this.state.from}
                onChange={(event)=>this.onChange(event)}
                error={errors.from}
                type="date"
              /> 
              <h6>To Date</h6>
              <TextFieldGroup
                placeholder="To"
                name="to"
                value={this.state.to}
                onChange={(event)=>this.onChange(event)}
                error={errors.to}
                type="date"
                disabled={this.state.disabled ? true : false}
              /> 
              <div className="form-check mb-4">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  name="current" 
                  id="current"
                  onChange={(event)=>this.isCheck(event)}
                />
                <label className="form-check-label" htmlFor="current">
                  Current Program
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder="Program Description" 
                name="description"
                value={this.state.description} 
                onChange={(event)=>this.onChange(event)}
                info="Tell us about your experience and what you learned"
              />
              <input type="submit" className="btn btn-info btn-block mt-4" value="Submit"/>
            </form>
          </div>
        </div>
      </div>
    </div>

    )
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    errors: state.errors
  }
}
export default connect(mapStateToProps,{addEducation})(withRouter(AddEducation));