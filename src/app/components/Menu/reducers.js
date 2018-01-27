import { actionTypes } from 'appdir/app';

export default (state = {}, action) => {

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

        case actionTypes.REGISTRY_LOADED:
            return Object.assign({}, state, {ready: true});

        default:
            return state;
    }
};
