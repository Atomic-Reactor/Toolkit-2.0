import { actionTypes } from 'appdir/app';

export default (state = {}, action) => {

    switch (action.type) {

        case actionTypes.REGISTRY_MOUNT:
            return Object.assign({}, state, {...action.data});

        case actionTypes.REGISTRY_LOADED:
            return Object.assign({}, state, {...action.data});

        default:
            return state;
    }
};
