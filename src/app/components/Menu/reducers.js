import { actionTypes } from 'appdir/app';
import _ from 'lodash';

export default (state = {}, action) => {
    let collapsed, filters;

    switch (action.type) {

        case actionTypes.MENU_MOUNT:
            return Object.assign({}, state, {...action.data});

        case actionTypes.MENU_ANIMATING:
            return Object.assign({}, state, {animating: true});

        case actionTypes.MENU_TOGGLE:
            return Object.assign({}, state, {
                status: (state.status === 'opened') ? 'closed' : 'opened',
                animating: false,
            });

        case actionTypes.MENU_ITEM_TOGGLE:
            collapsed = state.collapsed || [];

            if (collapsed.indexOf(action.item) > -1) {
                collapsed = _.without(collapsed, action.item);
            } else {
                collapsed.push(action.item);
            }
            return Object.assign({}, state, {collapsed: _.uniq(collapsed)});

        case actionTypes.MENU_ITEM_EXPAND:
            collapsed = state.collapsed || [];
            collapsed = _.without(collapsed, action.item);
            return Object.assign({}, state, {collapsed: collapsed});

        case actionTypes.MENU_ITEM_COLLAPSE:
            collapsed = state.collapsed || [];
            collapsed.push(action.item);
            return Object.assign({}, state, {collapsed: _.uniq(collapsed)});

        case actionTypes.MENU_SEARCH:
            let search = (action.text.length > 0) ? action.text : undefined;
            return Object.assign({}, state, {filterText: search});

        case actionTypes.MENU_FILTER:
            filters = state.filters || [];
            if (filters.indexOf(action.filter) > -1) {
                filters = _.without(filters, action.filter);
            } else {
                filters.push(action.filter);
            }
            return Object.assign({}, state, {filters: _.uniq(filters)});

        case actionTypes.REGISTRY_LOADED:
            return Object.assign({}, state, {ready: true});

        default:
            return state;
    }
};
