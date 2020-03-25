import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import Loader from '../components/common/Loader';
import FirewallSearchBodyCard from "../components/firewall-search/FirewallSearchBodyCard";
import FirewallSearchDetailBodyCard from "../components/firewall-search/FirewallSearchDetailBodyCard";

@inject('firewallStore')
@observer
class FirewallSearch extends Component {
    async componentDidMount() {
        const { firewallStore, onUpdate, history } = this.props;
        document.title = 'OASIS. Web - 방화벽 > 방화벽 관리'
        onUpdate();

        try {
            await firewallStore.search();
        } catch (e) {
            if (e.status === 401) {
                firewallStore.root.isLoading = false;
                history.push('/auth/login');
            }
        }
    }

    render() {
        const { firewallStore } = this.props;
        return (
            <div className="admin-page">
                <Container fluid>
                    <Row>
                        <Col>
                            <h3>
                                {'방화벽 > 방화벽 관리'}
                            </h3>
                        </Col>
                    </Row>
                    {/*<Row>*/}
                    {/*    <Col>*/}
                    {/*        <ClientSearchCard store={firewallStore} />*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    <Row>
                        <Col>
                            {firewallStore.approvalId ? (
                                <FirewallSearchDetailBodyCard
                                    store={firewallStore}
                                    tableHeader={['상태', '방문자', '방문 내용', '방문지 위치', '방문 일시', '방문 상태']}
                                />
                            ) : (
                                <FirewallSearchBodyCard
                                    store={firewallStore}
                                    tableHeader={['TITLE', 'KEY', '신청', '상태코드', '결재자', '신청일']}
                                />
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}

export default FirewallSearch;