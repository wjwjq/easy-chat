//欢迎页 或 启动页
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Welcome.less';

export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Link to="/messages"  className="welcome">Welcome</Link>
        );
    }

}