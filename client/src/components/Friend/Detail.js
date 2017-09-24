//好友详情
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Detail.less';
import pathConfigs from '../../routes/path';
import Card from '../share/Card/';


export default class FriendDetail extends PureComponent {
    
    static propTypes = {
        avatarUrl: PropTypes.string,
        username: PropTypes.string,
        nickname: PropTypes.string,
        friendId: PropTypes.string,
        gender: PropTypes.number,
        remark: PropTypes.string,
        telephone: PropTypes.string,
        address: PropTypes.string
    }

    render() {
        const { avatarUrl, nickname, remark, address, gender, friendId, username } = this.props;
        
        return (
            <ul className="detail-info">
                <Card
                    classPrefix="user-info"
                    genderShow={true}
                    countShow={true}
                    nicknameShow={true}
                    userInfo={{ avatarUrl, nickname, remark, gender, username }}
                /> 
                <li className="user-info-contact">
                    <p>
                        <span>电话</span>
                        <i><a href={`tel:${username}`}>{username}</a></i>
                    </p>
                    <p>
                        <span>地区</span>
                        <i>{address}</i>
                    </p>
                </li>
                <li className="btn-group">
                    <Link to={`${pathConfigs.messages}/${friendId}`} className="btn btn-green">发消息</Link>
                </li>
            </ul>
        );
    }

}