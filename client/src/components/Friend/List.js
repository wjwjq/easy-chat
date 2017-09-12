import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';



import FriendCard from './Card';
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

    constructor(props) {
        super(props);
        this.state = {
            friends: []
        };
    }

    friendsSort() {
        const { friends } = this.props;
        let tempFriends =  {};
        for (let i =0; i < friends.length; i++){
            if (tempFriends[friends[i].order]) {
                tempFriends[friends[i].order].push(friends[i]);
            } else {
                tempFriends[friends[i].order] = [friends[i]];
            }
        }
        return tempFriends;
    }

    componentDidMount() {
        this.setState({
            friends: this.friendsSort()
        });
    }

    render() {
        const { friends } = this.state;
        return (
            <div className="friend-list">
                {Object.keys(friends).map( (key) => {
                    return (<div key={key} className="friend-list-block">
                        <p  id={key} className="friend-list-order">{key}</p>
                        <ul className="friend-card-list">
                            {friends[key].map((item) => <FriendCard key={item.userId} {...item}/>)}
                        </ul>
                    </div>);
                })}
            </div>
        );
    }

}