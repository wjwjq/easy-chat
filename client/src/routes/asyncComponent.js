import React from 'react';

//组件异步加载 code split
export default function asyncComponent(getComponent) {
    return class AsyncComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                Component: null
            };
        }
    
        componentWillMount() {
            if (!this.state.Component) {
                getComponent().then((Component) => {
                    this.setState({ Component });
                });
            }
        }
        render() {
            const { Component } = this.state;
            if (Component) {
                return <Component {...this.props} />;
            }
            return null;
        }
    };
}