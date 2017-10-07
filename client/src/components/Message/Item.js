//消息联系人卡
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

import pathConfigs from '../../routes/path';
import Card from '../share//Card/';

@connect((store, ownProps) => (
    {
        friend: _.find(store.friends.friends, { username: ownProps.username })
    }
))
export default class MessageItem extends PureComponent {

    static propTypes = {
        username: PropTypes.string.isRequired,
        friend: PropTypes.object,
        latestMsg: PropTypes.object
    }
    
    render() {

        const { friend, username, latestMsg } = this.props;
        return (
            <Card
                to={`${pathConfigs.messages}/${username}`}
                classPrefix="message-card"
                latestMsg={latestMsg}
                userInfo={friend}
            />
        );
    }

}