//注册
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './form.less';

import pathConfigs from '../../routes/path';

import { signUp, getValid } from '../../redux/actions/AuthActions';
import { connect } from 'react-redux';

@connect((store) => {
    return {
        error: store.user.error,
        valid: store.user.valid,
        isRegistered: store.user.isRegistered
    };
})
export default class SignUp extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleGetValid = this.handleGetValid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameBlur = this.handleUsernameBlur.bind(this);
        this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
        this.handleRepasswordBlur = this.handleRepasswordBlur.bind(this);

        this.state = {
            username: '',
            password: '',
            repassword: '',
            valid: '',
            validButton: {
                text: '',
                originText: '获取验证码'
            },
            canBeTriggered: true,
            regStates: {
                username: 0,
                password: 0,
                repassword: 0
            }
        };
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
    }

    counter() {
        let count = 10;
        let _this =  this;
        const countFunc = () => {
            setTimeout(() => {
                if (count < 0) {
                    _this.setState({
                        canBeTriggered: true,
                        validButton: { text: '' }
                    });
                    return;
                }
                _this.setState({
                    validButton: { text: `(${count--})S` }
                });
                countFunc();
            }, 1000);
        };
        countFunc();
    }

    handleGetValid() {
        const { username, canBeTriggered }=  this.state;
        if (canBeTriggered) {
            this.counter();
            this.props.dispatch(getValid(username, 'signUp'));
            this.setState({
                canBeTriggered: false
            });
        }
    }

    
    handleUsernameBlur(e) {
        if (!/^1[345789][\d]{9}$/g.test(e.target.value)) {
            this.setState({
                regStates: Object.assign({},this.state.regStates, {  username: 1 })
            });
            return;
        }

        this.setState({
            regStates: Object.assign({},this.state.regStates, {  username: 0 })
        });
    }

    handlePasswordBlur(e) {
        const value = e.target.value; 
        if (value.length === 0) {
            this.setState({
                regStates: Object.assign({},this.state.regStates, {  password: 1 })
            });
            return;
        }
        
        if (value.length < 8  || value.length >16) {
            this.setState({
                regStates: Object.assign({},this.state.regStates, {  password: 2 })
            });
            return;
        }

        if (!/\d/g.test(value) || !/[a-zA-Z]/g.test(value) || /^w{8, 16}$/g.test(value)) {
            this.setState({
                regStates: Object.assign({},this.state.regStates, {  password: 3 })
            });
            return;
        }

        this.setState({
            regStates: Object.assign({},this.state.regStates, {  password: 0 })
        });
    }

    handleRepasswordBlur(e) {
        const value = e.target.value; 

        if (!value) {
            this.setState({
                regStates: Object.assign({},this.state.regStates, {  repassword: 1 })
            });
            return;
        }

        if (value !== this.state.password) {
            this.setState({
                regStates: Object.assign({},this.state.regStates, {  repassword: 2 })
            });
            return;
        }

        this.setState({
            regStates: {  repassword: 0 }
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        const { username, password, valid,  regStates } = this.state;
        let isAllCorrect = true;
        for (let key in regStates) {
            if (regStates[key]) {
                isAllCorrect = false;
                this.setState({
                    regStates: Object.assign({},this.state.regStates, {  [key]: 1 })
                });
                return;
            }
        }
        
        if (isAllCorrect && username && password && valid) {
            const user = {
                username,
                password
            };
            this.props.dispatch(signUp({
                user,
                valid
            }));
        }
    }
    
    componentDidMount() {
        
    }
    componentWillReceiveProps(nextProps) {
        console.info(this.props);
        console.info(nextProps.isRegistered);
        nextProps.isRegistered && this.props.history.push('signup');
    }

    render() {
        const { username, password, repassword, valid, validButton, canBeTriggered, regStates } = this.state;
        const { error } = this.props;
        
        return (
            <div className='form'>
                <div className="form-tips">{error && '注册失败！请检查后重新提交！'}</div>
                <div className="input-item">
                    <div className="input-wrapper">
                        <span>账号:</span>
                        <input placeholder='请输入手机号' type="text" name="username" value={username} onChange={this.handleChange} onBlur={this.handleUsernameBlur}/>
                    </div>
                    <p className="input-tips">{regStates.username === 1 && '手机号格式有误！'}</p>
                </div> 

                <div className="input-item">
                    <div className="input-wrapper">
                        <span>密码：</span>
                        <input placeholder='请输入密码' type="password" name="password" value={password} onChange={this.handleChange} onBlur={this.handlePasswordBlur}/>
                    </div>
                    <p className="input-tips">
                        {regStates.password === 1 
                            ? '密码不能为空' 
                            : regStates.password === 2 
                                ? '密码长度不宜过长或过短,建议8到16位之间' 
                                : regStates.password === 3 
                                    ? '密码格式错误，应为数字、字母、下划线组合'
                                    : ''}
                    </p>
                </div> 

                <div className="input-item">
                    <div className="input-wrapper">
                        <span>确认密码：</span>
                        <input placeholder='请确认密码' type="password" name="repassword" value={repassword} onChange={this.handleChange} onBlur={this.handleRepasswordBlur}/>
                    </div>
                    <p className="input-tips">
                        {regStates.repassword === 1 
                            ? '确认密码不能为空' 
                            : regStates.repassword === 2 
                                ? '密码不一致' 
                                : ''}
                    </p>
                </div> 

                <div className="input-item valid-item">
                    <div className="input-wrapper valid-wrapper">
                        <span>验证码:</span>
                        <input placeholder='请输入验证码' type="text" name="valid" value={valid} onChange={this.handleChange} />
                        <input type="button" className="btn btn-valid" value={validButton.text || validButton.originText} onClick={this.handleGetValid} disabled={!canBeTriggered} />
                    </div> 
                </div> 
                
                <button type="submit" onClick={this.handleSubmit} className="btn btn-green" >注册</button>
                <p>已有账号？<Link to={pathConfigs.signin}>去登录</Link></p>
            </div>
        );
    }

}