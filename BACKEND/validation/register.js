const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
    var errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

    // name length
    if(!Validator.isLength(data.name,{min:2})){
        errors.name = 'Name must be at least two characters';
    }
    // name null
    if(Validator.isEmpty(data.name)){
        errors.name = 'Name must not be empty';
    }
    // email null
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email must not be empty';
    }
    // email invalid
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }
    // password null
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password must not be empty';
    }
    // no confirm 
    if(Validator.isEmpty(data.confirmPassword)){
        errors.confirmPassword = 'Password must be confirmed';
    }
    // passwor dlength
    if(!Validator.isLength(data.password,{min:6})){
        errors.password = 'Password must be at least 6 characters';
    }
    // match confirm pass
    if(!Validator.equals(data.password,data.confirmPassword)){
        errors.confirmPassword = 'Password must match';
    }
    return{
        errors,
        isValid:isEmpty(errors)
    }
}