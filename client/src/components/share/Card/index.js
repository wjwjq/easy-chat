import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

import config from '../../../configs/config';
import './Card.less';

class Card extends PureComponent {

    static propTypes = {
        classPrefix: PropTypes.string,
        avatarUrl: PropTypes.string,
        username: PropTypes.string,
        nickname: PropTypes.string,
        userId: PropTypes.string,
        gender: PropTypes.number,
        remark: PropTypes.string,
        arrowShow: PropTypes.bool,
        countShow: PropTypes.bool,
        genderShow: PropTypes.bool,
        nicknameShow: PropTypes.bool,
        arrowShow: PropTypes.bool,
        latestMsg: PropTypes.object,
        userInfo: PropTypes.object
    }
    constructor(props) {
        super(props);
    }
    
    handleLink() {
        const { to, history } = this.props;
        to && history.push(to);
    }
    
    render() {
        const { classPrefix, genderShow, arrowShow, countShow,nicknameShow, latestMsg, userInfo } = this.props;
        const { avatarUrl, remark, nickname, gender, username } = userInfo;
        let publishTime, content;
        if (latestMsg) {
            publishTime = latestMsg['publishTime'];
            content = latestMsg['content'];
        }
        const genderClasses = classnames({
            icon: true,
            'icon-male': !gender,
            'icon-female': gender
        });

        return (
            <li onClick={this.handleLink.bind(this)} className={`card-item ${classPrefix}-item`}>
                <img src={avatarUrl || config.defaultAvatar} className={`${classPrefix}-avatar`}/>
                <dl className={`card-content ${classPrefix}-content`}>
                    <dt>
                        <strong>{remark || nickname}</strong>
                        {genderShow ? <i className={genderClasses}></i> :''}
                        {publishTime ? <i>{publishTime.split(' ').pop()}</i> :''}
                    </dt>
                    {countShow ? (username && <dd>用户号: {username}</dd>) :''}
                    {nicknameShow ? (remark && <dd>昵称：{nickname}</dd>) :''}
                    {arrowShow ? <i className="icon icon-arrow-right user-icon-arrow-right"></i> :''}
                    {content ? <dd> {content} </dd> :''}
                </dl>
            </li>
        );
    }

}


export default withRouter(Card);