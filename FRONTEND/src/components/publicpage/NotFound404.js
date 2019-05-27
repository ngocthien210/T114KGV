import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class NotFound404 extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
            <div className="col-12">
                <h1 className="display-4">Sorry, page not found</h1>
                <Link to="/" className="btn btn-dark">Back</Link>
            </div>
        </div>
      </div>
    )
  }
}
