import { actionTypes } from 'appdir/app';
import { services } from 'appdir/app';

const compileManifest = (data) => {
    let newData = Object.assign({}, data);
    let prep = [];
    let arr = [];

    if (data.registry.hasOwnProperty('children')) {
        prep = data.registry.children.slice();

        while (prep.length > 0) {
            let item = prep[0];
            let name = item.name.toLowerCase();

            if (name === '.ds_store') {
                prep.shift();
                continue;
            }

            if (item.hasOwnProperty('children')) {
                prep = prep.concat(item.children.slice());
            }

            //delete item.children;
            arr.push(item);
            prep.shift();
        }

        newData.manifest = arr;
    }

    return newData;
};

export default {
    mount: () => (dispatch) => {
        dispatch({type: actionTypes.REGISTRY_MOUNT});

        services.Registry.fetch().then((data) => {
            dispatch({type: actionTypes.REGISTRY_LOADED, data:compileManifest(data)});
        });
    },
};
