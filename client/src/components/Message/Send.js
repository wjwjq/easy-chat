//发送消息模块
import React, { Component } from 'react';
import classnames from 'classnames';

import { dataFormat } from '../../configs/utils';

export default class MessageSend extends Component {

    constructor(props) {
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
        this.handleEmojiClick = this.handleEmojiClick.bind(this);
        this.handleVoiceClick = this.handleVoiceClick.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);

        this.state = {
            value: ''
        };
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    handleEmojiClick() {
        //todo:
    }

    handleVoiceClick() {
        //todo:
    }


    handleKeydown(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            const { friendId, userId } = this.props;
            const data = {
                from: userId,
                to: friendId,
                content: e.target.value,
                publishTime:  dataFormat(new Date())                
            };
            this.setState({
                value: ''
            });
            this.props.onSend(data);
        }
    }

    render() {

        const voiceClasses = classnames({
            icon: true,
            'icon-micro': true,
            'message-send-voice': true
        });
        
        const emojiClasses = classnames({
            icon: true,
            'icon-emoji': true,
            'message-send-emoji': true
        });

        const { value } = this.state;
        return (
            <div className="message-send">
                <div className="message-send-options-btn">
                    <i className={voiceClasses} onClick={this.handleVoiceClick} ></i>
                </div>
                <div className="message-send-input-box">
                    <label>
                        <textarea 
                            className="message-send-input" 
                            value={value} 
                            onChange={this.handleChange} 
                            onKeyDown={this.handleKeydown} 
                        ></textarea>
                    </label>
                </div>
                <div className="message-send-options-btn">
                    <i  className={emojiClasses} onClick={this.handleEmojiClick} ></i>
                </div>
            </div>
        );
    }

}