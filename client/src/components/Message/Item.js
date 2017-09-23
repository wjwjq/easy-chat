//消息联系人卡
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

import pathConfigs from '../../routes/path';
import Card from '../share//Card/';

@connect((store, ownProps) => (
    {
        friend: _.find(store.friends.friends, { userId: ownProps.userId })
    }
))
export default class MessageItem extends Component {

    static propTypes = {
        userId: PropTypes.string.isRequired,
        msgs: PropTypes.arrayOf(PropTypes.shape({
            content: PropTypes.string,
            publishTime: PropTypes.string
        }))
    }

    constructor(props) {
        super(props);
    }

    render() {

        const { friend, userId, msgs } = this.props;
        return (
            <Card
                to={`${pathConfigs.messages}/${userId}`}
                classPrefix="message-card"
                latestMsg={ msgs.slice(-1).pop() || {} }
                userInfo={friend}
            />
        );
    }

}