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
                        <Col>
                            <h3>
                                {'방화벽 > 방화벽 신청'}
                            </h3>
                        </Col>
                    </Row>
                    <Row>
                        <FirewallRequestBodyCard
                            store={firewallStore}
                            tableHeader={['상태', '방문자', '방문 내용', '방문지 위치', '방문 일시', '방문 상태']}
                        />
                    </Row>
                </Container>
            </div>
        )
    }
}

export default FirewallRequest;