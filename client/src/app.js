import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'react-router-redux';

import store, { history } from './redux/store/';
//引入路由
import Routes from './routes';

//引入全局样式
import './static/styles/fonts.less';
import './static/styles/init.less';
import './static/styles/global.less';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Routes />
                </ConnectedRouter>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app')); 