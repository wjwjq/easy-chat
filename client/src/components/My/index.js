import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import pathConfigs from '../../routes/path';

import Card from '../share/Card/';

import SignOut from  '../Auth/SignOut';

import './index.less';

@connect(store => {
    return {
        user: store.user.user
    };
})
export default  class My extends PureComponent {
    
    render() {
        const { user } = this.props;
        
        return (
            <div className="user">
                <section className="user-info">
                    <Card 
                        to={`${pathConfigs.my}/detail`} 
                        classPrefix="user-info" 
                        arrowShow={true} 
                        nicknameShow={true}
                        countShow={true}
                        genderShow={true} 
                        userInfo={user}
                    />
                </section>
                <ul className="user-line-wrap">
                    <li className="user-line">
                        <Link to={`${pathConfigs.my}/accountandsecurity`}>
                            <span>账号与安全</span>
                            <i className="icon icon-arrow-right user-icon-arrow-right"></i>
                        </Link>
                    </li>
                    <li className="user-line">
                        <Link to={`${pathConfigs.my}/blacklist`}>
                            <span>黑名单管理</span>
                            <i className="icon icon-arrow-right user-icon-arrow-right"></i>
                        </Link>
                    </li>
                    <li className="user-line">
                        <Link to={`${pathConfigs.my}/help`}>
                            <span>帮助与反馈</span>
                            <i className="icon icon-arrow-right user-icon-arrow-right"></i>
                        </Link>
                    </li>
                    <li className="user-line">
                        <Link to={`${pathConfigs.my}/about`}>
                            <span>关于</span>
                            <i className="icon icon-arrow-right user-icon-arrow-right"></i>
                        </Link>
                    </li>
                    <li className="user-line">
                        <SignOut><span>注销登录</span></SignOut>
                    </li>
                </ul>
            </div>
        );
    }

}
