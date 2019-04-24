const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
// Load ProfileModel
const ProfileModel = require('../../models/ProfileModel');
// Load UserModel
const UserModel = require('../../models/UserModel');

// @route POST api/users/register
// @ register
// public
router.get('/test',function(req,res){
    res.json({
        msg:"Profile works"
    });
});

// @route GET api/profile
// @DESC GET current users profile
// @access Private
router.get('/',passport.authenticate('jwt',{session:false}),function(req,res){
    let errors = {}

    ProfileModel.findOne({user: req.user.id})
    .then(function(profile){
        if(!profile){
            errors.noProfile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }else{
            res.json(profile);
        }
    }).catch(err=>res.status(404).json(err));
});


module.exports = router;