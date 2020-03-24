import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';

// 인덱스 페이지
class Index extends Component {
    componentDidMount() {
        const { onUpdate } = this.props;
        document.title = '아임히어-Work. Web Admin - 인덱스';
        onUpdate();
    }

    render() {
        const { history } = this.props;
        return (
            <>
            </>
        );
    }
}

export default Index;
