//登出
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../redux/actions/AuthActions';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    
    handleLogout() {
        const { dispatch } = this.props;
        dispatch(logout());
    }

    render() {
        const { children } = this.props;
        return  <div  onClick={this.handleLogout}>{children ? children : '注销登录'}</div>;
    }
}

export default  withRouter(connect((store) => ({ ...store.user }))(Logout));