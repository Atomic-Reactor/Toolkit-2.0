import axios from 'axios';
import { restHeaders } from "appdir/app";


const fetch = () => {
    return axios.get(`/app/assets/data/registry.json`).then(({data}) => { return data; });
};

export default {
    fetch,
};
