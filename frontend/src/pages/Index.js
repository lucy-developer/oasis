import React, { Component } from 'react';
import Main from './Main'

// 인덱스 페이지
class Index extends Component {
    componentDidMount() {
        const { onUpdate } = this.props;
        onUpdate();
    }

    render() {
        const { history } = this.props;
        return (
            <>
                <Main />
            </>
        );
    }
}

export default Index;