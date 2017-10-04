import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchForm from  '../../components/search/Form/';
import SearchResult from '../../components/search/Result/';

import { queryFriend, addFriend } from '../../redux/actions/FriendActions';



@connect((store) => {
    return {
        friends: store.friends.friends, 
        querying: store.friends.querying, 
        queryed: store.friends.queryed, 
        result: store.friends.result, 
        queryMsg: store.friends.queryMsg,
        userId : store.user.user.username
    };
},{
    queryFriend,
    addFriend
})
export default class SearchFriendView extends Component {
    constructor(props) {
        super(props);
        this.handleQuery = this.handleQuery.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.state = {
            queryError: ''
        };
    }

    handleQuery(friendId) {
        const { queryFriend, friends, userId } = this.props;
        if (friendId === userId) {
            this.setState({
                queryError: '已经是好友啦！'
            });
            return;
        } else {
            for (let i=0; i < friends.length; i++) {
                if (friends[i].username === friendId) {
                    this.setState({
                        queryError: '已经是好友啦！'
                    });
                    return;
                }
            }
        }
        this.setState({
            queryError: ''
        });
        queryFriend(friendId);
    }

    handleAdd(friendId) {
        const { addFriend } = this.props;
        addFriend(friendId);
    }

    render() {
        const { querying, queryed, result, queryMsg } = this.props;
        const { queryError } = this.state;
        return (
            <div className="search-view">
                <SearchForm onQuery={this.handleQuery}/>
                <div className="search-result-box"   style={{ paddingTop: '.5rem' }} >
                    { 
                        queryed && result  &&
                            <SearchResult 
                                result={result} 
                                onAdd={this.handleAdd} 
                            />
                      
                    }
                    <div style={{ paddingTop: '0.3rem', textAlign: 'center' }}>
                        { querying ? <div>搜索中</div> : '' }
                        { queryError ? <p>{queryError}</p> : '' }
                        { !queryError && queryMsg ? <div>{queryMsg}</div> : '' }
                    </div>
                </div>
            </div>
        );
    }
}