//好友详情
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Detail.less';
import pathConfigs from '../../routes/path';
import Card from '../share/Card/';
import { deleteFriend } from '../../redux/actions/FriendActions';


class FriendDetail extends PureComponent {
    
    static propTypes = {
        avatarUrl: PropTypes.string,
        username: PropTypes.string.isRequired,
        nickname: PropTypes.string,
        gender: PropTypes.number,
        remark: PropTypes.string,
        address: PropTypes.string
    }

    handleDelete(friendId) {
        const { history, deleteFriend } = this.props;
        deleteFriend(friendId);
        history.push(pathConfigs.root);
    }
    render() {
        const { avatarUrl, nickname, remark, address, gender,  username, userId } = this.props;
        return (
            <ul className="detail-info">
                <Card
                    classPrefix="user-info"
                    genderShow={true}
                    countShow={true}
                    nicknameShow={true}
                    userInfo={{ avatarUrl, nickname, remark, gender, username }}
                /> 
                <li className="user-info-contact">
                    <p>
                        <span>电话</span>
                        <i><a href={`tel:${username}`}>{username}</a></i>
                    </p>
                    <p>
                        <span>地区</span>
                        <i>{address}</i>
                    </p>
                </li>
                <li className="btn-group">
                    <Link to={`${pathConfigs.messages}/${username}`} className="btn btn-green">发消息</Link>
                    {
                        username !== userId 
                            ? <span className="btn btn-red" onClick={this.handleDelete.bind(this, username)}>删除好友</span>
                            : ''
                    }
                </li>
            </ul>
        );
    }

}

export default withRouter(connect((store) => ({ userId: store.user.user.username }), { deleteFriend })(FriendDetail));