//登录
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import pathConfigs from '../../routes/path';
import { encrypt } from '../../configs/utils';
import { signIn, getValid, clearAuthMessage } from '../../redux/actions/AuthActions';
import { isTokenExpired } from '../../handlers/token';

import Loading from '../share/Loading/';
import Form from '../share/Form/';
import FormItem from '../share/Form/Item';

import './style.less';

@connect((store) => {
    return { 
        ...store.user
    };
},{
    signIn,
    getValid,
    resetMsg: clearAuthMessage
})
export default class SignIn extends Component {

    constructor(props) {
        super(props);

        this.handleGetValid = this.handleGetValid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            hasAccessToken: true
        };
    }

    componentWillMount() {
        this.setState({
            hasAccessToken: isTokenExpired()
        });
    }
    
    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        !nextProps.isLogining && nextProps.isLogined && nextProps.history.push(pathConfigs.root);
    }

    handleGetValid(data) {
        const { getValid } = this.props;
        getValid(data.username);
    }
 
    handleSubmit(result) {
        const { signIn } = this.props;
        result['password'] =  encrypt(result['password']);
        signIn(result);
    }

    componentWillUnmount() {
        this.props.resetMsg();
    }

    render() {
        const { hasAccessToken } = this.state;
        const { isLogined, isLogining, loginMsg, signIn, verifyCodeMsg } = this.props;
     
        if (hasAccessToken && !isLogined) {
            !isLogining && signIn();
            return null;
        } else {
            return (
                <div className="signin">
                    {isLogining && <Loading/>}
                    <Form onSubmit={this.handleSubmit} >
                        <div className="form-tips">
                            {
                                isLogined 
                                    ? <span style={{ color: '#239B37' }}>{loginMsg}</span> 
                                    : loginMsg
                                        ? loginMsg 
                                        : verifyCodeMsg 
                                            ? verifyCodeMsg 
                                            : '' 
                            }
                        </div>
                        <FormItem 
                            text="手机号" 
                            placeholder="请输入手机号" 
                            type="text" 
                            name="username" 
                            isRequired={true}
                            regs={ [{ reg: '^1[345789][\\d]{9}$', mode: 'ig' ,msg: '手机格式错误' }] } 
                        />
                        <FormItem 
                            text="密码" 
                            placeholder="请输入密码" 
                            type="password" 
                            name="password" 
                            isRequired={true}
                            regs={ [{ reg: '.{8,16}', mode: 'ig' ,msg: '密码长度应为8-16位' }] }  
                        />
                        <FormItem 
                            text="验证码" 
                            placeholder="4位验证码"
                            type="validate"
                            name="valid"
                            isRequired={true}
                            length={4}
                            validButtonText='获取验证码' 
                            countTime={60}
                            associateName={['username','password']}
                            getVerifyCodeFunc={this.handleGetValid}
                        />
                        <FormItem  text="登录" type='submit' />
                    </Form>
                    <p className="auth-link">没有账号？<Link to={pathConfigs.signup}>去注册</Link></p>
                </div>
            );
        }
    }
}