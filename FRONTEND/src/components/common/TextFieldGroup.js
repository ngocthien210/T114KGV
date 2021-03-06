import React  from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';


// function component cần 1 object props, để tự động map thuộc tính dùng {name} thay vì phải props.name
const TextFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
    return (
        <div className="form-group">
            <input type={type} 
                className={classnames('form-control form-control-lg',{'is-invalid':error})} 
                placeholder={placeholder} 
                name={name} 
                onChange={onChange}
                disabled= {disabled}
                value={value}
                />
            {info&& (<small className="form-text text-muted">{info}</small>)}
            {error&&(<div className="invalid-feedback">{error}</div>)}
        </div>
    )
}

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value:  PropTypes.string,
    label:  PropTypes.string,
    error: PropTypes.string,
    info: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange:  PropTypes.func.isRequired,
    disabled:  PropTypes.bool
}
TextFieldGroup.defaultProps = {
    type: 'text'
}
export default TextFieldGroup;