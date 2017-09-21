import React, { Component } from 'react';

import Header from '../../components/Header/Header';
import My from '../../components/My/';

import authenticate from '../../components/Auth/Auth';

@authenticate
export default class MyView extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="messages">
                <Header title="我"/>
                <My />
            </div>
        );
    }
}