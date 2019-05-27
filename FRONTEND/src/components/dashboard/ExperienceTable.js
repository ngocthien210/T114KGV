import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteExperience} from '../../actions/profileAction';


class ExperienceTable extends Component {
    onDeleteExpClick = (event,id)=>{
        event.preventDefault();
        this.props.deleteExperience(id);
    }
  render() {
    const dateFormat = new Intl.DateTimeFormat('en-GB');
    const experience = this.props.experienceArr.map(exp =>(
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
            {dateFormat.format(new Date(exp.from))} - {exp.to ? dateFormat.format(new Date(exp.to)) : 'Still working'}
            </td>
            <td>
            <button className="btn btn-danger" onClick={(event,id)=>this.onDeleteExpClick(event,exp._id)}>
                Delete
            </button>
            </td>
        </tr>
    ));
    return (
    <div>
        <h4 className="mb-2">Experience Credentials</h4>
        <table className="table">
            <thead>
            <tr>
                <th>Company</th>
                <th>Title</th>
                <th>Years</th>
            
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {experience}
            </tbody>
        </table>
    </div>
    )
  }
}
ExperienceTable.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}
export default connect(null,{deleteExperience})(ExperienceTable);