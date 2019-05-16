import React, { Component } from 'react'
import PropTypes from 'prop-types';
class Loading extends Component {
    render() {
        let styleSheet = document.styleSheets[0];
        
        let keyframes =
        `@-webkit-keyframes loader {
            0% {-webkit-transform: translateX(-200px); opacity: 0;}
            25% {opacity: 1;}
            50% {-webkit-transform: translateX(200px); opacity: 0;}
            100% {opacity: 0;}
        }`;
     
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
        let style = {
            animationName: 'loader',
            animationTimingFunction: 'cubic-bezier(0.030, 0.615, 0.995, 0.415)',
            animationDuration: '4s',
            animationDelay: this.props.animationDelay,
            animationFillMode: 'both',
            animationIterationCount: 'infinite'
          };
        return (
            <span className="loading" style={style}/>
        )
    }
}
Loading.propTypes = {
    animationDelay: PropTypes.string.isRequired
}
export default Loading;