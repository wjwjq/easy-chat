//欢迎页 或 启动页
import React, { Component, PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect }  from 'react-redux';
import './Welcome.less';
import pathConfigs from '../../routes/path';
import { isTokenExpired } from '../../handlers/token';

class SignButtons extends  PureComponent {
    constructor(props) {
        super(props);
    }

    handleClick(path) {
        const { history, clickToChangeRoute } = this.props;
        clickToChangeRoute(false);
        history.push(path);
    }
    
    render() {
        return (
            <div className="start-up-bottom-fixed">
                <span onClick={this.handleClick.bind(this, pathConfigs.signin)}   className="btn btn-green">登录</span>
                <span onClick={this.handleClick.bind(this, pathConfigs.signup)}   className="btn btn-green">注册</span>
            </div>
        );
    }

}

class Welcome extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            timer: null,
            hasAccessToken: false
        };
    }   
    
    componentWillMount() {
        const hasAccessToken = isTokenExpired();
        this.setState({
            hasAccessToken
        });
    }
    
    componentDidMount() {
        const { onChange, history } = this.props;
        let { hasAccessToken, timer } = this.state;
        if (hasAccessToken) {
            timer = setTimeout(() => {
                onChange(false);
                history.push(pathConfigs.root);
            }, 1500);
        }
        this.setState({
            timer
        });
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.isLogined) {
            nextProps.history.push(pathConfigs.root);
            nextProps.onChange(false);
        } 
    }
    
    componentWillUnmount() {
        clearTimeout(this.state.timer);
    }
    
    render() {
        const { onChange, history } = this.props;
        const { hasAccessToken } = this.state;
        return (
            <div className="start-up">
                <div className="start-up-stage">
                    <div class='start-up-annimate'>
                        <div>E</div>
                        <div>A</div>
                        <div>S</div>
                        <div>Y</div>
                        <div>C</div>
                        <div>H</div>
                        <div>A</div>
                        <div>T</div>
                    </div>
                </div>
                { !hasAccessToken ? <SignButtons history={history} clickToChangeRoute={onChange}/> : '' }
            </div> 
        );
    }
}

export default withRouter(connect((store) => ({ ...store.user }))(Welcome));