import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import NavContentScroll from './NavContentScorll';

export default class TabContent extends Component {

    constructor(props) {
        super(props);
    }
    
    getContent() {
        const { contents } = this.props;

        return contents.map((item) => {

            const order = parseInt(item.props.order, 10);
            
            return  <NavContentScroll key={order}>
                {item.props.children}
            </NavContentScroll>;
        });
    }
    
    render() {
        const { width } = this.props;
        const { activeIndex } = this.props;
        const getBox = (left) => {
            return (
                <div className="nav-content-move-box" style={
                    {
                        WebkitTransform: `translate3d(${left}px, 0, 0)`,
                        transform: `translate3d(${left}px, 0, 0)`
                    }
                }>
                    {this.getContent()}
                </div>
            );
        }; 
        return (
            <div className="nav-content-container">
                <Motion style={{ left: spring(- activeIndex * width) }}>
                    {({ left }) => getBox(left)}
                </Motion>
            </div>
        );
    }

}