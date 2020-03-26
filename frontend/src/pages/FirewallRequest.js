import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import FirewallRequestBodyCard from "../components/firewall-request/FirewallRequestBodyCard";

@inject('firewallStore')
@observer
class FirewallRequest extends Component {
    async componentDidMount() {
        const { firewallStore, onUpdate, history } = this.props;
        document.title = 'OASIS. Web - 방화벽 > 방화벽 신청';
        onUpdate();
    }

    render() {
        const { firewallStore } = this.props;
        return (
            <div className="admin-page">
                <Container fluid>
                    <Row>
                        <Col style={{paddingLeft:"42px"}}>
                            <h3>
                                {'방화벽 > 방화벽 신청'}
                            </h3>
                        </Col>
                    </Row>
                    <Row>
                        <FirewallRequestBodyCard
                            store={firewallStore}
                            tableHeader={['주소 유형', '출발지 주소', '주소 유형', '목적지 주소', '프로토콜', '포트', '허용여부', '기간', '요청내용', '액션']}
                        />
                    </Row>
                </Container>
            </div>
        )
    }
}

export default FirewallRequest;