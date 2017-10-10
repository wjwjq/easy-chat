//注册
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import pathConfigs from '../../routes/path';
import { encrypt } from '../../configs/utils';

import { signUp, getValid, clearAuthMessage, signIn } from '../../redux/actions/AuthActions';
import { connect } from 'react-redux';
import Loading from '../share/Loading/';

import Form from '../share/Form/';
import FormItem from '../share/Form/Item';


@connect((store) => {
    return {
        ...store.user
    };
},{
    signIn,
    signUp,
    getValid,
    resetMsg: clearAuthMessage
})
export default class SignUp extends Component {

    constructor(props) {
        super(props);
        
        this.handleGetValid = this.handleGetValid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
            time: 2,
            user: {}
        };
    }

    handleGetValid(data) {
        const { getValid } = this.props;
        getValid(data.username, 'signup');
    }
    
    handleSubmit(result) {
        const { signUp } = this.props;
        result['password'] =  encrypt(result['password']);
        signUp(result);
        this.setState({
            user: {
                ...result
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isRegistered) {
            let { time, user } = this.state;
            const timer = setInterval(() => {
                if (time <= 1) {
                    clearInterval(timer);
                    nextProps.signIn(user);
                    return;
                }
                this.setState({
                    time: --time
                });
            }, 1000);
        }
    }
    
    componentWillUnmount() {
        this.props.resetMsg();
    }

    render() {
        const { isRegistering, registryMsg, isRegistered, verifyCodeMsg } = this.props;
        const { time } = this.state;
        return (
            <div className="signup">
                {isRegistering && <Loading/>}
                <Form onSubmit={this.handleSubmit} >
                    <div className="form-tips">
                        {
                            isRegistered 
                                ? <span style={{ color: '#239B37' }}>{`${registryMsg}, ${time}秒后自动登录`}</span> 
                                : verifyCodeMsg
                                    ? verifyCodeMsg 
                                    : registryMsg 
                                        ?  registryMsg
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
                        text="昵称" 
                        placeholder="请输入昵称" 
                        type="text" 
                        name="nickname" 
                        isRequired={true}
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
                        text="确认密码" 
                        placeholder="请再次输入密码" 
                        type="password"
                        name="repeatPassword" 
                        isRequired={true}
                        role="confirm"
                        associateName='password'
                    />
                    <FormItem 
                        text="性别" 
                        type="radio" 
                        name="gender" 
                        values={['男','女']} 
                        defaultValue="男" 
                    />
                    <FormItem 
                        text="验证码" 
                        placeholder="4位验证码" 
                        type="validate"
                        name="valid"
                        isRequired={true}
                        length={4}
                        validButtonText='获取验证码' 
                        countTime={180}
                        associateName={['username', 'nickname', 'password', 'repeatPassword']}
                        getVerifyCodeFunc={this.handleGetValid}
                    />
                    <FormItem  text="注册" type='submit' />
                </Form>
                <p className="auth-link">已有账号？<Link to={pathConfigs.signin}>去登录</Link></p>
            </div>
        );
    }

}