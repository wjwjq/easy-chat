import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import createBrowserHistory from 'history/createBrowserHistory';
//引入react-router-redux以便在redux dispath中使用 push('/foo')
import { routerReducer, routerMiddleware } from 'react-router-redux';

//引入自建reducers
import reducers from '../reducers/'; 

export const history = createBrowserHistory();

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

const appReducer =  combineReducers({
    ...reducers,
    router: routerReducer
});

const initialState = appReducer({}, {});
  
const rootReducer = (state, action) => {
    if (action.type === 'LOG_OUT') {
        state = initialState;
    }
  
    return appReducer(state, action);
};

export default createStore(
    rootReducer,
    middlewares
);