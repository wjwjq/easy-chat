import React, { PureComponent } from 'react';
import classnames from 'classnames';

export default  class NavIcon extends PureComponent {
    render() {
        const { isActive, icons } = this.props;
        let geIcons = {};
        icons.split(' ').map((item, idx) => {
            geIcons[item] =  idx === 1 
                ? !isActive
                : idx === 2 
                    ? isActive 
                    : true;
        });
        const iconClasses = classnames({ ...geIcons });
        return (
            <i className={iconClasses}></i>
        );
    }
}