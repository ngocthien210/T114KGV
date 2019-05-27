import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import {getPost} from '../../actions/postAction';
import PostItem from './PostItem';
import {Link} from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

class Post extends Component {
    componentDidMount(){
        if(this.props.match.params.id){
            this.props.getPost(this.props.match.params.id);
        }
    }
    render() {
        const {post ,loading} = this.props.post;
        let postContent;
        if(post === null || loading || Object.keys(post).length ===0){
            postContent = <Spinner/>
        }else{
            postContent = (
                <div>
                    <PostItem post={post} showActions={false}/>
                </div>
            )
        }
        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link className="btn btn-dark" to="/feed">Back to feed</Link>
                        </div>
                        <div className="col-md-12 mt-4"> 
                            {postContent}
                        </div>          
                    </div>
                    <CommentForm postId={post._id ? post._id :''} />
                    <CommentFeed 
                        comments={post.comments ? post.comments: []} 
                        postId={post._id ? post._id :''}
                    />
                </div>
            </div>
        )
    }
}
Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        post: state.post
    }
}
export default connect(mapStateToProps,{getPost})(Post);