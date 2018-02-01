import { actionTypes } from 'appdir/app';

export default (state = {}, action) => {

    let newState;

    switch (action.type) {
        case actionTypes.UPDATE_ROUTE:
            return Object.assign({}, state, {...action.params});

        case actionTypes.ELEMENTLISTPAGE_MOUNT:
            newState = Object.assign({}, state, {...action.data});
            return newState;

        case actionTypes.REGISTRY_LOADED:
            return Object.assign({}, state, {ready: true});

        default:
            return state;
    }
};
