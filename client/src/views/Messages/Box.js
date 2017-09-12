import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import MessageBox from '../../components/Message/Box';

import { query } from '../../components/utils/';

@connect((store) => {
    return {
        friends: store.friends.friends
    };
})
export default class MessagesBoxView extends Component {

    render() {
        const { friends, match } = this.props;
        const { id } = match.params;

        const friendInfo = query(friends, id);

        return (
            <div>
                <Header showTitle={friendInfo.remark || friendInfo.nickname} showBackButton={true} />
                <MessageBox {...friendInfo} />
            </div>
        );
    }

}