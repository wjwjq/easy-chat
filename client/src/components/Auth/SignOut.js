//登出
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signOut } from '../../redux/actions/AuthActions';

class SignOut extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    
    handleLogout() {
        const { dispatch } = this.props;
        dispatch(signOut());
    }

    render() {
        const { children } = this.props;
        return  <div  onClick={this.handleLogout}>{children ? children : '注销登录'}</div>;
    }
}

export default  connect(store => ({ ...store.user }))(SignOut);