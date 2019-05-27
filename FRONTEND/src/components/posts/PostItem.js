import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {deletePost,likePost,unlikePost} from '../../actions/postAction';

class PostItem extends Component {
    onDeletePost = (id_post)=>{
        this.props.deletePost(id_post);
    }
    onLikePost = (id_post)=>{
        this.props.likePost(id_post);
    }
    onUnlikePost = (id_post)=>{
        this.props.unlikePost(id_post);
    }
    findUserLike(likes){
        const {auth} = this.props;
        if(likes.filter(like=>like.user===auth.user.id).length > 0){
            return true;
        }else{
            return false;
        }
    }
    render() {
        const {post,auth,showActions} = this.props;
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                    <Link to={`/post/${post._id}`}>
                        <img className="rounded-circle d-none d-md-block" src={post.avatar} alt={post.name} />
                    </Link>
                    <br />
                    <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">
                    <p className="lead">{post.text}</p>
                    {showActions ? (<span>

                        <button type="button" className="btn btn-light mr-1" onClick={(id_post)=>this.onLikePost(post._id)}>
                        <i className={classnames('fas fa-thumbs-up',{
                            'text-info' : this.findUserLike(post.likes)
                        })} />
                        <span className="badge badge-light">{post.likes.length}</span>
                        </button>
                        <button type="button" className="btn btn-light mr-1" onClick={(id_post)=>this.onUnlikePost(post._id)}>
                            <i className="text-secondary fas fa-thumbs-down" />
                        </button>
                        <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                            Comments
                        </Link>
                        {post.user === auth.user.id ? (<button onClick={(id_post)=>this.onDeletePost(post._id)} type="button" className="btn btn-danger mr-1"><i className="fas fa-times" /></button>) : null}

                    </span>) : null}
                    
                    </div>
                </div>
            </div>

        )
    }
}
PostItem.defaultProps = {
    showActions: true
}
PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps,{deletePost,likePost,unlikePost})(PostItem);