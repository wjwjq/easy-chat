import React, { PureComponent } from 'react';

import Back from '../share/Back/';
import './Header.less';


export default class Header extends PureComponent {
    render() {
        const { title, showBackButton, children, arrowShow } = this.props;
        return (
            <header className="header">
                <div className="handles left-handles">
                    {showBackButton && <Back arrowShow={arrowShow}/>}
                </div>
                <div className="center-text">
                    <span>
                        {title || '消息'}
                    </span>    
                </div>
                <div className="handles right-handles">
                    {children}
                </div>
            </header>
        );
    }

}