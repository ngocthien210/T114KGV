import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteEducation} from '../../actions/profileAction';


class EducationTable extends Component {
    onDeleteEduClick = (event,id)=>{
        event.preventDefault();
        this.props.deleteEducation(id);
    }
  render() {
    const dateFormat = new Intl.DateTimeFormat('en-GB');
    const education = this.props.educationArr.map(edu =>(
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>{edu.fieldofstudy}</td>
            <td>
                {dateFormat.format(new Date(edu.from))} - {edu.to ? dateFormat.format(new Date(edu.to)) : 'Still working'}
            </td>
            <td>
            <button className="btn btn-danger" onClick={(event,id)=>this.onDeleteEduClick(event,edu._id)}>
                Delete
            </button>
            </td>
        </tr>
    ));
    return (
    <div>
        <h4 className="mb-2">Education Credentials</h4>
        <table className="table">
            <thead>
            <tr>
                <th>School</th>
                <th>Degree</th>
                <th>Field of study</th>
                <th>Years</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {education}
            </tbody>
        </table>
    </div>
    )
  }
}
EducationTable.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}
export default connect(null,{deleteEducation})(EducationTable);