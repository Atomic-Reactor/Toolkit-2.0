
/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom'
import _ from 'lodash';
import Icon from 'appdir/components/Icon';
import path from 'path';



/**
 * -----------------------------------------------------------------------------
 * Functional Component: MenuItems
 * -----------------------------------------------------------------------------
 */
const registry = {};

const iconSize = 12;

const getMenuTitle = (data) => {
    if (!data) {
        return;
    }
    // Set the menu title for the group
    if (data.hasOwnProperty('menu')) {
        if (typeof data.menu === 'string') {
            return data.menu;
        }
    }
};

const getUrl = (s) => {
    s = s.split(registry.src.root).join('');
    return s;
};

const isExpanded = (u) => {
    let collapsed = registry.collapsed || [];

    if (collapsed.length > 0) {
        for (let i = 0; i < collapsed.length; i++) {
            let t = collapsed[i];
            let exp = RegExp(t, 'gi');
            if (exp.test(u) === true) {
                return false;
            }
        }
    }

    return true;
};

const Elements = (props) => {
    let items = (props.hasOwnProperty('children')) ? props.children : [];

    if (items.length > 0) {
        return (
            <Fragment>
                {items.map((item, i) => {
                    // Get data file so we can get the menu title
                    let key  = [props.parent, item.name].join('-').toLowerCase();
                    let data = (registry.data.hasOwnProperty(key)) ? registry.data[key] : {};

                    // Hide menu if item if data.menu === false
                    if (data.hasOwnProperty('menu')) {
                        if (data.menu === false) {
                            return null;
                        }
                    }

                    if (item.type === 'file') {
                        // Hide if the file type isn't the same as registry.markupExt
                        if (item.extension.toLowerCase() !== `.${registry.markupExt}`) {
                            return null;
                        }

                        let name = getMenuTitle(data) || item.name;
                        let url = getUrl(item.path);

                        return (
                            <li key={`menu-item-${i}`} className='menu-item' aria-expanded={isExpanded(url)}>
                                <NavLink to={url} activeClassName={'active'}>{name}</NavLink>
                            </li>
                        );
                    }

                    if (item.type === 'directory') {
                        let children = (item.hasOwnProperty('children')) ? item.children : [];

                        if (children.length < 1) {
                            return;
                        }

                        let markup = _.find(children, {name: `markup.${registry.markupExt}`});

                        if (!markup) {
                            return null;
                        }

                        let name = getMenuTitle(data) || item.name;
                        let url = getUrl(item.path);
                        return (
                            <li key={`menu-item-${i}`} className='menu-item' aria-expanded={isExpanded(url)}>
                                <NavLink to={url} activeClassName={'active'}>{name}</NavLink>
                            </li>
                        );
                    }
                })}
            </Fragment>
        );
    }
};

const Group = (props) => {
    if (props.hasOwnProperty('children')) {
        // Draw sub directories
        let children = _.filter(props.children, {type: 'directory'});
        let groupUrl = getUrl(props.path);

        if (children.length > 0) {
            return (
                <Fragment>
                    <li className={'menu-group-heading'} aria-expanded={isExpanded(groupUrl)}>
                        <NavLink to={groupUrl} activeClassName={'active'}>{props.name}</NavLink>
                        <button onClick={() => { registry.onCollapseToggle(groupUrl); }}>
                            <Icon name={(isExpanded(groupUrl) === true) ? 'chevronUp' : 'chevronDown'} size={iconSize} />
                        </button>
                    </li>
                    {children.map((item, i) => {

                        // Get data file so we can get the menu title
                        let data = (registry.data.hasOwnProperty(item.name)) ? registry.data[item.name] : {};

                        // Hide menu if item if data.menu === false
                        if (data.hasOwnProperty('menu')) {
                            if (data.menu === false) {
                                return null;
                            }
                        }

                        let name = getMenuTitle(data) || item.name;
                        let url = getUrl(item.path);

                        // Hide if the item is a directory and there are no markup files within
                        if (item.type === 'directory') {
                            let myChildren = (item.hasOwnProperty('children')) ? item.children : [];
                            if (myChildren.length < 1) {
                                return;
                            } else {
                                let subdirs = _.filter(myChildren, {type: 'directory'});

                                let markup = _.find(myChildren, {name: `markup.${registry.markupExt}`});
                                if (markup && subdirs.length < 1) {
                                    return (
                                        <li key={`element-${i}`} className='menu-item' aria-expanded={isExpanded(url)}>
                                            <NavLink to={url} activeClassName={'active'}>{name}</NavLink>
                                        </li>
                                    );
                                }

                                if (!markup && subdirs.length < 1) {
                                    return;
                                }

                                if (!markup && subdirs.length > 1) {
                                    let hasMarkup = false;

                                    for (let i = 0; i < subdirs.length; i++) {
                                        let subdir = subdirs[i];
                                        let subChildren = (subdir.hasOwnProperty('children')) ? subdir.children : [];
                                        if (subChildren.length < 1) {
                                            continue;
                                        }

                                        markup = _.find(subChildren, {name: `markup.${registry.markupExt}`});
                                        if (markup) {
                                            hasMarkup = true;
                                            break;
                                        }
                                    }

                                    if (hasMarkup === false) {
                                        return;
                                    }
                                }
                            }
                        }

                        return (
                            <Fragment key={`element-${i}`}>
                                <li className='menu-heading' key={`element-${i}`} aria-expanded={isExpanded(url)}>
                                    <NavLink to={url} activeClassName={'active'}>{name}</NavLink>
                                    <button onClick={() => { registry.onCollapseToggle(url); }}>
                                        <Icon name={(isExpanded(url) === true) ? 'chevronUp' : 'chevronDown'} size={iconSize} />
                                    </button>
                                </li>
                                <Elements {...item} parent={item.name} data-parent={url} />
                            </Fragment>
                        );
                    })}
                </Fragment>
            );
        } else {
            children = _.filter(props.children, {type: 'file'});
            let files = _.compact(children.map((item) => {
                if (item.extension === `.${registry.markupExt}`) {
                    item['name'] = item.name.split(`.${registry.markupExt}`).join('');
                    return item;
                } else {
                    return null;
                }
            }));

            if (files.length > 0) {
                return (
                    <Fragment>
                        <li className='menu-group-heading' aria-expanded={isExpanded(groupUrl)}>
                            <NavLink to={groupUrl} activeClassName={'active'}>{props.name}</NavLink>
                            <button onClick={() => { registry.onCollapseToggle(groupUrl); }}>
                                <Icon name={(isExpanded(groupUrl) === true) ? 'chevronUp' : 'chevronDown'} size={iconSize} />
                            </button>
                        </li>
                        <Elements {...props} parent={props.name} />
                    </Fragment>
                );
            } else {
                return null;
            }
        }

    } else {
        return null;
    }
};

const Groups = (props) => {
    let children = props.registry.children;

    // default item groups
    let items = {
        Elements: _.find(children, {name: 'elements', type: 'directory'}),
        Catalyst: _.find(children, {name: 'catalyst', type: 'directory'}),
        Templates: _.find(children, {name: 'templates', type: 'directory'}),
    };

    // set custom item groups
    if (props.data.hasOwnProperty('settings')) {
        if (props.data.settings.hasOwnProperty('menuGroups')) {
            items = {};
            let groups = props.data.settings.menuGroups;
            Object.keys(groups).forEach((key) => {
                let item = groups[key];
                let title = (item.hasOwnProperty('title')) ? item.title : key;
                items[title] = _.find(children, {name: key, type: 'directory'});
            });
        }
    }

    return (
        <ul className='menu-groups'>
            {Object.keys(items).map((key, i) => {
                let group = items[key];
                if (group.hasOwnProperty('children')) {
                    if (group.children.length > 0) {

                        // Get data file so we can get the menu title
                        let data = (registry.data.hasOwnProperty(group.name)) ? registry.data[group.name] : {};

                        // Hide menu if item if data.menu === false
                        if (data.hasOwnProperty('menu')) {
                            if (data.menu === false) {
                                return null;
                            }
                        }

                        let name = getMenuTitle(data) || key;
                        let url = getUrl(group.path);

                        return (
                            <li className={`menu-group menu-group-${key}`} key={`menu-group-${i}`}  aria-expanded={isExpanded(url)}>
                                <ul><Group {...group} name={name} id={key} /></ul>
                            </li>
                        );
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            })}
        </ul>
    );
};

class MenuItems extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState((prevState) => {
            return Object.assign({}, prevState, nextProps);
        });
    }

    onCollapseToggle(p) {
        if (this.state.hasOwnProperty('onCollapseToggle')) {
            this.state.onCollapseToggle(p);
        }
    };

    onClick() {
        console.log('MenuItem.onClick()');
        if (this.state.hasOwnProperty('onClick')) {
            this.state.onClick();
        }
    }

    renderSearch() {
        let items = _.filter(this.state.manifest, {type: 'file', extension: `.${this.state.markupExt}`});

        items.forEach((item, i) => {
            let darr = path.dirname(item.path).split(this.state.src.root).join('').split(path.sep);
            let dir = darr.join('/');
            item['key'] = darr.pop();
            item['directory'] = dir;
            item['url'] = getUrl(dir);
            item['parent'] = darr.pop();
            item['key'] = _.compact([item.parent, item.key]).join('-').toLowerCase();

            let data = this.state.data[item.key] || {};

            item = Object.assign({}, item, data);

            if (item.menu !== false) {
                item['menu'] = item.menu || item.key.split('-').join(' / ');
                item['menu'] = (item.parent.length > 0)
                    ? `${item.parent} / ${item.menu}`
                    : item.menu;

                item['menu'] = (item.key === 'templates') ? `${item.menu} / ${item.name}` : item.menu;
                item['url'] += (item.key === 'templates') ? `/${item.name}` : '';
            }

            items[i] = item;
        });

        items = _.filter(items, (item) => { return (item.menu !== false); });
        items = _.filter(items, (item) => { return (item.key !== 'layouts'); });
        items = _.filter(items, (item) => { return (item.name !== `demo.${this.state.markupExt}`); });

        if (this.state.search) {
            let exp = RegExp(this.state.search, 'gi');
            items = _.filter(items, (item) => {
                return (exp.test(item.path) || exp.test(item.menu) || exp.test(item.title));
            });
        }

        if (this.state.filters) {
            let filters = this.state.filters || [];
            if (filters.length > 0) {
                items = _.filter(items, (item) => {
                    let atomic = item.atomic || null;
                    if (atomic === null) {
                        return false;
                    } else {
                        return (filters.indexOf(atomic) > -1);
                    }
                });
            }
        }

        if (items.length > 0) {
            // Sort the items
            items = _.sortBy(items, ['menu']);

            return (
                <ul className='menu-search'>
                    <li className="menu-heading">
                        <div className='link'>{items.length} search results</div>
                    </li>
                    {items.map((item, i) => {
                        return (
                            <li className='menu-item' key={`search-${i}`}>
                                <NavLink to={item.url} activeClassName='active'>
                                    {item.menu}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            return (
                <ul className='menu-search'>
                    <li className="menu-heading">
                        <div className='link'>0 search results</div>
                    </li>
                </ul>
            );
        }
    }

    render () {
        let props = this.state;

        if (!props.hasOwnProperty('registry')) {
            return null;
        }

        // Send the props to the registry object for later usage
        Object.keys(props).forEach((key) => {
            registry[key] = props[key];
        });

        if (props.registry.hasOwnProperty('children')) {

            // Render the search view if we have search text or filters
            let filters = this.state.filters || [];
            if (this.state.search || filters.length > 0) {
                return this.renderSearch();
            }

            // Render menu
            let children = _.filter(props.registry.children, {type: 'directory'});
            return <Groups {...props} children={children} />;
        } else {
            return null;
        }

    }
}

export default MenuItems;
