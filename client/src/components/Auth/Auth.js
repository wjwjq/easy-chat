import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AuthView from '../../views/Auth';

export default function authenticate(WrappedComponent) {
    class AuthenticateComponent extends Component {
        static propTypes = {
            isLogined: PropTypes.bool.isRequired,
            token: PropTypes.string.isRequired
        }
        constructor(props) {
            super(props);
        }

        render() {
            const { isLogined, token } = this.props;
            if (isLogined && token) {
                return <WrappedComponent {...this.props}/>; 
            } else {
                return <AuthView {...this.props}/>;
            }
        }
    }

    return connect((store) => ({ ...store.user, store }))(AuthenticateComponent);
}