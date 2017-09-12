//登录
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { login, getLoginValid } from '../../redux/actions/AuthActions';

@connect((store) => {
    return {
        error: store.user.error,
        logined: store.user.logined,
        logining: store.user.logining,
        valid: store.user.valid
    };
})
export default class Login extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleValid = this.handleValid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
            username: '',
            password: '',
            valid: ''
        };
    }

    handleChange = (name) => (e) => {
        //todo: valid
        this.setState({
            [name]: e.target.value
        });
    }

    handleValid(){
        const { username }=  this.state;
        this.props.dispatch(getLoginValid(username));

    }

    handleSubmit() {
        //todo: valids
        const { username, password, valid } = this.state;
        const user = {
            username,
            password
        };

        this.props.dispatch(login({
            user,
            valid
        }));
    }

    render() {
        const { username, password, valid } = this.state;
        const { error } = this.props;
        //, logining, logined
        // const formChild = [{
        //     type: 'text',
        //     name: 'username',
        //     defaultValue: '',
        //     placeholder: '请输入用户名',
        //     validReg: '/\d/g',
        //     tipMsg: '用户名错误'
        // },{
        //     type: 'password',
        //     name: 'password',
        //     defaultValue: '',
        //     placeholder: '请输入密码',
        //     validReg: '/\d/g',
        //     tipMsg: '密码错误'
        // }];
        return (
            <div>
                {/* <Form action="abc.com" children={formChild} >
                    <FormItem />
                </Form> */}
                <div className="form-tips">{error && '用户名或密码不正确'}</div>
                <div className="input-wrapper">
                    <span>账号:</span>
                    <input placeholder='请输入账号' type="text" name="username" value={username} onChange={this.handleChange('username')}/>
                </div> 
                <div className="input-wrapper">
                    <span>密码：</span>
                    <input placeholder='请填写密码' type="password" name="password" value={password} onChange={this.handleChange('password')}/>
                </div> 
                <div className="input-wrapper">
                    <span>验证码:</span>
                    <input placeholder='请输入验证码' type="text" name="valid" value={valid} onChange={this.handleChange('valid')}/>
                    <button className="btn btn-valid" onClick={this.handleValid}>获取验证码</button>
                </div> 
                
                <button type="submit" onClick={this.handleSubmit} className="btn btn-green" >登录</button>
                <p>没有账号？<Link to='/register'>去注册</Link></p>
            </div>
        );
    }

}