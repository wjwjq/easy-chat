import React from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncComponent from './asyncComponent';

//引入路由路径配置
import pathConfigs from './path';
//主视图
import Main from '../views/Main';
import Home from '../views/Home';

//认证视图
import AuthView from '../views/Auth';
// const AuthView = asyncComponent(() =>
//     System.import('../views/Auth/').then((module) => module.default)
// );
//搜索视图
const SearchFriendView = asyncComponent(() =>
    System.import('../views//Friend/Search').then((module) => module.default)
);
//消息视图
const MessageBoxView = asyncComponent(() =>
    System.import('../views/Messages/Box').then((module) => module.default)
);

//好友视图
const FriendDetailView = asyncComponent(() =>
    System.import('../views/Friend/Detail').then((module) => module.default)
);

//My
const AcountAndSecurity = asyncComponent(() =>
    System.import('../components/My/AcountAndSecurity').then((module) => module.default)
);
const BlackList = asyncComponent(() =>
    System.import('../components/My/BlackList').then((module) => module.default)
);

const Help = asyncComponent(() =>
    System.import('../components/My/Help').then((module) => module.default)
);

const About = asyncComponent(() =>
    System.import('../components/My/About').then((module) => module.default)
);
const MyDetail = asyncComponent(() =>
    System.import('../components/My/Detail').then((module) => module.default)
);

const PageNotFound = asyncComponent(() =>
    System.import('../components/share/PageNotFound').then((module) => module.default)
);

const Routes = () => {
    return (
        <Home >
            <Switch >
                <Route path={`${pathConfigs.messages}/:id`} component={MessageBoxView} />
                <Route path={`${pathConfigs.friends}/:id`} component={FriendDetailView} />
                <Route path={pathConfigs.add} component={SearchFriendView} />
                <Route path={pathConfigs.myDetail} component={MyDetail} />
                <Route path={pathConfigs.myAccountandsecurity} component={AcountAndSecurity} />
                <Route path={pathConfigs.myBlacklist} component={BlackList}/>
                <Route path={pathConfigs.myHelp} component={Help}/>
                <Route path={pathConfigs.myAbout} component={About} />
                <Route path={pathConfigs.signin} component={AuthView} />
                <Route path={pathConfigs.signup} component={AuthView} />
                <Route path={pathConfigs.root} component= {Main} />
                {/* <Route component={PageNotFound} /> */}
            </Switch>
        </Home>
    );
};

export default Routes;
