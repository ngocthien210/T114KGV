import React, { Component } from 'react'
import Loading from './Loading';

export default class Spinner extends Component {
  render() {
    return (
      <div className="loading">
        <div className="loading-page">
            <div className="content">
                <Loading animationDelay="0.5s"/>
                <Loading animationDelay="0.4s"/>
                <Loading animationDelay="0.3s"/>
                <Loading animationDelay="0.2s"/>
                <Loading animationDelay="0.1s"/>
                <Loading animationDelay="0s"/>
            </div>
        </div>
      </div>
    )
  }
}
