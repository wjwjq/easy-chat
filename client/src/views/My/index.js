import React, { Component } from 'react';

import Nav from '../../components/Nav/';
import Header from '../../components/Header/Header';
import My from '../../components/My/';

export default class MyView extends Component {
    
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="container messages">
                <Header showTitle="我"/>
                <My />
                <Nav />
            </div>
        );
    }
}