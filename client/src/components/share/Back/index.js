//返回按钮
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

class Back extends PureComponent {
    render() {
        const { text, arrowShow, history } = this.props;
        return <i className={arrowShow ? 'icon icon-arrow-left go-back': ''} onClick={history.goBack}>{text ||'返回'}</i>;
    }
}

export default withRouter(Back);