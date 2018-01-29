
/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import Logo from 'appdir/components/Logo';
import Icon from 'appdir/components/Icon';

/**
 * -----------------------------------------------------------------------------
 * React Component: Header
 * -----------------------------------------------------------------------------
 */

class Header extends Component {
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
            <Fragment>
                <header>
                    <div className='flex'>
                        <Logo width={32} height={32} />
                        <h1 className='h-6 m-x-20 flex-grow'>{this.state.title}</h1>
                    </div>
                </header>
            </Fragment>
        );
    }
}

Header.defaultProps = {
    title: 'Atomic Reactor Toolkit',
};

export default Header;
