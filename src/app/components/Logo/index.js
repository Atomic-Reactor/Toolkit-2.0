
/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';


/**
 * -----------------------------------------------------------------------------
 * React Component: Logo
 * -----------------------------------------------------------------------------
 */

class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState((prevState) => {
            return Object.assign({}, prevState, nextProps);
        });
    }

    render() {
        return (
            <svg viewBox="0 0 21 21" width={this.state.width} height={this.state.height} >
                <mask id="a">
                    <path fill="#fff" d="M0 0h21v21H0z" />
                    <g stroke="#000" strokeWidth="2">
                        <path id="b" d="M0 21L9,6 12,10 21,0 12,15 9,11z" />
                    </g>
                </mask>
                <circle fill="none" stroke={this.state.color.circle} strokeWidth="3" cx="10.5" cy="10.5" r="9" mask="url(#a)" />
                <use xlinkHref="#b" fill={this.state.color.bolt} />
            </svg>
        );
    }
}

Logo.defaultProps = {
    width: 40,
    height : 40,
    color: {
        bolt: '#4F82BA',
        circle: '#000',
    }
};

export default Logo;
