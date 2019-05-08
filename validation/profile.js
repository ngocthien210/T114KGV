const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data){
    var errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    if(!Validator.isLength(data.handle,{min:2})){
        errors.handle = 'Handle must be at least 2 characters';
    }
    if(Validator.isEmpty(data.status)){
        errors.status = 'Status  is required';
    }
    if(Validator.isEmpty(data.skills)){
        errors.skills = 'Skills  is required';
    }   
    if(!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website = 'Nt a valid URL';
        }
    }
    if(!isEmpty(data.youtube)){
        if(!Validator.isURL(data.youtube)){
            errors.youtube = 'Nt a valid URL';
        }
    }
    if(!isEmpty(data.twitter)){
        if(!Validator.isURL(data.twitter)){
            errors.twitter = 'Nt a valid URL';
        }
    }
    if(!isEmpty(data.facebook)){
        if(!Validator.isURL(data.facebook)){
            errors.facebook = 'Nt a valid URL';
        }
    }
    if(!isEmpty(data.linkedin)){
        if(!Validator.isURL(data.linkedin)){
            errors.linkedin = 'Nt a valid URL';
        }
    }
    if(!isEmpty(data.instagram)){
        if(!Validator.isURL(data.instagram)){
            errors.instagram = 'Nt a valid URL';
        }
    }

    return{
        errors,
        isValid:isEmpty(errors)
    }
}