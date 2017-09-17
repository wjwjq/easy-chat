import React from 'react';
import history from '../lib/history';


const Back = () => {
    return <i className="icon icon-arrow-left go-back" onClick={history.goBack}>返回</i>;
};

export default Back;