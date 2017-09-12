import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import config from '../../configs/config';

export default function Card() {

    const genderClasses = classnames({
        iconfont: true,
        'icon-male': !gender,
        'icon-female': gender
    });

    return (
        <div className="detail-info-avatar">
            <img src={avatarUrl || config.defaultAvatarUrl} />
            <dl>
                <dt>
                    {remark || nickname} 
                    <i className={genderClasses}></i>
                    { latestMsg.length ? <i>{latestMsg['publishTime']}</i> : ''}
                </dt>
                <dd>用户号: {userId}</dd>
                {remark && <dd>昵称：{nickname}</dd>}
                {latestMsg.length ? <dd>{latestMsg['content']}</dd> : ''}
            </dl> 
        </div> 
    );
}