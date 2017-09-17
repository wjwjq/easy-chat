//消息列表
import React, { Component } from 'react';
import { connect } from 'react-redux';

import MessageCard from './Card';
import './Message.less';

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
    
    }

    render() {
        const { messages } = this.props;
        return (
            <ul>
                { messages.map((message) => <MessageCard key={message.userId} {...message}/> )}
            </ul>
        );
    }

}