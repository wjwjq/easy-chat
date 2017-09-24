import React, { PureComponent } from 'react';

import './About.less';

export default class About extends PureComponent {
    render() {
        return (
            <article className="about">
                <p className="center">关于Easy Chat</p>
                <p>本APP仅做学习使用,布局样式等参考于微信,请勿用于任何商业用途！如有疑问,请联系我！谢谢！</p>
                <hr />
                <p className="center">关于作者</p>
                <p><span>author:</span><i>Stephen Wu</i></p>
                <p><span>github:</span> <i><a href="https://github.com/wjwjq">https://github.com/wjwjq</a></i></p>
                <p><span>repository:</span><i><a href="https://github.com/wjwjq/easy-chat">https://github.com/wjwjq/easy-chat</a></i></p>
                <p><span>author's blog:</span> <i><a href="http://wjwjq.com">http://wjwjq.com</a>(developing)</i></p>
                <p><span>Contact:</span> <i><a href="mailto:wjwjq456@gmail.com">wjwjq456@gmail.com</a></i></p>
            </article>
        );
    }
}