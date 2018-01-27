import { actionTypes } from 'appdir/app';

export default (state = {}, action) => {

    switch (action.type) {

        case actionTypes.MENU_MOUNT:
            return Object.assign({}, state, {...action.data});

        case actionTypes.MENU_LOADED:
            console.log(action.data);
            return Object.assign({}, state, {...action.data});

        case actionTypes.MENU_ANIMATING:
            return Object.assign({}, state, {animating: true});

        case actionTypes.MENU_TOGGLE:
            return Object.assign({}, state, {
                status: (state.status === 'opened') ? 'closed' : 'opened',
                animating: false,
            });

        default:
            return state;
    }
};
