import React, { Component } from 'react';

// import PropTypes from 'prop-types';

export default class Submit extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        e.preventDefault();
        this.props.onSubmit();
    }

    render() {
        return (
            <button type="submit" onClick={this.handleClick} >{this.props.text || '登录'}</button>
        );
    }

}