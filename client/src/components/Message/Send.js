//发送消息模块
import React, { Component } from 'react';
import classnames from 'classnames';

import { dataFormat } from '../utils/';

export default class MessageSend extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleEmojiClick = this.handleEmojiClick.bind(this);
        this.handleVoiceClick = this.handleVoiceClick.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    handleEmojiClick() {

    }

    handleVoiceClick() {

    }


    handleKeydown(e){
        if (e.keyCode === 13){
            e.preventDefault();
            const data = {
                from: 0,
                content: this.state.value,
                publishTime:  dataFormat(new Date())                
            };
            this.props.onSend(data);
            this.setState({
                value: ''
            });
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
                    <i className={voiceClasses} onClick={this.handleVoiceClick}></i>
                </div>
                <div className="message-send-input-box">
                    <label>
                        <textarea className="message-send-input" value={value} onChange ={this.handleChange} onKeyDown={this.handleKeydown} ></textarea>
                        {/* <span className="message-send-text">{value}</span> */}
                    </label>
                </div>
                <div className="message-send-options-btn">
                    <i  className={emojiClasses} onClick={this.handleEmojiClick}></i>
                </div>
            </div>
        );
    }

}