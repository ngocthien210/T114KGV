import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authAction';
class Register extends Component {
    constructor(props){
        super(props);
        this.state ={
            name: '',
            email:'',
            password:'',
            confirmPassword:'',
            errors:{}
        }
    }
    onChange = (event)=>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    onSubmit = (event)=>{
        event.preventDefault();
        var newUser ={
            name : this.state.name,
            email : this.state.email,
            password : this.state.password,
            confirmPassword : this.state.confirmPassword
        }
        // console.log(newUser);
        // axios.post('/api/users/register',newUser)
        //   .then(res =>console.log(res.data))
        //   .catch(err=>this.setState({errors: err.response.data}));
        this.props.registerUser(newUser);
    }
    

  render() {
    var errors = this.state.errors;
    var user = this.props.auth.user; // lấy từ Store - authReducer

    return (
    <div className="register">

    {/* {user?user.name:null} */}

        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form action="create-profile.html">
                <div className="form-group">
                  <input type="text" className={classnames('form-control form-control-lg',{'is-invalid':errors.name})} placeholder="Name" name="name" required 
                  onChange={(event)=>this.onChange(event)} />
                  {errors.name&&(<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                  <input type="email" className={classnames('form-control form-control-lg',{'is-invalid':errors.email})} placeholder="Email Address" name="email" 
                  onChange={(event)=>this.onChange(event)} />
                  {errors.email&&(<div className="invalid-feedback">{errors.email}</div>)}
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input type="password" className={classnames('form-control form-control-lg',{'is-invalid':errors.password})} placeholder="Password" name="password" 
                  onChange={(event)=>this.onChange(event)}/>
                  {errors.password&&(<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                  <input type="password" className={classnames('form-control form-control-lg',{'is-invalid':errors.confirmPassword})} placeholder="Confirm Password" name="confirmPassword" onChange={(event)=>this.onChange(event)}/>
                  {errors.confirmPassword&&(<div className="invalid-feedback">{errors.confirmPassword}</div>)}
                </div>
                <input type="button" className="btn btn-info btn-block mt-4" value="Sign Up" onClick={(event)=>this.onSubmit(event)}/>
              </form>
            </div>
          </div>
        </div>
    </div>   
    )
  }
}
Register.propTypes = {
  registerUser : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps,{registerUser})(Register);