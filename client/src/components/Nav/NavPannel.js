import React, { Component } from 'react';

// import PropTypes from 'prop-types';

export default class NavPannel extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

}