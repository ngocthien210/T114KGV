import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addExperience} from '../../actions/profileAction';

class AddExperience extends Component {
    constructor(props){
        super(props);
        this.state = {
            company: '',
            title: '',
            location:'',
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
    const newExp = {
      company: this.state.company,
      title: this.state.title,
      location:this.state.location,
      from:this.state.from,
      to:this.state.to,
      current:this.state.current,
      description: this.state.description,
    }
    this.props.addExperience(newExp,this.props.history);
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
            <h1 className="display-4 text-center">Add Your Experience</h1>
            <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
            <small className="d-block pb-3">* = required field</small>
            <form onSubmit={(event)=>this.onSubmit(event)}>
              <TextFieldGroup
                placeholder="* Title"
                name="title"
                value={this.state.title}
                onChange={(event)=>this.onChange(event)}
                error={errors.title}
              /> 
              <TextFieldGroup
                placeholder="* Company"
                name="company"
                value={this.state.company}
                onChange={(event)=>this.onChange(event)}
                error={errors.company}
              /> 
              <TextFieldGroup
                placeholder="* Location"
                name="location"
                value={this.state.location}
                onChange={(event)=>this.onChange(event)}
                error={errors.location}
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
                  Current Job
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder="Job Description" 
                name="description"
                value={this.state.description} 
                onChange={(event)=>this.onChange(event)}
                info="Some of your responsabilities, etc"
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

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    errors: state.errors
  }
}
export default connect(mapStateToProps,{addExperience})(withRouter(AddExperience));