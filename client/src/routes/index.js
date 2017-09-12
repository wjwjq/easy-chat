import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//引入布局
import Layout from '../layouts/default';

//引入各组件
import Welcome from '../components/Welcome';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';


import MessageListView from '../views/Messages/';
import MessageBoxView from '../views/Messages/Box';
import FriendListView from '../views/Friend/';
import FriendDetailView from '../views/Friend/Detail';
import MyView from '../views/My/';

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Layout>
                    <Switch>
                        <Route path="/welcome" component={Welcome} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/messages/:id" component={MessageBoxView} />
                        <Route path="/messages" component={MessageListView} />
                        <Route path="/friends/:id" component={FriendDetailView} />
                        <Route path="/friends" component={FriendListView} />
                        <Route path="/my" component={MyView} />
                    </Switch>
                    <Redirect from='/' to='welcome' />
                </Layout>
            </Router>
        );
    }

}