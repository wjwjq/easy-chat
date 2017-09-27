import React, { Component } from 'react';
import Back from '../share/Back/';

import './style.less';

export default class SearchFriend extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        
        this.state = {
            value: ''
        };
    }
    
    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    handleKeyDown(e) {
        const { onQuery } = this.props;
        if (e.keyCode === 13) {
            e.preventDefault();
            onQuery(this.state.value);
        }
    }
    render() {
        const { value } = this.state;
        return (
            <div className="search-form">
                <div>
                    <input
                        type="text" 
                        value={value} 
                        name="username" 
                        placeholder="手机号"
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                    />    
                </div>
                
                <div>
                    <Back text="取消" arrowShow={false}/>
                </div>
            </div>
        );
    }
    
}