import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Header from '../../components/Header/';
import MessageBox from '../../components/Message/Box';

@connect((store, ownProps) => {
    return {
        friend: _.find(store.friends.friends, { username: ownProps.match.params.id }) 
    };
})
export default class MessagesBoxView extends PureComponent {
    
    static propTypes = {
        friend: PropTypes.object
    }

    render() {
        const { friend } = this.props;
        return (
            <div className="chating-room">
                <Header title={friend.remark || friend.nickname} showBackButton={true} arrowShow={true} />
                <MessageBox friendId={friend.username} friendAvatarUrl={friend.avatarUrl} />
            </div>
        );
    }

}
