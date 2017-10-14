import React, { Component } from 'react';

// import PropTypes from 'prop-types';

export default class Submit extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        
        this.state = {
            canBeTriggerAgain: true
        };
    }
    handleClick(e) {
        e.preventDefault();
        this.props.onSubmit();
    }

    componentWillReceiveProps(nextprops) {
        this.setState({
            canBeTriggerAgain: nextprops.reset 
        });
    }
    render() {
        const { canBeTriggerAgain } = this.state;
        return (
            <button type="submit" onClick={this.handleClick} disabled={!canBeTriggerAgain}>{this.props.text || '登录'}</button>
        );
    }

}