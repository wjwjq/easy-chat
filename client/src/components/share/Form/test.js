//测试
import React, { Component } from 'react';
import Form from './';
import FormItem from './FormItem';

export default class TestForm extends Component {
    
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(formData) {
        console.info('submit');
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} >
                <FormItem 
                    text="手机号" 
                    placeholder="请输入手机号" 
                    type="text" 
                    name="username" 
                    isRequired={true}
                    regs={ [{ reg: '^1[345789][\\d]{9}$', mode: 'ig' ,msg: '手机格式错误' }] } 
                />
                <FormItem 
                    text="密码2" 
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
                    text="昵称" 
                    placeholder="请输入昵称" 
                    type="text" 
                    name="nickname" 
                    regs={ [{ reg: '', mode: 'ig' ,msg: '请输入昵称' }] } 
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
                    associateName={['username','password','repeatPassword']}
                    getVerifyCodeFunc= {function () {
                        console.info('getVerifyCodeFunc');
                    }}
                />
                <FormItem 
                    text="性别" 
                    type="radio" 
                    name="gender" 
                    values={['男','女']} 
                    defaultValue="男" 
                />
                <FormItem  
                    text="登录"
                    type='submit'
                />
                <p>哈哈哈哈</p>
            </Form>
        );
    }
    
}