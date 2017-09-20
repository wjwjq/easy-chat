import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import config from '../../configs/config';
import pathConfigs from '../../routes/path';

import Logout from  '../Auth//Logout';

import './index.less';

@connect((store) => {
    return {
        user: store.user.user
    };
})
export default  class My extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { avatarUrl, nickname, username, gender } = this.props.user;

        const genderClasses = classnames({
            icon: true,
            'icon-male': !gender,
            'icon-female': gender
        });
        
        return (
            <div className="user">
                <section className="user-info">
                    <Link to={`${pathConfigs.my}/detail`} className="user-info-item">
                        <img src={avatarUrl || config.defaultAvatar}  className="user-info-avatar"/>
                        <dl className="user-info-content">
                            <dt>{nickname} <i className={genderClasses}></i></dt>
                            <dd>用户号: {username}</dd>
                        </dl> 
                        <i className="icon icon-arrow-right user-icon-arrow-right"></i>
                    </Link>
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
                        <Logout><span>注销登录</span></Logout>
                    </li>
                </ul>
            </div>
        );
    }

}
