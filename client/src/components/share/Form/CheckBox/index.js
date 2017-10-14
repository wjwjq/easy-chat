import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default class Checkbox extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        values: PropTypes.array.isRequired,
        text: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            selectOption: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        this.setState({
            selectOption:  e.target.value
        });
    }

    render() {
        const { name, values, text } = this.props;
        const { selectOption } = this.state;
        return (
            <div className={`input-item ${el}-item`}>
                <div className="input-wrapper">
                    <span>{text}</span>
                    {
                        values.length && values.map(value => 
                            <label>
                                <input type='radio' name={name} value={value} onChange={this.handleChange} checked={selectOption === value || defaultValue === value}/>
                                {value}
                            </label>
                        )
                    }
                </div>
            </div> 
        );
    }

}