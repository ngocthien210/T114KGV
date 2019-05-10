import React, { Component } from 'react'

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
        console.log(user);
    }
  render() {
    return (
        <div className="login">
            <div className="container">
                <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Log In</h1>
                    <p className="lead text-center">Log in to your DevConnector account</p>
                    <form action="dashboard.html">
                    <div className="form-group">
                        <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" 
                        onChange={(event)=>this.onChange(event)}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" onChange={(event)=>this.onChange(event)}/>
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
export default Login;