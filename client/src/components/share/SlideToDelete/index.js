import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Motion, spring } from 'react-motion';

import PropTypes from 'prop-types';
import './style.less';

export default class SlideToDelete extends Component {
    
    static propTypes = {
        width: PropTypes.object,
        onDelete: PropTypes.func
    }
    
    static defaultProps = {
        width: {
            value: 50,
            unit: 'px'
        }
    }

    constructor(props) {
        super(props);
        
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.initialOffSetPos = this.initialOffSetPos.bind(this);

        this.state = {
            startX: 0,
            offSetPos: 0,
            left: 0
        };
        
    }

    handleTouchStart(e) {
        this.setState({
            startX: e.nativeEvent.touches[0].clientX
        });
    }

    handleTouchMove(e) {
        let { left, startX, offSetPos } = this.state;
        const endX = e.nativeEvent.touches[0].clientX;
        const step = endX - startX;
        if (step >= 0 && left > offSetPos * 2 / 3 ) { //右滑动, 隐藏
            left = 0;
        } else if (step < 0 && left < offSetPos * 1 / 3) { //左滑动，显示
            left = offSetPos;
        } else {
            left += step * 2;
        }
        startX = endX;
        this.setState({
            startX,
            left
        });
    }

    handleClick() {
        this.props.onDelete();
    }

    initialOffSetPos() {
        const node = ReactDOM.findDOMNode(this).querySelector('.slide-item-inner-button');
        this.setState({
            offSetPos: -node.clientWidth
        });
    }
    
    componentDidMount() {
        this.initialOffSetPos();
        window.addEventListener('resize', this.initialOffSetPos);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.initialOffSetPos);
    }

    render() {
        const { value, unit, text } = this.props.width;
        const { left } = this.state;
        
        const style={
            'right': -value + unit,
            'width': value + unit
        };

        return (
            <div className="slide-item" onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove}>
                <Motion style={{ left: spring(left) }}>
                    {
                        ({ left }) => 
                            <div className="slide-item-inner"  style={
                                {
                                    WebkitTransform: `translate3d(${left}px, 0, 0)`,
                                    transform: `translate3d(${left}px, 0, 0)`
                                }
                            }>
                                <div className="slide-item-inner-main">
                                    {this.props.children}
                                </div>
                                <div className="slide-item-inner-button" onClick={this.handleClick} style={style} >
                                    <span>{text || '删除'}</span>    
                                </div>
                            </div>
                    }
                </Motion>
            </div>
        );
    }

}