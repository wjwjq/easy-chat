//登录
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './form.less';
import pathConfigs from '../../routes/path';

import { signIn, getValid } from '../../redux/actions/AuthActions';

@connect((store) => {
    return { 
        ...store.user
    };
})
export default class SignIn extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleGetValid = this.handleGetValid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameBlur = this.handleUsernameBlur.bind(this);
        this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
        //   this.counter = this.counter.bind(this);

        this.state = {
            username: '',
            password: '',
            valid: '',
            validButton: {
                text: '',
                originText: '获取验证码'
            },
            canBeTriggered: true,
            regStates: {
                username: 1,
                password: 1
            }
        };
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        //todo 如果是input[type=password] 需建议加密
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
            this.props.dispatch(getValid(username, 'signin'));
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
            this.props.dispatch(signIn({
                user,
                valid
            }));
        }
    }
    componentDidMount() {
        
    }
    componentWillReceiveProps(nextProps) {
        nextProps.isLogined && this.props.history.push('messages');
    }

    render() {
        const { username, password, valid, validButton, canBeTriggered, regStates } = this.state;
        const { error } = this.props;
     
        return (
            <div className='form'>
          
                <div className="form-tips">{error && '用户名或密码不正确'}</div>
                <div className="input-item">
                    <div className="input-wrapper">
                        <span>账号:</span>
                        <input placeholder='手机号' type="text" name="username" value={username} onChange={this.handleChange} onBlur={this.handleUsernameBlur}/>
                    </div>
                    <p className="input-tips">{regStates.username === 1  && '手机号格式有误！'}</p>
                </div> 

                <div className="input-item">
                    <div className="input-wrapper">
                        <span>密码：</span>
                        <input placeholder='请填写密码' type="password" name="password" value={password} onChange={this.handleChange} onBlur={this.handlePasswordBlur}/>
                    </div>
                    <p className="input-tips">
                        {regStates.password === 1 ? '密码不能为空' :''}
                    </p>
                </div> 

                <div className="input-item valid-item">
                    <div className="input-wrapper valid-wrapper">
                        <span>验证码:</span>
                        <input placeholder='请输入验证码' type="text" name="valid" value={valid} onChange={this.handleChange} />
                        <input type="button" className="btn btn-valid" value={validButton.text || validButton.originText} onClick={this.handleGetValid} disabled={!canBeTriggered} />
                    </div> 
                </div> 
                
                <button type="submit" onClick={this.handleSubmit} className="btn btn-green" >登录</button>
                <p>没有账号？<Link to={pathConfigs.signup}>去注册</Link></p>
            </div>
        );
    }

}