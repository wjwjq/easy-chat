import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import createHistory from 'history/createBrowserHistory';
//引入react-router-redux以便在redux dispath中使用 push('/foo')
import { routerReducer, routerMiddleware } from 'react-router-redux';

//引入自建reducers
import reducers from '../reducers/'; 

export const history = createHistory();

const historyMiddleware = routerMiddleware(history);
let middlewares;
if (process.env.NODE_ENV !== 'production') {
    middlewares = compose(
        applyMiddleware(
            historyMiddleware,
            promiseMiddleware(), 
            thunkMiddleware, 
            createLogger()
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
} else {
    middlewares =     applyMiddleware(
        historyMiddleware,
        promiseMiddleware(), 
        thunkMiddleware
    );
}




export default createStore(
    combineReducers({
        ...reducers,
        router: routerReducer
    }),
    middlewares
);

