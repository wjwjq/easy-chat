import React from 'react';

import Header from '../../components/Header/';
import My from '../../components/My/';


// import asyncComponent from '../../routes/asyncComponent';
// const Header = asyncComponent(() =>
//     System.import('../../components/Header/').then((module) => module.default)
// );
// const My = asyncComponent(() =>
//     System.import('../../components/My/').then((module) => module.default)
// );

export default function MyView() {
    return (
        <div className="messages">
            <Header title="我"/>
            <My />
        </div>
    );
}