import React from 'react';

import Header from '../../components/Header/';
import My from '../../components/My/';

export default function MyView() {
    return (
        <div className="messages">
            <Header title="我"/>
            <My />
        </div>
    );
}