import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../../components/Header/';
import SignUp from '../../components/Auth/SignUp';
import SignIn from '../../components/Auth/SignIn';

import pathConfigs from '../../routes/path';

class AuthView extends PureComponent {

    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps) {
        console.info('nextProps', nextProps);
    }
    render() {
        const { match, history } = this.props;
        const { path } = match;
        return (
            <div className="auth" style={{ paddingTop: '.7rem' }}>
                <Header title={path ===  `${pathConfigs.signup}` ? '注册' : '登录'} />
                {path ===  `${pathConfigs.signup}`? <SignUp history={history}/> : <SignIn history={history}/>}
            </div>
        );
    }

}

export default withRouter(AuthView);