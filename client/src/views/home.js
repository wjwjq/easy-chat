import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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
            {isShow ? <Welcome onChange={this.handleShow}/> : children}
        </div>);

        return <div>{children}</div>;
    }
}

export default withRouter(connect((store) => ({ isLogined: store.user.isLogined }))(Home));