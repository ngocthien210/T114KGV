const jwtStratery = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const UserModel = mongoose.model('UserSchema');
const keys = require('../config/dbkey');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.sercetorKey;

module.exports = function(passport){
    passport.use(new jwtStratery(opts,function(jwt_payload,done){
        // console.log(jwt_payload);
        UserModel.findById(jwt_payload.id)
            .then(function(user){
                if(user){
                    return done(null,user);
                }
                return done(null,false);
            })
            .catch(err =>console.log(err));
    }));
}