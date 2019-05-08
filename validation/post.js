const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data){
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    // text invalid
    if(!Validator.isLength(data.text,{min:10})){
        errors.text = 'Post must be at least 10 characters';
    }

    if(Validator.isEmpty(data.text)){
        errors.text = 'Text must not be empty';
    }
    return{
        errors,
        isValid:isEmpty(errors)
    }
}