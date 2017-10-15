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

    render() {
        const { location } = this.props;
        const { pathname } = location;
        return (
            <div className="auth" style={{ paddingTop: '.7rem' }}>
                <Header title={pathname ===  `${pathConfigs.signup}` ? '注册' : '登录'} />
                {pathname ===  `${pathConfigs.signup}`? <SignUp /> : <SignIn />}
            </div>
        );
    }

}

export default withRouter(AuthView);