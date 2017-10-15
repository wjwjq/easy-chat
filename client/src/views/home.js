import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notification from '../components/Notification/';

import Welcome from '../components/Welcome/';
class Home extends Component {
    
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.state = {
            isShow: true
        };
    }

    handleShow(isShow) {
        this.setState({
            isShow
        });
    }
    
    render() {
        const { children } = this.props;
        const { isShow } = this.state;
        return (<div className="home">
            {isShow ? <Welcome onChange={this.handleShow} /> : children}
            <Notification />
        </div>);
    }
}

export default connect(store => ({ isLogined: store.user.isLogined }))(Home);