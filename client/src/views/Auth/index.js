import React, { Component } from 'react';
import Header from '../../components/Header/Header';

import SignUp from '../../components/Auth/SignUp';
import SignIn from '../../components/Auth/SignIn';

import pathConfigs from '../../routes/path';

export default class AuthView extends Component {

    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const { match, history } = this.props;
        const { path } = match;
        if ( path !== `${pathConfigs.signup}` ||path !==  `${pathConfigs.signin}` ) {
            history.replace('signin');
        }
    }
    render() {
        const { match, history } = this.props;
        const { path } = match;
        return (
            <div className="auth" style={{ paddingTop: '.3rem' }}>
                <Header title={path ===  `${pathConfigs.signup}` ? '注册' : '登录'} />
                {path ===  `${pathConfigs.signup}`? <SignUp history={history}/> : <SignIn history={history}/>}
            </div>
        );
    }

}