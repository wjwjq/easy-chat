import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// import PropTypes from 'prop-types';

import './Form.less';
import Text from './Text';
import Password from './Password';
import Validate from './Validate';
import Checkbox from './Checkbox';
import Radio from './Radio';
import Select from './Select';
import Textarea from './Textarea';
import Submit from './Submit';


//调用方式，详见./test.js

export default class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.queryInsetData = this.queryInsetData.bind(this);
        this.validateAllAndformatData = this.validateAllAndformatData.bind(this);
    }

    
    getFormComponents() {
        const { children } = this.props;

        return children.map((child, idx) => {
            const { type } = child.props;
            switch (type) {
                case 'radio':
                    return (<Radio 
                        key={`radio-${idx}`} 
                        {...child.props} 
                        onChange={this.handleChange} 
                    />);
                case 'checkbox':
                    return (<Checkbox 
                        key={`checkbox-${idx}`} 
                        {...child.props}  
                        onChange={this.handleChange} 
                    />);
                case 'select':
                    return (<Select 
                        key={`select-${idx}`} 
                        {...child.props} 
                        onChange={this.handleChange} 
                    />);
                case 'texrarea':
                    return (<Textarea 
                        key={`text-${idx}`} 
                        {...child.props} 
                        onChange={this.handleChange} 
                    />);
                case 'password': 
                    return (<Password 
                        key={`input-${idx}`} 
                        {...child.props} 
                        onChange={this.handleChange} 
                        queryData={this.queryInsetData} 
                        validateAssociationComponents={this.validateAllAndformatData}
                    />);
                case 'validate': 
                    return (<Validate 
                        key={`input-${idx}`} 
                        {...child.props} 
                        onChange={this.handleChange} 
                        queryData={this.queryInsetData} 
                        validateAssociationComponents={this.validateAllAndformatData}
                    />);
                case 'text':
                    return (<Text 
                        key={`input-${idx}`} 
                        {...child.props} 
                        onChange={this.handleChange} 
                    />);
                case 'submit':
                    return (<Submit 
                        key={`input-${idx}`} 
                        {...child.props} 
                        onSubmit={this.handleSubmit} 
                    />);
                default: 
                    return child;
            }
        });         
    }

    initialDefaultNameAndValue() {
        const { children } = this.props;
        let data = {};
        
        children.map((child) => {
            const { name, type, defaultValue, defaultValues } = child.props;
            switch (type) {
                case 'radio':
                    return data = Object.assign({}, data, { [name]: { 'value': defaultValue, 'regPass': true  } });
                case 'checkbox':
                    return  data = Object.assign({}, data, { [name]: { 'value': defaultValues, 'regPass': true } });
                case 'select':
                    return data = Object.assign({}, data, { [name]: { 'value': defaultValue, 'regPass': true } });
                case 'texrarea':
                    return data = Object.assign({}, data, { [name]: { 'value': '', 'regPass': true } });
                case 'password':
                    return data = Object.assign({}, data, { [name]: { 'value': '', 'regPass': false } });
                case 'validate':
                    return data = Object.assign({}, data, { [name]: { 'value': '', 'regPass': false } });
                case 'text':
                    return data = Object.assign({}, data, { [name]: { 'value': '', 'regPass': false } });
                default: 
                    return '';
            }
        });
        this.setState({
            data
        });  
    }
    
    handleChange(childData) {
        this.setState({
            data: Object.assign({}, this.state.data, childData)
        });
    }

    //提供给子组件查询其它子组件数据的能力
    queryInsetData(associateNames) {
        const { data } = this.state;
        let result = {};
        if (Array.isArray(associateNames)) {
            for (let i = 0; i < associateNames.length;i++) {
                result[associateNames[i]] = data[associateNames[i]];
            }
        } else if (typeof associateNames === 'string') {
            result[associateNames] = data[associateNames];
        }
        return result;
    }
    //聚焦
    whichNeedToBeFocus(name) {
        ReactDOM.findDOMNode(this).querySelector(`[name=${name}]`).focus();
    }
    validateAllAndformatData(data, needToBeFocus) {
        let serilizeData = {};
        let allPassed = true;
        const keys = Object.keys(data);
        let name = '';
        for (let i = keys.length - 1; i >=0; i--) {
            name = keys[i];
            if (!data[name].regPass) {
                allPassed = false;
                needToBeFocus && this.whichNeedToBeFocus(name);
            } else {
                serilizeData[name] = data[name]['value'];
            }
        }
        return {
            allPassed,
            serilizeData
        };
    }
    //聚焦
    handleSubmit() {
        const { data } = this.state;
        const result = this.validateAllAndformatData(data, true);
        result.allPassed && this.props.onSubmit(result.serilizeData);
    }
    
    componentDidMount() {
        this.initialDefaultNameAndValue();
    }


    render() {
        return (
            <div className="custom-form">
                {this.getFormComponents()}
            </div>
        );
    }

}