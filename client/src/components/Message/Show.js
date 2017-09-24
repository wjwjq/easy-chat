//聊天窗口消息展示
import React, { PureComponent } from 'react';
import classnames from 'classnames';

import { Link } from 'react-router-dom';
import pathConfigs from '../../routes/path';
import config from '../../configs/config';

const Passage = (props) => {
    const { id, role, avatarUrl, content } = props;
    const msgClasses = classnames({
        msg: true,
        'msg-right': role,
        'msg-left': !role
    });
    return (<div className={msgClasses}>
        <p>{content}</p>
        <div className="avatar">
            <Link to={`${pathConfigs.friends}/${id}`}>
                <img src={avatarUrl || config.defaultAvatar}/>
            </Link>
        </div>
    </div>); 
};

export default class MessageShow extends PureComponent {

    
    constructor(props) {
        super(props);
    }
    
    shouldComponentUpdate() {
        return true;   
    }

    render() {
        const { friendId, friendAvatarUrl, userAvatarUrl, userId, msgs } = this.props;
        return (
            <div className="message-box-container">
                <div className="message-box-container-inner">
                    {
                        msgs && msgs.map((msg, idx) => { 
                            const { from, content, publishTime } = msg;
                            const role = from === userId;
                            return ( <Passage 
                                key={`${friendId}-${publishTime}-${userId}--${idx}`}
                                id={ role ? userId : friendId} 
                                avatarUrl={role ? userAvatarUrl : friendAvatarUrl}
                                role= {role}
                                content={content}
                            />);
                        })
                    }
                </div>
            </div>
        );
    }

}