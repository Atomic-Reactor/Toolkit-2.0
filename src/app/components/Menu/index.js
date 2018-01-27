
/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { actions } from 'appdir/app';
import Header from 'appdir/components/Header';
import Icon from 'appdir/components/Icon';
import Style from 'appdir/utils/Style';

/**
 * -----------------------------------------------------------------------------
 * React Component: Menu
 * -----------------------------------------------------------------------------
 */
const mapStateToProps = (state, props) => {
    return Object.assign({}, state['Menu'], props);
};

const mapDispatchToProps = (dispatch) => ({
    mount: () => dispatch(actions.Menu.mount()),
    toggle: (nav, button) => dispatch(actions.Menu.toggle(nav, button)),
});

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props);
    }

    componentDidMount() {
        this.props.mount();
    }

    componentWillReceiveProps(nextProps) {
        this.setState((prevState) => {
            return Object.assign({}, prevState, nextProps);
        });
    }

    onToggle() {
        this.props.toggle(this.nav, this.button);
    }

    render() {
        let cls = (this.state.status === 'opened') ? 'menu-opened' : 'menu-closed';
        let ico = (this.state.status === 'opened') ? 'cross' : 'menu';
        let iclr = (this.state.status === 'opened') ? Style.color.lite : Style.color.secondary;

        return (
            <Fragment>
                <nav className={`menu ${cls}`} ref={(elm) => { this.nav = elm; }}>
                    <div className="flex">
                        <Header />
                    </div>
                </nav>
                <button className='menu-toggle' onClick={this.onToggle.bind(this)} ref={(elm) => { this.button = elm; }}>
                    <Icon name={ico} size={25} color={iclr} />
                </button>
            </Fragment>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
