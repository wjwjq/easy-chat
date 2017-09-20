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
            const { isLogined } = this.props;
            if (isLogined) {
                return <WrappedComponent />; 
            } else {
                return <AuthView />;
            }
        }
    }

    return connect((store) => ({ ...store.user, store }))(AuthenticateComponent);
}