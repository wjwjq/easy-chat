//登录
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import pathConfigs from '../../routes/path';
import { encrypt } from '../../configs/utils';
import { signIn, getValid } from '../../redux/actions/AuthActions';
import { getItem } from '../../configs/storage';
import Loading from '../share/Loading/';

import Form from '../share/Form/';
import FormItem from '../share/Form/FormItem';

import './style.less';

@connect((store) => {
    return { 
        ...store.user
    };
})
export default class SignIn extends Component {

    constructor(props) {
        super(props);

        this.handleGetValid = this.handleGetValid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            isTokenNotExpired: this.props.isTokenNotExpired
        };
    }

    componentWillMount() {
        const hasAccessToken = getItem('access_token');
        this.setState({
            isTokenNotExpired:   hasAccessToken && hasAccessToken['expires'] > Math.floor(Date.now() / 1000)
        });
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        !nextProps.isLogining && nextProps.isLogined && this.props.history.push(pathConfigs.root);
    }

    handleGetValid() {
        console.info('哈哈哈我是卖报的小行家');
        return;
        this.props.dispatch(getValid('signin'));
    }
 
    handleSubmit(result) {
        for (let key in result) {
            if (key === 'password') {
                result[key] =  encrypt(result[key]);
            }
        }
        this.props.dispatch(signIn(result));
    }
 
    render() {
        const { isTokenNotExpired } = this.state;
        const { error, isLogined, isLogining } = this.props;
        if (isTokenNotExpired && !isLogined  && !error) {
            !isLogining && this.props.dispatch(signIn());
            return null;
        } else {
            return (
                <div className="signin">
                    {isLogining && <Loading/>}
                    {error}
                    <Form onSubmit={this.handleSubmit} >
                        <div className="form-tips">{error && '用户名或密码不正确'}</div>
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