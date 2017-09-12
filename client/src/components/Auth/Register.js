//注册
import React, { Component } from 'react';

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            repassword: '',
            valid: ''
        };
    }

    handleChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value
        });
    }

    handleValid(){

    }

    handleSubmit() {

    }

    render() {
        const { username, password, repassword, valid } = this.state;
        return (
            <div>
                <div className="input-wrapper">
                    <span>账号:</span>
                    <input placeholder='请输入账号' type="text" name="username" value={username} onChange={this.handleChange('username')}/>
                </div> 
                <div className="input-wrapper">
                    <span>密码：</span>
                    <input placeholder='请填写密码' type="password" name="password" value={password} onChange={this.handleChange('password')}/>
                </div> 
                <div className="input-wrapper">
                    <span>确认密码：</span>
                    <input placeholder='请确认密码' type="password" name="repassword" value={repassword} onChange={this.handleChange('repassword')}/>
                </div> 
                <div className="input-wrapper">
                    <span>验证码:</span>
                    <input placeholder='请输入验证码' type="text" name="valid" value={valid} onChange={this.handleChange('valid')}/>
                    <button className="btn btn-valid" onClick={this.handleValid}>获取验证码</button>
                </div> 
                
                <button type="submit" onClick={this.handleSubmit} className="btn btn-green" >注册</button>
                <p>已有账号？<Link to='/login'>去登录</Link></p>
            </div>
        );
    }

}