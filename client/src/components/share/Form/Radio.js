import React, { Component } from 'react';

import PropTypes from 'prop-types';

//<FormItem type="text" text="性别" name="username" values=["男","女"]/>

export default class Radio extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        values: PropTypes.array.isRequired,
        text: PropTypes.string
    }
    static defaultProps = {
        defaultValue: ''
    }
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: this.props.defaultValue
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        const target = e.target;
        let name = target.name;
        let value = target.value;
        let regPass =false;
        this.props.onChange({
            [name]: { value, regPass }
        });
        this.setState({
            selectedValue: value
        });
    }

    render() {
        const { name, values, text, type  } = this.props;
        const { selectedValue } = this.state;
        return (
            <div className={`form-item-input form-item-${type}`}>
                <div className="form-item-wrapper">
                    <div className="form-item-left">
                        <span>{text}</span>
                    </div>
                    <div className="form-item-right">
                        {
                            values.length && values.map((value, idx) => 
                                <label key={`value-${idx}`} >
                                    <input 
                                        type="radio" 
                                        name={name} 
                                        value={value} 
                                        onChange={this.handleChange} 
                                        checked={selectedValue === value}
                                    />
                                    <span class="input-radio"></span>
                                    {value}
                                </label>
                            )
                        }
                    </div>
                </div>
            </div> 
        );
    }

}