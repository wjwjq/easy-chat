//用户卡片
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import pathConfigs from '../../routes/path';
import Card from '../share/Card/';

export default class FriendItem extends Component {
    
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

        return (
            <Card
                to={`${pathConfigs.friends}/${userId}`}
                classPrefix="friend-card"
                userInfo={{ avatarUrl, nickname, remark }}
            />
        );
    }

} 