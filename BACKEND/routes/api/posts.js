const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
// Model
const PostModel = require('../../models/PostModel');
const ProfileModel = require('../../models/ProfileModel');
// validation
const validatePostInput = require('../../validation/post');

router.get('/test',function(req,res){
    res.json({
        msg:"Posts works"
    });
});
// @route GET api/profile/all
// @DESC Get posts
// @access Public
router.get('/',function(req,res){
    PostModel.find()
    .sort({date:-1})
    .then(function(posts){
        return res.json(posts);
    })
    .catch(err => res.status(404).json({nopostsfound: 'No posts found'}));

});
// @route GET api/profile/all
// @DESC Get posts
// @access Public
router.get('/:id',function(req,res){
    PostModel.findById(req.params.id)
    .then(function(post){
        return res.json(post);
    })
    .catch(err => res.status(404).json({nopostsfound: 'No post found'}));

});
// @route POST api/profile/all
// @DESC Create post
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}), function(req,res){
    const {errors,isValid} = validatePostInput(req.body);
    // Check validation
    if(!isValid){
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }
    const newPost = new PostModel({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post =>res.json(post)).catch(err =>res.status(404).json(err));
});
// @route DELETE api/posts
// @DESC Delete post
// @access Private
router.delete('/:id',passport.authenticate('jwt',{session:false}),function(req,res){

    PostModel.findById(req.params.id)
    .then(function(post){
        // kiểm tra user xóa và user 
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({notauthorized: 'User not authorized'});
        }
        // Delete
        post.remove().then(function(){
            return res.json({success: true});
        })
    })
    .catch(err =>res.status(404).json({postnotfound: 'No posts found'}));
});
// @route POST api/posts/like
// @DESC Like post
// @access Private
router.post('/like/:id',passport.authenticate('jwt',{session:false}),function(req,res){

    PostModel.findById(req.params.id)
    .then(function(post){
        // kiểm tra user xóa và user 
        if(post.likes.filter(like => like.user.toString()===req.user.id).length >0){
            return res.status(400).json({alreadyliked: 'User already liked this post'});
        }
        // Add user id to likes array
        post.likes.unshift({user:req.user.id});
        post.save().then(post =>res.json(post)).catch(err=>res.status(404).json({postnotfound: 'Post not found'}));

    })
    .catch(err =>res.status(404).json({postnotfound: 'No posts found'}));
});
// @route POST api/posts/unlike
// @DESC UnLike post
// @access Private
router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),function(req,res){

    PostModel.findById(req.params.id)
    .then(function(post){
        //  check permission - kiểm tra user của like và user xóa
        if(post.likes.filter(like => like.user.toString()===req.user.id).length === 0){
            return res.status(400).json({alreadyliked: 'You have not yet lieked this post'});
        }
        // Get remove index
        var removeIndex = post.likes.map(item =>item.user.toString())
        .indexOf(req.user.id);
        // Splice put of array
        post.likes.splice(removeIndex,1);
        // save
        post.save().then(post => res.json(post));

    })
    .catch(err =>res.status(404).json({postnotfound: 'No posts found'}));
});

// @route POST api/posts/comment/:id
// @DESC Comment post
// @access Private
router.post('/comment/:id',passport.authenticate('jwt',{session:false}),function(req,res){
    // The same validation with posts
    const {errors,isValid} = validatePostInput(req.body);
    // Check validation
    if(!isValid){
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    PostModel.findById(req.params.id)
    .then(function(post){
        const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        }
        // Add to comments array
        post.comments.unshift(newComment);
        //Save
        post.save().then(post =>res.json(post)).catch(err=>res.status(404).json({postnotfound: 'Post not found'}));

    })
    .catch(err =>res.status(404).json({postnotfound: 'No post found'}));
});
// @route DELETE api/posts/comments/id_post/id_comment
// @DESC Delete comment post
// @access Private
router.delete('/comment/:id/:id_comment',passport.authenticate('jwt',{session:false}),function(req,res){

    PostModel.findById(req.params.id)
    .then(function(post){
        if(post.comments.filter(comment => comment._id.toString()===req.params.id_comment).length === 0){
            return res.status(400).json({commentnotexists: 'Comment not found'});
        }
        // check permission - kiểm tra user của comment và user xóa
        if(post.comments.filter(comment => comment.user.toString()===req.user.id).length === 0){
            return res.status(400).json({permissionerror: 'You can not delete this comment'});
        }
        
        // Get remove index
        var removeIndex = post.comments.map(comment =>comment._id.toString())
        .indexOf(req.params.id_comment);
        // Splice put of array
        post.comments.splice(removeIndex,1);
        // save
        post.save().then(post => res.json(post));

    })
    .catch(err =>res.status(404).json({postnotfound: 'No posts found'}));
});


module.exports = router;