import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
// lệnh action đã làm sẵn
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
      this.props.registerUser(newUser, this.props.history);
  }
  componentDidMount(){
    // Check login
    if(this.props.auth.isAuthenticated){
        this.props.history.push('/dashboard');
    }
  }
  // bắt sự kiện nhận được props mới từ store (redux)
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }
  render() {
    var errors = this.state.errors;
    // var user = this.props.auth.user; // lấy từ Store - authReducer

    return (
    <div className="register">

    {/* {user?user.name:null} */}

        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={(event)=>this.onSubmit(event)}>
                <TextFieldGroup
                  placeholder="Full name"
                  name="name"
                  type="text"
                  onChange={(event)=>this.onChange(event)}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  onChange={(event)=>this.onChange(event)}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={(event)=>this.onChange(event)}
                  error={errors.password}
                />  
                <TextFieldGroup
                  placeholder="Confirm password"
                  name="confirmPassword"
                  type="password"
                  onChange={(event)=>this.onChange(event)}
                  error={errors.confirmPassword}
                />                              
                <input type="submit" className="btn btn-info btn-block mt-4" value="Sign Up" />
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
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors
  }
}
export default connect(mapStateToProps,{registerUser})(withRouter(Register));