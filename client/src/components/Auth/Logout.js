//登出
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { clearToken } from '../../configs/tokenHandlers';
import { logout } from '../../redux//actions//AuthActions';
import pathConfigs from '../../routes/path';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout() {
        clearToken();
        this.props.history.push(pathConfigs.signin);
        this.props.dispatch(logout());
    }
    render() {
        const { children } = this.props;
        return  <div  onClick={this.handleLogout}>{children ? children : '注销登录'}</div>;
    }
}

export default  withRouter(connect((store) => ({ ...store.user }))(Logout));