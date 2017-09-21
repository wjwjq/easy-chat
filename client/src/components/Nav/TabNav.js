import React, { Component } from 'react';

// import PropTypes from 'prop-types';
import NavIcon from './NavIcon';

export default class TabNav extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    getNavs() {
        const { navs, activeIndex, onTabClick } = this.props;

        return navs.map((item) => {
            const order = parseInt(item.props.order, 10);
            const { icons } = item.props;
            const isActive = activeIndex === order;
            return (
                <li 
                    key={order}
                    onClick= {onTabClick.bind(this, order)}
                    className={ isActive? 'active' : ''}
                > 
                    {icons && <NavIcon isActive={isActive} icons={icons} />}
                    {item.props.tab}
                </li>
            );
        });
    }
    render() {
        return (
            <nav className="nav">
                <ul>
                    {this.getNavs()}
                </ul>
            </nav>
        );
    }

}