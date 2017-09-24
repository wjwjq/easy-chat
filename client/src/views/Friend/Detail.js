import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import FriendDetail from '../../components/Friend/Detail';

import _ from 'lodash';

@connect((store, ownProps) => {
    return {
        friend: _.find(store.friends.friends, { friendId: ownProps.match.params.id }) 
    };
})
export default class FriendDetailView extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        const { friend } = this.props;
        return (
            <div>
                <Header title={ friend.remark || friend.nickname} showBackButton={true} />
                <FriendDetail { ...friend}/>
            </div>
        );
    }

}