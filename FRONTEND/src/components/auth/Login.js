import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {loginUser} from '../../actions/authAction';

class Login extends Component {
    constructor(props){
        super(props);
        this.state ={
            email:'',
            password:'',
            errors:{}
        }
    }
    onChange = (event)=>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    onSubmit = (event)=>{
        event.preventDefault();
        var user ={
            email : this.state.email,
            password : this.state.password
        }
        // console.log(user);
        this.props.loginUser(user);
    }

    componentDidMount(){
        // Check login
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }    
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

  render() {
      const errors = this.state.errors;
    return (
        <div className="login">
            <div className="container">
                <div className="row">
                <div className="col-md-6 m-auto">
                    <h1 className="display-4 text-center">Log In</h1>
                    <p className="lead text-center">Log in to your DevConnector account</p>
                    <form action="dashboard.html">
                    <div className="form-group">
                        <input type="email" className={classnames('form-control form-control-lg',{'is-invalid':errors.email})} placeholder="Email Address" name="email" 
                        onChange={(event)=>this.onChange(event)}/>
                        {errors.email&&(<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <input type="password" className={classnames('form-control form-control-lg',{'is-invalid':errors.password})} placeholder="Password" name="password" onChange={(event)=>this.onChange(event)}/>
                        {errors.password&&(<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <input type="button" className="btn btn-info btn-block mt-4" value="Log In" onClick={(event)=>this.onSubmit(event)}/>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
  }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

export default connect(mapStateToProps,{loginUser})(Login);