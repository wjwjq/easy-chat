import React, { Component } from 'react';

// import PropTypes from 'prop-types';

export default class NavPannel extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { children } = this.props;
        return (
            <div>
                {children}
            </div>
        );
    }

}