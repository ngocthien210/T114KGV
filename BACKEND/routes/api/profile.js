const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
// Load ProfileModel
const ProfileModel = require('../../models/ProfileModel');
// Load UserModel
const UserModel = require('../../models/UserModel');
//validator
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
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
    let errors = {};

    ProfileModel.findOne({user: req.user.id})
    .populate('user',['name','avatar'])
    .then(function(profile){
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }else{
            res.json(profile);
        }
    })
    .catch(err=>res.status(404).json(err));
});

// @route GET api/profile/all
// @DESC GET All PROFILE
// @access Public
router.get('/all',function(req,res){
    ProfileModel.find({})
    .populate('user',['name','avatar'])
    .then(function(profiles){
        if(!profiles){
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        }
        else{
            res.json(profiles);
        }
    })
    .catch(err=>res.status(404).json({profile:'No porfiles'}));
});

// @route GET api/profile/handle/:handle
// @DESC GET PROFILE by handle
// @access Public
router.get('/handle/:handle',function(req,res){
    ProfileModel.findOne({handle: req.params.handle})
    .populate('user',['name','avatar'])
    .then(function(profile){
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        }
        else{
            res.json(profile);
        }
    })
    .catch(err=>res.status(404).json({profile:'No porfile'}));
});

// @route GET api/profile/user/:user_id
// @DESC GET PROFILE by user_id
// @access Public
router.get('/user/:user_id',function(req,res){
    ProfileModel.findOne({user: req.params.user_id})
    .populate('user',['name','avatar'])
    .then(function(profile){
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        }
        else{
            res.json(profile);
        }
    })
    .catch(err=>res.status(404).json({profile:'No porfile'}));
});

// @route POST api/profile
// @DESC Create users profile
// @access Private
router.post('/',passport.authenticate('jwt',{session:false}),function(req,res){

    const {errors, isValid} = validateProfileInput(req.body);
    // Check Validation
    if(!isValid){
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }
    // GET fields
    var profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle){ profileFields.handle = req.body.handle; }
    if(req.body.company){ profileFields.company = req.body.company; }
    if(req.body.website){ profileFields.website = req.body.website; }
    if(req.body.location){ profileFields.location = req.body.location; }
    if(req.body.bio){ profileFields.bio = req.body.bio; }
    if(req.body.status){ profileFields.status = req.body.status; }
    if(req.body.githubusername){ profileFields.githubusername = req.body.githubusername; }
    //skills - split into array
    if(typeof(req.body.skills)!=='undefined'){
        profileFields.skills = req.body.skills.split(',');
    }
    // Social
    profileFields.social = {};
    if(req.body.youtube){ profileFields.social.youtube = req.body.youtube; }
    if(req.body.twitter){ profileFields.social.twitter = req.body.twitter; }
    if(req.body.facebook){ profileFields.social.facebook = req.body.facebook; }
    if(req.body.linkedin){ profileFields.social.linkedin = req.body.linkedin; }
    if(req.body.instagram){ profileFields.social.instagram = req.body.instagram; }

    ProfileModel.findOne({user:req.user.id})
    .then(function(profile){
        if(profile){
            // Update
            ProfileModel.findOneAndUpdate(
                {user:req.user.id},
                {$set: profileFields},
                {new:true})
            .then(function(profile){
                res.json(profile);
            })
        }
        else{
            // Create
            // Check handle exists (link thân thiện)
            ProfileModel.findOne({handle: profileFields.handle})
            .then(function(profile){
                if(profile){
                    errors.handle = 'That handle already exists';
                    res.status(404).json(errors);
                }
                // Save profile
                new ProfileModel(profileFields).save().then(function(profile){
                    res.json(profile);
                });
            })
        }
    })  

});


// @route POST api/profile/experience
// @DESC Add Experience to profile
// @access Private
router.post('/experience',passport.authenticate('jwt',{session:false}),function(req,res){
    const {errors, isValid} = validateExperienceInput(req.body);
    // Check Validation
    if(!isValid){
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }
    ProfileModel.findOne({user: req.user.id})
    .then(function(profile){
        var newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }
        // Add to exp array
        profile.experience.unshift(newExp);
        // insert to db
        profile.save().then(profile =>res.json(profile));


    })
});

// @route POST api/profile/education
// @DESC Add education to profile
// @access Private
router.post('/education',passport.authenticate('jwt',{session:false}),function(req,res){
    const {errors, isValid} = validateEducationInput(req.body);
    // Check Validation
    if(!isValid){
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }
    ProfileModel.findOne({user: req.user.id})
    .then(function(profile){
        var newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }
        // Add to exp array
        profile.education.unshift(newEdu);
        // insert to db
        profile.save().then(profile =>res.json(profile));


    })
});

// @route DELETE api/profile/experience
// @DESC Delete Experience from profile
// @access Private
router.delete('/experience/:exp_id',passport.authenticate('jwt',{session:false}),function(req,res){
    
    ProfileModel.findOne({user: req.user.id})
    .then(function(profile){
        // Get remove index
        var removeIndex = profile.experience.map(item =>item.id)
        .indexOf(req.params.exp_id);
        // Splice out of array
        profile.experience.splice(removeIndex,1);
        // Save
        profile.save().then(profile =>res.json(profile));
    })
    .catch(err =>res.status(404).json(err));
});

// @route DELETE api/profile/education
// @DESC Delete Education from profile
// @access Private
router.delete('/education/:edu_id',passport.authenticate('jwt',{session:false}),function(req,res){
    
    ProfileModel.findOne({user: req.user.id})
    .then(function(profile){
        // Get remove index
        var removeIndex = profile.education.map(item =>item.id)
        .indexOf(req.params.edu_id);
        // Splice out of array
        profile.education.splice(removeIndex,1);
        // Save
        profile.save().then(profile =>res.json(profile));
    })
    .catch(err =>res.status(404).json(err));
});

// @route DELETE api/profile/
// @DESC Delete user and profile
// @access Private
router.delete('/',passport.authenticate('jwt',{session:false}),function(req,res){
    
    ProfileModel.findOneAndRemove({user: req.user.id})
    .then(function(){
        UserModel.findOneAndRemove({_id:req.user.id})
        .then(function(){
            res.json({success: true});
        });
    })
    .catch(err =>res.status(404).json(err));
});

module.exports = router;