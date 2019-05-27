import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addPost} from '../../actions/postAction';

class PostForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            text:'',
            errors: {}
        }
    }
    onSubmit = (event)=>{
        event.preventDefault();
        const {user} = this.props.auth;
        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        }
        this.props.addPost(newPost);
        this.setState({text:''});
    }
    onChange = (event)=>{
        this.setState({
            [event.target.name] : event.target.value
        });
    }
    componentWillReceiveProps(newProps){
        if(newProps.errors){
            this.setState({errors: newProps.errors});
        }
    }
    render() {
        const {errors} = this.state;
        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">
                    Say Somthing...
                    </div>
                    <div className="card-body">
                    <form onSubmit={(event)=>this.onSubmit(event)}>
                        <div className="form-group">
                         <TextAreaFieldGroup
                            placeholder="Create a post"
                            name="text"
                            value={this.state.text}
                            onChange={(event)=>this.onChange(event)}
                            error={errors.text}
                         />
                        </div>
                        <button type="submit" className="btn btn-dark">Submit</button>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}
PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}
export default connect(mapStateToProps,{addPost})(PostForm);