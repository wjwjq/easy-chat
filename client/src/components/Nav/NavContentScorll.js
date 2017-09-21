import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

export default class NavContentScroll extends Component {

    constructor(props) {
        super(props);
        this.state = {
            top: 0,
            startY: 0,
            alreadyToTop: false,
            alreadyToBottom: false
        };
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
      
    }
 
    handleTouchStart(e) {
        const startY = e.nativeEvent.touches[0].clientY;
        this.setState({
            startY
        });
    }

    handleTouchMove(e) {
        const box = this.refs.navContentBox;
        const height = box.offsetHeight;
        const scrollEl = this.refs.navContentBoxInnerScorll;
        // const header = scrollEl.querySelector('header');
        const maxHeight = scrollEl.offsetHeight;
        const limitPos = maxHeight - height;
        if (limitPos > 0) {
            //开始滚动
            let { startY, top } =  this.state;
            const endY =  e.nativeEvent.touches[0].clientY;
            top += (endY - startY) * 5;
            startY = endY;
            if (top <= -limitPos) {
                top = -limitPos;
                // this.setState({
                //     alreadyToTop: true
                // });
            } else if (top >= 0) {
                top = 0;
                // this.setState({
                //     alreadyToBottom: false
                // });
            }
            // header.style.top = `${-top}px`;
            this.setState({
                top,
                startY
            });
        }
    }

    render() {
        const { top } = this.state;
        return (
            <div className="nav-content-box"  ref="navContentBox" onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} >  
                <div className="nav-content-box-inner-scorll" ref="navContentBoxInnerScorll">
                    <Motion style={{ top: spring(top) }}>
                        {({ top }) => <div  style={
                            {
                                WebkitTransform: `translate3d( 0, ${top}px, 0)`,
                                transform: `translate3d( 0, ${top}px, 0)`
                            }
                        }>
                            {this.props.children}
                        </div>}
                    </Motion>
                </div> 
            </div>
        );
    }

}