//好友详情
import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import './Detail.less';

import config from '../../configs/config';
import pathConfigs from '../../routes/path';

export default class FriendDetail extends Component {
    
    static propTypes = {
        avatarUrl: PropTypes.string,
        username: PropTypes.string,
        nickname: PropTypes.string,
        userId: PropTypes.string,
        gender: PropTypes.number,
        remark: PropTypes.string,
        telephone: PropTypes.string,
        address: PropTypes.string
    }

    constructor(props){
        super(props);
    }

    render() {
        const { avatarUrl, nickname, remark, telephone, address, gender, userId, username } = this.props;
        
        const genderClasses = classnames({
            icon: true,
            'icon-male': !gender,
            'icon-female': gender
        });
        
        return (
            <div className="detail-info">
                <div className="detail-info-item">
                    <img src={avatarUrl || config.defaultAvatar}  className="detail-info-avatar"/>
                    <dl className="detail-info-content">
                        <dt>{remark || nickname} <i className={genderClasses}></i></dt>
                        <dd>用户号: {username}</dd>
                        {remark && <dd>昵称：{nickname}</dd>}
                    </dl> 
                </div> 
                <div className="detail-info-contact">
                    <p>
                        <span>电话</span>
                        <i><a href={`tel:${telephone}`}>{telephone}</a></i>
                    </p>
                    <p>
                        <span>地区</span>
                        <i>{address}</i>
                    </p>
                </div>
                <div className="btn-group">
                    <Link to={`${pathConfigs.messages}/${userId}`} className="btn btn-green">发消息</Link>
                </div>
            </div>
        );
    }

}