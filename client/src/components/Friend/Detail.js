//好友详情
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import './Detail.less';

import pathConfigs from '../../routes/path';
import Card from '../share/Card/';

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

    constructor(props) {
        super(props);
    }

    render() {
        const { avatarUrl, nickname, remark, telephone, address, gender, userId, username } = this.props;
        
        return (
            <ul className="detail-info">
                <Card
                    classPrefix="user-info"
                    userInfo={{ avatarUrl, nickname, remark }}
                    genderShow={true}
                    countShow={true}
                    nicknameShow={true}
                    userInfo={{ avatarUrl, nickname, remark, gender, username }}
                /> 
                <li className="user-info-contact">
                    <p>
                        <span>电话</span>
                        <i><a href={`tel:${telephone}`}>{telephone}</a></i>
                    </p>
                    <p>
                        <span>地区</span>
                        <i>{address}</i>
                    </p>
                </li>
                <li className="btn-group">
                    <Link to={`${pathConfigs.messages}/${userId}`} className="btn btn-green">发消息</Link>
                </li>
            </ul>
        );
    }

}