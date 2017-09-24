import React, { PureComponent } from 'react';

import Back from './Back';
import './Header.less';


export default class Header extends PureComponent {
    render() {
        const { title, showBackButton } = this.props;
        return (
            <header>
                <div className="handles left-handles">
                    {showBackButton && <Back />}
                </div>
                <div className="center-text">
                    <span>
                        {title || '消息'}
                    </span>    
                </div>
                <div className="handles right-handles">
                </div>
            </header>
        );
    }

}