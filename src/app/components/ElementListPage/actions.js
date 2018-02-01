import { actionTypes } from 'appdir/app';
import { services } from 'appdir/app';

export default {
    mount: (data) => (dispatch) => {
        dispatch({type: actionTypes.ELEMENTLISTPAGE_MOUNT, data: data});
    },
};
