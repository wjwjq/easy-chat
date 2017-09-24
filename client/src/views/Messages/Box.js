import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import MessageBox from '../../components/Message/Box';

import _ from 'lodash';

@connect((store, ownProps) => {
    return {
        friend: _.find(store.friends.friends, { friendId: ownProps.match.params.id }) 
    };
})
export default class MessagesBoxView extends PureComponent {
    
    static propTypes = {
        friend: PropTypes.object
    }

    render() {
        const { friend } = this.props;
        return (
            <div>
                <Header title={friend.remark || friend.nickname} showBackButton={true} />
                <MessageBox friendId={friend.friendId} friendAvatarUrl={friend.avatarUrl} />
            </div>
        );
    }

}
