import React, { Component } from 'react';

export default class Layout extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="section">
                { this.props.children }
            </section>
        );
    }
}