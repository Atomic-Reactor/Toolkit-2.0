import Dashboard from './index';
import { actions } from 'appdir/app';

export default {
    path: '/',
    exact: true,
    component: Dashboard,
    load: params => actions.Dashboard.mount(params),
};
