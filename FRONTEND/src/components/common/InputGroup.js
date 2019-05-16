import React  from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

// function component cần 1 object props, để tự động map thuộc tính dùng {name} thay vì phải props.name
const InputGroup = ({
    name,
    placeholder,
    value,
    error,
    icon,
    type,
    onChange
}) => {
    return (
    <div className="input-group mb-3">
        <div className="input-group-prepend">
        <span className="input-group-text">
            <i className={icon} />
        </span>
        </div>
        <input className={classnames('form-control form-control-lg',{'is-invalid':error})} 
            placeholder={placeholder} 
            name={name} 
            onChange={onChange}
            value={value}
            type={type}
        />
        {error&&(<div className="invalid-feedback">{error}</div>)}
    </div>
            
    )
}

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value:  PropTypes.string,
    error: PropTypes.object,
    icon: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange:  PropTypes.func.isRequired
}
InputGroup.defaultProps = {
    type: 'text'
}
export default InputGroup;