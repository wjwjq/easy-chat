import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default class Validate extends Component {
    static propTypes = {
        text: PropTypes.string,
        placeholder: PropTypes.string,
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        const { validButtonText, countTime } = this.props.validButtonText;
 
        this.handleFocus = this.handleFocus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleGetVerifyCode = this.handleGetVerifyCode.bind(this);

        this.state = {
            value: '',
            regMsg: '',
            canTriggerAgain: true,
            verifyCode: '',
            buttonText: validButtonText || '获取验证码',
            buttonOriginText: validButtonText || '获取验证码',
            countTime: countTime || 60
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
        let { regMsg } = this.state;
        
        let name = target.name;
        let value = target.value;
        let regPass = true;
        if (isRequired && !value.length) {
            regMsg = `${text}不能为空`;
            regPass = false;
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

    counter() {
        let _this =  this;
        let { countTime } = _this.state;
        const countFunc = () => {
            setTimeout(() => {
                if (countTime < 0) {
                    _this.setState({
                        canTriggerAgain: true,
                        buttonText: _this.state.buttonOriginText
                    });
                    return;
                }
                _this.setState({
                    buttonText: `(${countTime--})s`
                });
                countFunc();
            }, 1000);
        };
        countFunc();
    }

    handleGetVerifyCode() {
        const { canTriggerAgain } = this.state;
        if (canTriggerAgain) {
            const { associateName, queryData, getVerifyCodeFunc, validateAssociationComponents } = this.props;
            const postData = validateAssociationComponents(queryData(associateName), true);
            if (postData.allPassed) {
                getVerifyCodeFunc(postData.serilizeData);
                this.counter();
                this.setState({
                    canTriggerAgain: false
                });
            }
        }
    }

    render() {
        const { text, placeholder, type, name } = this.props;
        const { regMsg, value, canTriggerAgain, buttonText } = this.state;
        return (
            <div className={`form-item-input form-item-${type}`}>
                <div className="form-item-wrapper">
                    <div className="form-item-left">
                        <span>{text}</span>
                    </div>
                    <div className="form-item-right">
                        <input 
                            placeholder={placeholder} 
                            type='text' 
                            name={name} 
                            value={value} 
                            onFocus={this.handleFocus} 
                            onChange={this.handleChange} 
                            onBlur={this.handleBlur}
                        />
                        <input type="button" value={buttonText} onClick={this.handleGetVerifyCode} disabled={!canTriggerAgain} />
                    </div>
                </div>
                <p className="form-item-tips">{regMsg}</p>
            </div> 
        );
    }

}

