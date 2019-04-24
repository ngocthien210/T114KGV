const express = require('express');
const UserModel = require('../../models/UserModel');
const router = express.Router();
// lib tạo avatar
const gravatar = require('gravatar');
// mã hóa password
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../../config/dbkey');
// load validation input
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get('/test',function(req,res){
    res.json({
        msg:"Users works"
    });
});
// @route POST api/users/register
// @ register
// public
router.post('/register',function(req,res){
    let {errors,isValid} = validateRegisterInput(req.body);
    // const {errors,isValid} = validateRegisterInput(req.body);
    // check validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    UserModel.findOne({email: req.body.email}).then(function(user){
        if(user){
            errors.email = 'Email already exists'
            return res.status(400).json({errors});
        }else{
            var avatar = gravatar.url(req.body.email,{
                s: '200', //size
                r: 'pg', //rating
                d:'mm'
            });
            var newUser = new UserModel({
                name: req.body.name,
                email: req.body.email,
                avatar: avatar,
                password: req.body.password
            });
            // mã hóa mật khẩu
            bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(newUser.password, salt, function(err,hash){
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err);
                });
            });
        }
    });
});
// @route POST api/users/login
// @ login user / return JWT token
// @access public
router.post('/login',function(req,res){
    let {errors,isValid} = validateLoginInput(req.body);
    // check validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    var email = req.body.email;
    var password = req.body.password;
    // find user by email
    UserModel.findOne({email: email})
        .then(user=>{
            // check user
            if(!user){
                errors.email = 'Email not found'
                return res.status(404).json(errors.email);
            }
            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch =>{
                    if(isMatch){
                        // User matched
                        // Create JWT payload
                        const payload = {
                            id: user._id,
                            name: user.name,
                            avatar: user.avatar
                        }
                        // res.json({msg:'Success'});
                        // Sign token - expire in 1 hour
                        jwt.sign(payload, keys.sercetOrKey,{expiresIn: 3600},function(err,token){
                            res.json({
                                success: true,
                                token: 'Bearer '+ token
                            });
                        });
                    }else{
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors.password);
                    }
                });
        });
});

// @route GET api/users/current
// @ Return current user
// @access private
router.get('/current',passport.authenticate('jwt',{session:false}),function(req,res){
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        date: req.user.date
    });
});
module.exports = router;