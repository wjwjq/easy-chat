//好友详情
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Detail.less';
import Card from '../../share/Card/';


export default class FriendDetail extends PureComponent {
    
    static propTypes = {
        avatarUrl: PropTypes.string,
        username: PropTypes.string.isRequired,
        nickname: PropTypes.string,
        gender: PropTypes.number,
        remark: PropTypes.string,
        address: PropTypes.string
    }

    render() {
        const { avatarUrl, nickname, remark, address, gender,  username } = this.props;
        return (
            <div className="detail-info">
                <Card
                    classPrefix="user-info"
                    genderShow={true}
                    countShow={true}
                    nicknameShow={true}
                    userInfo={{ avatarUrl, nickname, remark, gender, username }}
                /> 
                <div className="user-info-contact">
                    <p>
                        <span>电话</span>
                        <i><a href={`tel:${username}`}>{username}</a></i>
                    </p>
                    <p>
                        <span>地区</span>
                        <i>{address}</i>
                    </p>
                </div>
            </div>
        );
    }
}