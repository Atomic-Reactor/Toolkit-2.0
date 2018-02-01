
/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import Style from 'appdir/utils/Style';


/**
 * -----------------------------------------------------------------------------
 * React Component: SearchFilters
 * -----------------------------------------------------------------------------
 */

const Svg = {
    Atoms: function (props) {
        return (
            <svg viewBox={`0 0 ${props.viewbox} ${props.viewbox}`} width={props.size} height={props.size}>
                <path d="M130,0A130,130,0,1,0,260,130,130,130,0,0,0,130,0Zm0,231.61A101.61,101.61,0,1,1,231.61,130,101.61,101.61,0,0,1,130,231.61Z" />
                <circle cx="130" cy="130" r="66.3" fill={props.color} />
                <circle cx="219.96" cy="56.43" r="29.05" fill={props.color} />
            </svg>
        );
    },
    Molecules: function (props) {
        return (
            <svg viewBox={`0 0 ${props.viewbox} ${props.viewbox}`} width={props.size} height={props.size}>
                <path d="M194.54,64.36a64.36,64.36,0,1,0-64.36,64.36A64.36,64.36,0,0,0,194.54,64.36Zm-114.67,0a50.31,50.31,0,1,1,50.31,50.31A50.31,50.31,0,0,1,79.87,64.36Z" />
                <circle cx="130.17" cy="64.36" r="32.83" fill={props.color} />
                <circle cx="161.24" cy="112.31" r="14.38" fill={props.color} />
                <circle cx="101.62" cy="112.31" r="14.38" fill={props.color} />
                <path d="M163.64,231.36a64.36,64.36,0,1,0-23.87-87.84A64.36,64.36,0,0,0,163.64,231.36Zm57-99.51A50.31,50.31,0,1,1,152,150.51,50.31,50.31,0,0,1,220.62,131.85Z" />
                <circle cx="195.63" cy="175.5" r="32.83" transform="translate(-53.88 258.07) rotate(-60.21)" fill={props.color} />
                <circle cx="138.58" cy="178.64" r="14.38" transform="translate(-85.3 210.14) rotate(-60.21)" fill={props.color} />
                <circle cx="168.2" cy="126.9" r="14.38" transform="translate(-25.5 209.82) rotate(-60.21)" fill={props.color} />
                <path d="M34.41,118.54a64.36,64.36,0,1,0,86.93,27A64.36,64.36,0,0,0,34.41,118.54ZM87.8,220a50.31,50.31,0,1,1,21.1-67.94A50.31,50.31,0,0,1,87.8,220Z" />
                <circle cx="64.38" cy="175.5" r="32.83" transform="translate(-74.31 50.15) rotate(-27.75)" fill={props.color} />
                <circle cx="92.35" cy="125.69" r="14.38" transform="translate(-47.9 57.45) rotate(-27.75)" fill={props.color} />
                <circle cx="120.1" cy="178.45" r="14.38" transform="translate(-69.27 76.44) rotate(-27.75)" fill={props.color} />
            </svg>
        );
    },
    Organisms: function (props) {
        return (
            <svg viewBox={`0 0 ${props.viewbox} ${props.viewbox}`} width={props.size} height={props.size}>
                <path d="M260,216a44,44,0,1,0-44,44A44,44,0,0,0,260,216Zm-78.32,0A34.36,34.36,0,1,1,216,250.4,34.36,34.36,0,0,1,181.68,216Z"/>
                <ellipse fill={props.color} cx="216.04" cy="216.03" rx="22.42" ry="22.43"/>
                <path d="M174,216a44,44,0,1,0-44,44A44,44,0,0,0,174,216Zm-78.32,0A34.36,34.36,0,1,1,130,250.4,34.36,34.36,0,0,1,95.64,216Z"/>
                <ellipse fill={props.color} cx="130" cy="216.03" rx="22.42" ry="22.43"/>
                <circle fill={props.color} cx="173.15" cy="216.03" r="11.83"/>
                <path d="M87.92,216a44,44,0,1,0-44,44A44,44,0,0,0,87.92,216ZM9.6,216A34.36,34.36,0,1,1,44,250.4,34.36,34.36,0,0,1,9.6,216Z"/>
                <ellipse fill={props.color} cx="43.96" cy="216.03" rx="22.42" ry="22.43"/>
                <circle fill={props.color} cx="87.11" cy="216.03" r="11.83"/>
                <path d="M260,130a44,44,0,1,0-44,44A44,44,0,0,0,260,130Zm-78.32,0A34.36,34.36,0,1,1,216,164.34,34.36,34.36,0,0,1,181.68,130Z"/>
                <ellipse fill={props.color} cx="216.04" cy="129.97" rx="22.42" ry="22.43"/>
                <circle fill={props.color} cx="216.17" cy="173.06" r="11.83"/>
                <path d="M174,130a44,44,0,1,0-44,44A44,44,0,0,0,174,130Zm-78.32,0A34.36,34.36,0,1,1,130,164.34,34.36,34.36,0,0,1,95.64,130Z"/>
                <ellipse fill={props.color} cx="130" cy="129.97" rx="22.42" ry="22.43"/>
                <circle fill={props.color} cx="173.15" cy="129.97" r="11.83"/>
                <circle fill={props.color} cx="130.13" cy="173.06" r="11.83"/>
                <path d="M87.92,130a44,44,0,1,0-44,44A44,44,0,0,0,87.92,130ZM9.6,130A34.36,34.36,0,1,1,44,164.34,34.36,34.36,0,0,1,9.6,130Z"/>
                <ellipse fill={props.color} cx="43.96" cy="129.97" rx="22.42" ry="22.43"/>
                <circle fill={props.color} cx="87.11" cy="129.97" r="11.83"/>
                <circle fill={props.color} cx="44.1" cy="173.06" r="11.83"/>
                <path d="M260,44a44,44,0,1,0-44,44A44,44,0,0,0,260,44Zm-78.32,0A34.36,34.36,0,1,1,216,78.34,34.36,34.36,0,0,1,181.68,44Z"/>
                <ellipse fill={props.color} cx="216.04" cy="43.97" rx="22.42" ry="22.43"/>
                <circle fill={props.color} cx="216.17" cy="87.07" r="11.83"/>
                <path d="M174,44a44,44,0,1,0-44,44A44,44,0,0,0,174,44ZM95.64,44A34.36,34.36,0,1,1,130,78.34,34.36,34.36,0,0,1,95.64,44Z"/>
                <ellipse fill={props.color} cx="130" cy="43.97" rx="22.42" ry="22.43"/>
                <circle fill={props.color} cx="173.15" cy="43.97" r="11.83"/>
                <circle fill={props.color} cx="130.13" cy="87.07" r="11.83"/>
                <path d="M87.92,44a44,44,0,1,0-44,44A44,44,0,0,0,87.92,44ZM9.6,44A34.36,34.36,0,1,1,44,78.34,34.36,34.36,0,0,1,9.6,44Z"/>
                <ellipse fill={props.color} cx="43.96" cy="43.97" rx="22.42" ry="22.43"/>
                <circle fill={props.color} cx="87.11" cy="43.97" r="11.83"/>
                <circle fill={props.color} cx="44.1" cy="87.07" r="11.83"/>
            </svg>
        );
    },
    Catalyst: function (props) {
        return (
            <svg viewBox={`0 0 ${props.viewbox} ${props.viewbox}`} width={props.size} height={props.size}>
                <path fill={props.color} d="M22.12,136.41a1.28,1.28,0,0,0-.3-.95A9.05,9.05,0,0,0,22.12,136.41Z"/>
                <path fill={props.color} d="M123.46,87.14C117.57,156.71,30,157.49,22.12,136.41c.44,8.66-22.49,70.14,48,100.7,46.23,18.65,90-1.41,101.65-48.32C185.34,134.33,159.34,87.93,123.46,87.14Zm-71.61,95.5a11.06,11.06,0,1,1,11.06-11.06A11.06,11.06,0,0,1,51.85,182.65Zm38.26,30.41a10.78,10.78,0,1,1,10.78-10.78A10.78,10.78,0,0,1,90.11,213.05Zm46.67-25.79a19.4,19.4,0,1,1,19.4-19.4A19.4,19.4,0,0,1,136.78,187.26Z"/>
                <path className='no-fill' d="M97,63.52a97,97,0,1,0,97,97A97,97,0,0,0,97,63.52Zm0,172.83a75.82,75.82,0,1,1,75.82-75.82A75.82,75.82,0,0,1,97,236.35Z"/>
                <path fill={props.color} d="M188,6.72,118.43,76.3,110.71,84c3.62-.15,13.07.55,12.55,5.23-.9,7.93,17.58,14.12,25.24,23.91,6.48,8.28,14.76,16,20.4,24.82a20,20,0,0,1,3.46,10.49l78.71-78.71Z"/>
                <path className='no-fill' d="M257,75,185,3a10.35,10.35,0,0,0-14.63,14.63L173.72,21,118.43,76.3,110.71,84c3.62-.15,6.4,3.13,10.82,4.73a57,57,0,0,1,9.65,4.07L188,36,221.8,69.76l-56.5,56.5-.43.43a56.38,56.38,0,0,1,4.3,10.47A70.36,70.36,0,0,1,172,149.3l7.93-8.42,56.82-56.82,5.58,5.58A10.35,10.35,0,0,0,257,75Z"/>
            </svg>
        )
    }
};

class SearchFilters extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState((prevState) => {
            return Object.assign({}, prevState, nextProps);
        });
    }

    static getFilter(filter) {
        filter = filter.toLowerCase();

        let filters = {
            'atoms': 'atom',
            'molecules': 'molecule',
            'organisms': 'organism',
            'catalyst': 'catalyst',
        };

        return filters[filter] || filter;
    }

    onClick(filter) {
        if (this.state.hasOwnProperty('onClick')) {
            this.state.onClick(SearchFilters.getFilter(filter));
        }
    }

    render() {
        return (
            <div>
                <nav className='search-filters'>
                    {Object.keys(Svg).map((key) => {
                        let k = SearchFilters.getFilter(key);
                        let cls = (this.state.filters.indexOf(k) > -1) ? 'active' : '';
                        return (
                            <button onClick={this.onClick.bind(this, key)} key={`search-filter-button-${key}`} className={`${cls} ${k}`}>
                                {Svg[key](this.state)}
                                <span>{key}</span>
                            </button>
                        )
                    })}
                </nav>
            </div>
        );
    }
}

SearchFilters.defaultProps = {
    color: Style.color.grey3,
    activeColor: Style.color.highlight,
    viewbox: 260,
    size: '50%',
    filters: ['atom'],
};

export default SearchFilters;
