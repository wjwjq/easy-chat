import React from 'react';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

export default function Back() {
    return <i className="icon icon-arrow-left go-back" onClick={history.goBack}>返回</i>;
}