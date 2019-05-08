const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data){
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';
    data.location = !isEmpty(data.location) ? data.location : '';

    // title null
    if(Validator.isEmpty(data.title)){
        errors.title = 'Job title must not be empty';
    }
    // title null
    if(Validator.isEmpty(data.company)){
        errors.company = 'Job company must not be empty';
    }    // title null
    if(Validator.isEmpty(data.from)){
        errors.from = 'From date must not be empty';
    } 
    if(Validator.isEmpty(data.location)){
        errors.location = 'location must not be empty';
    } 
    return{
        errors,
        isValid:isEmpty(errors)
    }
}