import { actionTypes } from 'appdir/app';
import { services } from 'appdir/app';
import TweenMax, { Power2 } from 'gsap';

export default {

    mount: (data) => (dispatch) => {
        dispatch({type: actionTypes.MENU_MOUNT, data: data});
    },

    toggle: (nav) => (dispatch, getState) => {
        let state = getState()['Menu'];

        if (state.animating === true) { return; }
        dispatch({type: actionTypes.MENU_ANIMATING});
        nav.style.display = 'block';

        let computed = window.getComputedStyle(nav, null);
        let css = computed.getPropertyValue('content').replace(/\\/gi, '').replace('"{', '{').replace('}"', '}');
            css = JSON.parse(css);

        let pos = {
            opened: {
                left: css.left,
                width: css.width,
            },
            closed: {
                left: css.right,
                width: css.width,
            }
        };

        let cls = (state.status === 'opened') ? 'closed' : 'opened';
        nav.classList.add('menu-animating');

        let anime = pos[state.status];
            anime['ease'] = Power2.easeInOut;
            anime['onComplete'] = () => {
                nav.classList.remove('menu-opened');
                nav.classList.remove('menu-closed');
                nav.classList.remove('menu-animating');
                nav.classList.add(`menu-${cls}`);

                dispatch({type: actionTypes.MENU_TOGGLE});
            };

        TweenMax.to(nav, css.speed, anime);

    },

    item_expand: (p) => (dispatch) => { dispatch({type: actionTypes.MENU_ITEM_EXPAND, item: p}); },

    item_toggle: (p) => (dispatch) => { dispatch({type: actionTypes.MENU_ITEM_TOGGLE, item: p}); },

    item_collapse: (p) => (dispatch) => { dispatch({type: actionTypes.MENU_ITEM_COLLAPSE, item: p}); },

    search: (text) => (dispatch) => { dispatch({type: actionTypes.MENU_SEARCH, text: text}); },

    filter: (filter) => (dispatch) => { dispatch({type: actionTypes.MENU_FILTER, filter: filter}); },
};
