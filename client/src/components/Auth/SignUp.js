//注册
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import pathConfigs from '../../routes/path';
import { encrypt } from '../../configs/utils';

import { signUp, getValid } from '../../redux/actions/AuthActions';
import { connect } from 'react-redux';
import Loading from '../share/Loading/';

import Form from '../share/Form/';
import FormItem from '../share/Form/Item';


@connect((store) => {
    return {
        ...store.user
    };
},{
    signUp,
    getValid
})
export default class SignUp extends Component {

    constructor(props) {
        super(props);

        this.handleGetValid = this.handleGetValid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleGetValid() {
        const { getValid } = this.props;
        getValid('signUp');
    }
    
    handleSubmit(result) {
        const { signUp } = this.props;
        for (let key in result) {
            if (key === 'password') {
                result[key] =  encrypt(result[key]);
            }
        }
        signUp(result);
    }
 
    componentWillReceiveProps(nextProps) {
        nextProps.isRegistered && nextProps.history.push('signin');
    }

    render() {
        const { isRegistering, registryMsg } = this.props;
        
        return (
            <div className="signup">
                {isRegistering && <Loading/>}
                <Form onSubmit={this.handleSubmit} >
                    <div className="form-tips">{registryMsg}</div>
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
                        countTime={60}
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