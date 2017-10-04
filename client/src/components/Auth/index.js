import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AuthView from '../../views/Auth';
import Loading from '../share/Loading/';

const authenticate = (WrappedComponent) => {
    class AuthenticateComponent extends Component {
        static propTypes = {
            isLogined: PropTypes.bool.isRequired
        }
        constructor(props) {
            super(props);
        }
        render() {
            const { isLogined, isLogining } = this.props;
    
            if (isLogining) {
                return <Loading />;
            }
            if (!isLogined) {
                return <AuthView />;
            } else {
                return <WrappedComponent />; 
            }
        }
    }

    return connect((store) => ({ ...store.user }))(AuthenticateComponent);
};

export default authenticate;