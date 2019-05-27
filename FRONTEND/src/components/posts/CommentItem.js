import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {deleteComment} from '../../actions/postAction';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class CommentItem extends Component {
    onDeleteComment = (id_post, commentId) =>{
        this.props.deleteComment(id_post,commentId);
    }
    render() {
        const {comment, postId, auth} = this.props;
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                    <Link to="/posts">
                        <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt={comment.name} />
                    </Link>
                    <br />
                    <p className="text-center">{comment.name}</p>
                    </div>
                    <div className="col-md-10">
                    <p className="lead">{comment.text}</p>
                    {comment.user === auth.user.id ? (<button onClick={(id_post,commentId)=>this.onDeleteComment(postId,comment._id)} type="button" className="btn btn-danger mr-1"><i className="fas fa-times" /></button>) : null}
                    </div>
                </div>
            </div>
        )
    }
}
CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps,{deleteComment})(CommentItem);