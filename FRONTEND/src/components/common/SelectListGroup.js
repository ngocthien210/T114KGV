import React  from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

// function component cần 1 object props, để tự động map thuộc tính dùng {name} thay vì phải props.name
const SelectListGroup = ({
    name,
    value,
    error,
    info,
    onChange,
    options
}) => {
    const selectOptions = options.map(option=>{
        return(
            <option key={option.label} value={option.value}>
                {option.label}
            </option>
        )
    });
    return (
        <div className="form-group">
            <select className={classnames('form-control form-control-lg',{'is-invalid':error})} 
                name={name} 
                onChange={onChange}
                value={value}>
                {selectOptions}
            </select>
            {info&& (<small className="form-text text-muted">{info}</small>)}
            {error&&(<div className="invalid-feedback">{error}</div>)}
        </div>
    )
}

SelectListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value:  PropTypes.string,
    label:  PropTypes.string,
    error: PropTypes.object,
    info: PropTypes.string,
    onChange:  PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
}
export default SelectListGroup;