import React from 'react';
import { withRouter } from 'react-router-dom';


class Back extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <i className="icon icon-arrow-left go-back" onClick={this.props.history.goBack}>返回</i>;
    }
}

export default withRouter(Back);