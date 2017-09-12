//消息联系人卡
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import config from '../../configs/config';
import { query } from '../utils/';

@connect((store) => {
    return {
        friends: store.friends.friends
    };
})
export default class MessageCard extends Component {

    static propTypes = {
        userId: PropTypes.string.isRequired,
        msg: PropTypes.arrayOf(PropTypes.shape({
            content: PropTypes.string,
            publishTime: PropTypes.string
        }))
    }

    constructor(props) {
        super(props);
    }

    render() {

        const { friends, userId, msgs } = this.props;
        
        const { avatarUrl, nickname, remark } = query(friends, userId);

        const classPrefix = 'message-card';

        const { publishTime, content } =  msgs.slice(-1).pop() || {};
        
        return (
            <li className={`${classPrefix}-item`}>
                <Link to={`/messages/${userId}`}>
                    <img src={avatarUrl || config.defaultAvatar} className={`${classPrefix}-avatar`}/>
                    <dl className={`${classPrefix}-content`}>
                        <dt>
                            <strong>{remark || nickname}</strong>
                            <i>{publishTime && publishTime.split(' ').pop()}</i>
                        </dt>
                        <dd>{content}</dd>
                    </dl>
                </Link>
            </li>
        );
    }

}