import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AuthView from '../../views/Auth';

export default function authenticate(WrappedComponent) {
    class AuthenticateComponent extends Component {
        static propTypes = {
            isLogined: PropTypes.bool.isRequired
        }
        constructor(props) {
            super(props);
        }

        render() {
            //如果当前token存在 且未过期 则直接自动登录
            // 过期 重新登录
            const { isLogined } = this.props;
            if (isLogined) {
                return <WrappedComponent {...this.props}/>; 
            } else {
                return <AuthView {...this.props}/>;
            }
        }
    }

    return connect((store) => ({ ...store.user, store }))(AuthenticateComponent);
}