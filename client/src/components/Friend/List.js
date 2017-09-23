import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FriendItem from './Item';
import './List.less';

@connect((store) => {
    return {
        friends: store.friends.friends
    };
})
export default class FriendList extends Component {

    static propsTypes = {
        friends: PropTypes.arrayOf(PropTypes.shape({
            address: PropTypes.string,
            avatarUrl: PropTypes.string,
            gender: PropTypes.number,
            nickname: PropTypes.string.isRequired,
            order: PropTypes.string.isRequired,
            remark: PropTypes.string,
            telephone: PropTypes.string,
            userId: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired
        }))
    }

    static defaultProps = {
        friends: []
    }

    constructor(props) {
        super(props);
        this.friendsSort = this.friendsSort.bind(this);
    }

    friendsSort(friends) {
        let tempFriends =  {};
        for (let i =0; i < friends.length; i++) {
            if (tempFriends[friends[i].order]) {
                tempFriends[friends[i].order].push(friends[i]);
            } else {
                tempFriends[friends[i].order] = [friends[i]];
            }
        }
        return tempFriends;
    }

    render() {
        const { friends } = this.props;
        const sortedFriends = this.friendsSort(friends);
        return (
            <div className="friend-list">
                {Object.keys(sortedFriends).map( (key) => {
                    return (<div key={key} className="friend-list-block">
                        <p  id={key} className="friend-list-order">{key}</p>
                        <ul className="friend-card-list">
                            {sortedFriends[key] && sortedFriends[key].map((item) => <FriendItem key={item.userId} {...item}/>)}
                        </ul>
                    </div>);
                })}
            </div>
        );
    }

}