import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';
import backgroundImage from '../assets/img/background-image.png';

// 인덱스 페이지
class Index extends Component {
    componentDidMount() {
        const { onUpdate } = this.props;
        document.title = '아임히어-Work. Web Admin - 인덱스';
        onUpdate();
    }

    render() {
        const { history } = this.props;

        const indexLayout = {
            backgroundImage: `url(${backgroundImage})`,
            width: "60%",
            float: "right"
        };
        return (
            <div className="index-layout" style={indexLayout}>
                <div className="index-margin">
                    <Container>
                        <p style={{ fontSize: '24px', lineHeight: '29px' }}>위치인증 솔루션 NO.1 엘핀</p>
                        <p style={{ fontSize: '45px', lineHeight: '54px' }}>아임히어-Work.</p>
                        <div className="inner-text">
                            <p style={{ fontSize: '20px', lineHeight: '24px' }}>
                                WiFi, Beacon, 기지국 정보 등을 활용한
                                <br />
                                위치기반 근태관리 서비스
                            </p>
                        </div>
                        <Button
                            color="blue"
                            size="lg"
                            onClick={() => {
                                history.push('/auth/login');
                            }}
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                lineHeight: '10px',
                                height: '50px',
                                width: '151px',
                                borderRadius: '6px',
                                padding: '10px',
                            }}
                        >
                            관리자 LOGIN
                        </Button>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Index;
