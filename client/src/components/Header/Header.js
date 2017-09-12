import React, { Component } from 'react';

import Back from './Back';
import './Header.less';


export default class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { showTitle, showBackButton } = this.props;
        return (
            <header>
                <div className="handles left-handles">
                    {showBackButton && <Back />}
                </div>
                <div className="center-text">
                    <span>
                        {showTitle || '消息'}
                    </span>    
                </div>
                <div className="handles right-handles">
                    ...
                </div>
            </header>
        );
    }

}