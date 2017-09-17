//聊天窗口消息展示
import React, { Component } from 'react';
import classnames from 'classnames';

import { Link } from 'react-router-dom';
import pathConfigs from '../../routes/path';

export default class MessageShow extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { userId, avatarUrl, msgs } = this.props;
        return (
            <div className="message-box-container">
                <div className="message-box-container-inner">
                    {
                        msgs.map((msg) => { 
                            
                            const msgClasses = classnames({
                                msg: true,
                                'msg-right': !msg.from,
                                'msg-left': msg.from
                            });

                            return (
                                <div className={msgClasses} key={`userId-${msg.publishTime}`}>
                                    <p>{msg.content}</p>
                                    <div className="avatar">
                                        <Link to={`${pathConfigs.friends}/${userId}`}>
                                            <img src={avatarUrl}/>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

}