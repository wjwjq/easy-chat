//消息列表
import React, { Component } from 'react';
import { connect } from 'react-redux';

import MessageItem from './Item';
import './Message.less';
import SlideToDelete from '../share/SlideToDelete/';
import { deleteMessage } from '../../redux/actions/MessageActions';


@connect((store) => {
    return {
        messages: store.messages.messages
    };
})
export default class MessageList extends Component {

    handleDelete(friendId) {
        this.props.dispatch(deleteMessage(friendId));
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
                    Object.keys(messages).map((key) => {
                        return  <SlideToDelete 
                            key={key} 
                            onDelete={this.handleDelete.bind(this, key)}
                            width={width} 
                            text='删除'
                        >
                            <MessageItem  username={key}  latestMsg={ messages[key].slice(-1).pop() || {} } />
                        </SlideToDelete>;
                    })
                }
            </div>
        );
    }

}