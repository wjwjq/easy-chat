import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default class Password extends Component {
    static propTypes = {
        text: PropTypes.string,
        placeholder: PropTypes.string,
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
  
        this.handleFocus  = this.handleFocus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

        this.state = {
            value: '',
            confirmValue: '',
            regMsg: '',
            confirmMsg: '',
            regs: this.props.regs || []
        };
    }

    setValue(name, value, regPass, regMsg) {
        this.props.onChange({
            [name]: { value, regPass }
        });
        this.setState({
            value,
            regMsg: regPass ? '' : regMsg
        });
    }
    
    validate(target) {
        const { text, isRequired, associateName, queryData, validateAssociationComponents } = this.props;
        let { regs, regMsg } = this.state;
        
        let name = target.name;
        let value = target.value.trim();
        let regPass = true;
        let reg = '';
        if (isRequired && !value.length) {
            regMsg = `${text}不能为空`;
            regPass = false;
            this.setValue(name, value, regPass, regMsg);
            return;
        }
        if (associateName) {
            const data =  validateAssociationComponents(queryData(associateName), false);
            if (!data.serilizeData[associateName]) {
                regMsg = `请先写前置项`;
                regPass = false;
                this.setValue(name, value, regPass, regMsg);
                return;
            } else if (data.serilizeData[associateName] !== value) {
                regMsg = `两次密码不一致`;
                regPass = false;
                this.setValue(name, value, regPass, regMsg);
                return;
            }
        } else {
            for (let i = 0; i < regs.length; i++) {
                reg = regs[i];
                if ( !(new RegExp(reg['reg'], reg['mode'])).test(value) ) {
                    regMsg = reg['msg'];
                    regPass = false;
                    this.setValue(name, value, regPass, regMsg);
                    return;
                }
            }
        }
        this.setValue(name, value, regPass, regMsg);
    }

    confirmValidataion(target) {
        let confirmValue = target.value.trim();
        let { value, confirmMsg } = this.state;
        let regPass = true;
        if (!confirmValue.length) {
            confirmMsg = '确认密码不能为空';
            regPass = false;
        } else if (confirmValue !== value) {
            confirmMsg = '两次密码不一致';
            regPass = false;
        } else {
            regPass = true;
        }

        this.props.onChange({
            [this.passwordInput.name]: { value, regPass }
        });
        this.setState({
            confirmValue,
            confirmMsg: regPass ? '' : confirmMsg
        });
    }

    handleFocus(e) {
        this.validate(e.target);
    }
    handleChange(e) {
        this.validate(e.target);
    }
    handleBlur(e) {
        this.validate(e.target);
    }

    
    handleConfirmChange(e) {
        this.confirmValidataion(e.target);
    }

    handleConfirmBlur(e) {
        this.confirmValidataion(e.target);
    }
 
    render() {
        const { text, placeholder, type, name } = this.props;
        const { value, regMsg } = this.state;
        return (
            <div className={`form-item-input form-item-${type}`}>
                <div className="form-item-wrapper">
                    <div className="form-item-left">
                        <span>{text}</span>
                    </div>
                    <div className="form-item-right">
                        <input
                            placeholder={placeholder} 
                            type='password' 
                            name={name} 
                            value={value} 
                            onFocus={this.handleFocus}
                            onChange={this.handleChange} 
                            onBlur={this.handleBlur}
                        />
                    </div>
                </div>
                <p className="form-item-tips">{regMsg}</p>
            </div> 
        );
    }

}

