
/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import Icon from 'appdir/components/Icon';


/**
 * -----------------------------------------------------------------------------
 * React Component: Search
 * -----------------------------------------------------------------------------
 */

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState((prevState) => {
            return Object.assign({}, prevState, nextProps);
        });
    }

    onChange (e) {
        this.setState({value: e.target.value});

        if (this.state.hasOwnProperty('onChange')) {
            this.state.onChange(e);
        }
    }

    onFocus (e) {
        this.setState({focus: true});

        if (this.state.hasOwnProperty('onFocus')) {
            this.state.onFocus(e);
        }
    }

    onBlur (e) {
        this.setState({focus: false});

        if (this.state.hasOwnProperty('onBlur')) {
            this.state.onBlur(e);
        }
    }

    value () {
        return this.state.value;
    }

    render() {
        return (
            <div className={this.state.className}>
                <input
                    value={this.state.value || ''}
                    onBlur={this.onBlur.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                    onChange={this.onChange.bind(this)}
                    placeholder={this.state.placeholder}
                />
                <Icon name={this.state.icon} size={this.state.iconSize} />
            </div>
        );
    }
}

Search.defaultProps = {
    className: 'search-box',
    placeholder: 'Search',
    icon: 'search',
    iconSize: 16,
};

export default Search;
