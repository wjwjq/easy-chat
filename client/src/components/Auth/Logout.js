//登出
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { clearToken } from '../../configs/tokenHadlers';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout() {
        clearToken();
        this.props.history.push('/signin');
    }
    render() {
        const { children } = this.props;
        return  <div  onClick={this.handleLogout}>{children ? children : '注销登录'}</div>;
    }
}
export default  withRouter(Logout);