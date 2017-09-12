//用户卡片
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import config from '../../configs/config';

export default class FriendCard extends Component {
    
    static propTypes = {
        avatarUrl: PropTypes.string,
        nickname: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        remark: PropTypes.string
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { userId, avatarUrl, nickname, remark } = this.props;

        const classPrefix = 'friend-card';
        
        return (
            <li className={`${classPrefix}-item`}>
                <Link to={`/friends/${userId}`}>
                    <img src={avatarUrl || config.defaultAvatar} className={`${classPrefix}-avatar`}/>
                    <dl className={`${classPrefix}-content`}>
                        <dt><strong>{remark || nickname}</strong></dt>
                    </dl>
                </Link>
            </li>
        );
    }

} 