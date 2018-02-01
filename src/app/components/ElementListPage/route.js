import ElementListPage from './index';
import { actions } from 'appdir/app';

export default {
    path: ['/elements/:group/:element', '/elements/:group', '/elements'],
    exact: true,
    component: ElementListPage,
    load: params => actions.ElementListPage.mount(params),
};
