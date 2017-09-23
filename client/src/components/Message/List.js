//消息列表
import React, { Component } from 'react';
import { connect } from 'react-redux';

import MessageItem from './Item';
import './Message.less';
import SlideToDelete from '../share/SlideToDelete/';


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

    handleDelete(userId) {
        console.info(`delete ${userId}`);
    }

    render() {
        const { messages } = this.props;
        const width = {
            value: .5,
            unit: 'rem'
        };
        return (
            <div className="messages-list">
                { 
                    messages.map((message) => 
                        <SlideToDelete key={message.userId} onDelete={this.handleDelete.bind(this, message.userId)} width={width} text='登录'>
                            <MessageItem key={message.userId} {...message}/>
                        </SlideToDelete> )
                }
            </div>
        );
    }

}