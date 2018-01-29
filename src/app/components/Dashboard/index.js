
/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'appdir/app';
import Menu from 'appdir/components/Menu';


/**
 * -----------------------------------------------------------------------------
 * React Component: Dashboard
 * -----------------------------------------------------------------------------
 */
const mapStateToProps = (state, props) => {
    return Object.assign({}, state['Dashboard'], props);
};

const mapDispatchToProps = (dispatch) => ({
    mount: () => dispatch(actions.Dashboard.mount()),
});

class Dashboard extends Component {
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
        return (
            <div>
                <Menu />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
