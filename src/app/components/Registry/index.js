
/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'appdir/app';


/**
 * -----------------------------------------------------------------------------
 * React Component: Registry
 * -----------------------------------------------------------------------------
 */
const mapStateToProps = (state, props) => {
    return Object.assign({}, state['Registry'], props);
};

const mapDispatchToProps = (dispatch) => ({
    mount: () => dispatch(actions.Registry.mount()),
});

class Registry extends Component {
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

    render() {
        return <span />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registry);
