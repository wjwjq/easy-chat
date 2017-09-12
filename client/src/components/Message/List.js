//消息列表
import React, { Component } from 'react';
import { connect } from 'react-redux';

import MessageCard from './Card';
import './Message.less';

import { fetchFriends } from '../../redux/actions/FriendActions';
import { fetchMessages } from '../../redux/actions/MessageActions';

@connect((store) => {
    return {
        messages: store.messages.messages
    };
})
export default class MessageList extends Component {

    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        if (!this.props.messages.length) {
            this.props.dispatch(fetchFriends());
            this.props.dispatch(fetchMessages());
        }
    }

    componentWillReceiveProps(prevProps, nextProps) {
        return !(prevProps !== nextProps);
    }

    render() {
        const { messages } = this.props;
        return (
            <ul>
                { messages.map((item) => <MessageCard key={item.userId} {...item}/> )}
            </ul>
        );
    }

}