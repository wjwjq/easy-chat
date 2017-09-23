//加载组件
import React,{ Component } from 'react';
import './style.less';

export default class Loading extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className="loading">
            <div class="loading-stage">
                <div class="loading-ball loading-ball-1">
                    <div class="loading-inner-ball"></div>
                </div>
                <div class="loading-ball loading-ball-2">
                    <div class="loading-inner-ball"></div>
                </div>
                <div class="loading-ball loading-ball-3">
                    <div class="loading-inner-ball"></div>
                </div>
                <div class="loading-ball loading-ball-4">
                    <div class="loading-inner-ball"></div>
                </div>
                <div class="loading-ball loading-ball-5">
                    <div class="loading-inner-ball"></div>
                </div>
            </div>
        </div>);
    }
}