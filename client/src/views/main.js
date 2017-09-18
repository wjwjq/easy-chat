import React, { Component } from 'react';

import Nav from '../../components/Nav/';


export default class MyView extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container messages">
              
                <Nav />
            </div>
        );
    }
}