import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addComment} from '../../actions/postAction';

class CommentForm extends Component {
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
        const {postId} = this.props;
        // console.log(idpost);
        const newComment = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        }
        this.props.addComment(postId,newComment);
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
                    Make a comment ...
                    </div>
                    <div className="card-body">
                    <form onSubmit={(event)=>this.onSubmit(event)}>
                        <div className="form-group">
                         <TextAreaFieldGroup
                            placeholder="Reply this post"
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
CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    postId:  PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}
export default connect(mapStateToProps,{addComment})(CommentForm);