import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//引入路由路径配置
import pathConfigs from './path';

//引入布局
import Layout from '../layouts/default';

//引入各组件
import Welcome from '../components/Welcome';

// import My from '../components/My/';
import AcountAndSecurity from '../components/My/AcountAndSecurity';
import BlackList from '../components/My/BlackList';
import Help from '../components/My/Help';
import About from '../components/My/About';
import MyDetail from '../components/My/Detail';

//消息视图
import MessageListView from '../views/Messages/';
import MessageBoxView from '../views/Messages/Box';

//好友视图
import FriendListView from '../views/Friend/';
import FriendDetailView from '../views/Friend/Detail';

//我视图
import MyView from '../views/My/';

//认证视图
import AuthView from '../views/Auth/';


export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Layout>
                    <Switch>
                        <Route path={pathConfigs.welcome} component={Welcome} />
                        <Route path={pathConfigs.signup} component={AuthView} />
                        <Route path={pathConfigs.signin} component={AuthView} />
                        <Route path={pathConfigs.messagesid} component={MessageBoxView} />
                        <Route path={pathConfigs.messages} component={MessageListView} />
                        <Route path={pathConfigs.friendsid} component={FriendDetailView} />
                        <Route path={pathConfigs.friends} component={FriendListView} />
                        <Route path={pathConfigs.myDetail} component={MyDetail} />
                        <Route path={pathConfigs.myAccountandsecurity} component={AcountAndSecurity} />
                        <Route path={pathConfigs.myBlacklist} component={BlackList}/>
                        <Route path={pathConfigs.myHelp} component={Help}/>
                        <Route path={pathConfigs.myAbout} component={About} />
                        <Route path={pathConfigs.my} component={MyView} />
                    </Switch>
                    {/* <Redirect from='/' to='welcome' /> */}
                </Layout>
            </Router>
        );
    }
}