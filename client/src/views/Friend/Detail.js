import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import FriendDetail from '../../components/Friend/Detail';

import { query } from '../../components/utils/';

@connect((store) => {
    return {
        friends: store.friends.friends
    };
})
export default class FriendDetailView extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            details: {}
        };
    }

    componentDidMount() {
        const { friends, match } = this.props;
        const { id } = match.params;
        this.setState({
            details: query(friends, id)
        });
    }

    render() {
        const { remark, nickname } = this.state.details;
        return (
            <div>
                <Header title={remark || nickname} showBackButton={true} />
                <FriendDetail { ...this.state.details}/>
            </div>
        );
    }

}