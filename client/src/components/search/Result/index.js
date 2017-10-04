import React, { PureComponent } from 'react';
import Card from '../../share/Card/';
import './style.less';

export default class SearchResult extends PureComponent {
    handleClick(username) {
        this.props.onAdd(username);
    }
    render() {
        const { result } = this.props;
        return (
            <div className="search-result">
                <div className="search-result-user">
                    <Card
                        classPrefix="user-info"
                        genderShow={true}
                        countShow={true}
                        nicknameShow={true}
                        userInfo={result}
                    /> 
                </div>
                <div className="search-result-add">
                    <button className="btn btn-green" onClick={this.handleClick.bind(this, result.username)} >添加</button>
                </div>                    
            </div> 
        );
    }
}  
