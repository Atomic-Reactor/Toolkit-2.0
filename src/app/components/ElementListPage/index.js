
/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import Menu from 'appdir/components/Menu';
import { connect } from 'react-redux';
import { actions } from 'appdir/app';
import { store } from 'appdir/app';
import path from 'path';
import _ from 'lodash';

/**
 * -----------------------------------------------------------------------------
 * React Component: ElementListPage
 * -----------------------------------------------------------------------------
 */
const mapStateToProps = (state, props) => {
    return Object.assign({}, state['ElementListPage'], props);
};

const mapDispatchToProps = (dispatch) => ({
    mount: (params) => dispatch(actions.ElementListPage.mount(params)),
});

class ElementListPage extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState((prevState) => {
            return Object.assign({}, prevState, nextProps);
        });
    }

    getContent() {
        let sto = store.getState();
        let reg = sto['Registry'];

        let key = [];
        if (this.state.hasOwnProperty('group')) { key.push(this.state.group); }
        key.push(this.state.element);
        key = key.join('-').toLowerCase();

        let data = reg.data[key] || {};

        let p = path.join(reg.src.root, this.state.location.pathname);

        // Return the files
        let elements = _.filter(reg.manifest, {path: p});


        // console.log('registry:', reg);
        // console.log('data:', data);
        // console.log('state:', this.state);
        // console.log('path:', p);
        console.log('elements:', elements);
    }

    render() {

        this.getContent();

        return (
            <div>
                <Menu />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementListPage);
