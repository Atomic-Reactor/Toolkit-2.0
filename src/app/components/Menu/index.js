
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
import { store } from 'appdir/app';
import MenuItems from './MenuItems';
import SearchFilters from './SearchFilters';
import Search from './Search';
import _ from 'lodash';

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
    subscribe: () => dispatch(actions.Menu.subscribe()),
    toggle: (nav, button) => dispatch(actions.Menu.toggle(nav, button)),
    item_collapse: (p) => dispatch(actions.Menu.item_collapse(p)),
    item_expand: (p) => dispatch(actions.Menu.item_expand(p)),
    item_toggle: (p) => dispatch(actions.Menu.item_toggle(p)),
    search: (text) => dispatch(actions.Menu.search(text)),
    filter: (filter) => dispatch(actions.Menu.filter(filter)),
});

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props);
    }

    componentDidMount() {
        this.state.mount();
        this.state.subscribe();
    }

    componentWillReceiveProps(nextProps) {
        this.setState((prevState) => {
            return Object.assign({}, prevState, nextProps);
        });
    }

    onSearchChange(e) {
        this.state.search(e.target.value);
    }

    onSearchFilter(filter) {
        this.state.filter(filter);
    }

    onToggle() {
        this.state.toggle(this.nav, this.button);
    }

    onCollapseToggle(p) {
        this.state.item_toggle(p);
    }

    render() {
        let cls     = (this.state.status === 'opened') ? 'menu-opened' : 'menu-closed';
        let ico     = (this.state.status === 'opened') ? 'cross' : 'menu';
        let iclr    = (this.state.status === 'opened') ? Style.color.lite : Style.color.secondary;
        let sto     = store.getState()['Registry'];

        return (
            <Fragment>
                <nav className={`menu ${cls}`} ref={(elm) => { this.nav = elm; }}>
                    <div>
                        <Header />
                        <SearchFilters onClick={this.onSearchFilter.bind(this)} filters={this.state.filters} />
                        <Search onChange={this.onSearchChange.bind(this)} value={this.state.filterText}/>
                        <MenuItems
                            {...sto}
                            onCollapseToggle={this.onCollapseToggle.bind(this)}
                            collapsed={this.state.collapsed || []}
                            search={this.state.filterText}
                            filters={this.state.filters}
                        />
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
