const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
    var errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // email invalid
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }
    // email null
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email must not be empty';
    }
    // password null
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password must not be empty';
    }
  
    return{
        errors,
        isValid:isEmpty(errors)
    }
}