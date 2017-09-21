import React, { Component } from 'react';
import TabNav from './TabNav';
import TabConten from './TabCotent';
import './styles.less';

export default class Nav extends Component {
    
    static defaultProps = {
        onChange: () => {}
    }

    constructor(props) {
        super(props);
        const currProps =  this.props;
        this.handleTabClick = this.handleTabClick.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.children = currProps.children;

        let activeIndex;
        if ('activeIndex' in currProps) {
            activeIndex = currProps.activeIndex;
        } else if ('defaultActiveIndex' in  currProps) {
            activeIndex = currProps.defaultActiveIndex;
        }

        this.state = {
            activeIndex,
            prevIndex: activeIndex,
            width: 0
        };

    }

    updateDimensions() {
        this.setState({
            width: this.refs.navContainer.clientWidth
        });
    }

    handleTabClick(activeIndex) {
        const prevIndex = this.state.activeIndex;
        if (this.state.activeIndex !== activeIndex && 'defaultActiveIndex' in this.props) {
            this.setState({
                activeIndex,
                prevIndex
            });

            this.props.onChange({ activeIndex, prevIndex });
        }
    }

    renderTabNav() {
        return <TabNav 
            key="tabNav"
            onTabClick={this.handleTabClick}
            navs={this.children}
            activeIndex={this.state.activeIndex}
        />;
    }

    renderTabContent() {
        return <TabConten
            key="tabContent"
            contents = {this.children}
            activeIndex={this.state.activeIndex}
            width={this.state.width}
        />;
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
    }
    
    componentWillReceiveProps(nextProps) {
        if ('activeIndex' in nextProps) {
            this.setState({
                activeIndex: nextProps.activeIndex
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render() {
        return (
            <div ref="navContainer" className="nav-container">
                {this.renderTabContent()}
                {this.renderTabNav()}
            </div>
        );
    }

}