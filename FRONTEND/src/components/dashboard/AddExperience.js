import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class AddExperience extends Component {
    constructor(props){
        super(props);
        this.state = {
            company: ''
        }
    }
  render() {
    return (
      <div>

      </div>
    )
  }
}
export default AddExperience;