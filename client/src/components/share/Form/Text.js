import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default class Text extends Component {
    static propTypes = {
        text: PropTypes.string,
        placeholder: PropTypes.string,
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        
        this.handleFocus = this.handleFocus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

        this.state = {
            value: '',
            regMsg: '',
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
        const { text, isRequired } = this.props;
        let { regs, regMsg } = this.state;

        let name = target.name;
        let value = target.value;
        let regPass = true;
        let reg = '';
        if (isRequired && !value.length) {
            regMsg = `${text}不能为空`;
            regPass = false;
            this.setValue(name, value, regPass, regMsg);
            return;
        }
        for (let i = 0; i < regs.length; i++) {
            reg = regs[i];
            if ( !(new RegExp(reg['reg'], reg['mode'])).test(value) ) {
                regMsg = reg['msg'];
                regPass = false;
                this.setValue(name, value, regPass, regMsg);
                return;
            }
        }
        this.setValue(name, value, regPass, regMsg);
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
   
    render() {
        const { text, placeholder, type, name } = this.props;
        const { regMsg, value } = this.state;
        return (
            <div className={`form-item-input form-item-${type}`}>
                <div className="form-item-wrapper">
                    <div className="form-item-left">
                        <span>{text}</span>
                    </div>
                    <div className="form-item-right">
                        <input 
                            placeholder={placeholder} 
                            type={type} 
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

