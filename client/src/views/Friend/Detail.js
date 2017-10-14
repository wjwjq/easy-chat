import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Header from '../../components/Header/';
import FriendDetail from '../../components/Friend/Detail/';

@connect((store, ownProps) => {
    return {
        friend: _.find(store.friends.friends, { username: ownProps.match.params.id }) 
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
                <Header 
                    title={ friend['remark'] || friend.nickname} 
                    showBackButton={true} 
                    arrowShow={true} 
                />
                <FriendDetail { ...friend}/>
            </div>
        );
    }

}