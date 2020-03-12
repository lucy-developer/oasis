import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import ClientSearchCard from '../components/client-management/ClientSearchCard';
import ClientManagementBodyCard from '../components/client-management/ClientManagementBodyCard';
import ClientManagementDetailBodyCard from '../components/client-management/ClientManagementDetailBodyCard';
import Loader from '../components/common/Loader';

@inject('clientManagementStore')
@observer
class ClientManagement extends Component {
    async componentDidMount() {
        const { clientManagementStore, onUpdate, history } = this.props;
        document.title = '아임히어-Work. Web Admin - 고객사 > 고객사 관리';
        onUpdate();
        try {
            await clientManagementStore.search();
            await clientManagementStore.teamStatus();
        } catch (e) {
            if (e.status === 401) {
                clientManagementStore.root.isLoading = false;
                history.push('/auth/login');
            }
        }
    }

    render() {
        const { clientManagementStore } = this.props;
        return (
            <div className="admin-page">
                <Container fluid>
                    <Row>
                        <Col>
                            <h3>
                                {clientManagementStore.clientId && clientManagementStore.detailData.name
                                    ? `고객사 > 고객사 ${clientManagementStore.detailData.name} 관리`
                                    : '고객사 > 고객사 관리'}
                            </h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ClientSearchCard store={clientManagementStore} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {clientManagementStore.clientId ? (
                                <ClientManagementDetailBodyCard
                                    store={clientManagementStore}
                                    tableHeader={['상태', '방문자', '방문 내용', '방문지 위치', '방문 일시', '방문 상태']}
                                />
                            ) : (
                                <ClientManagementBodyCard
                                    store={clientManagementStore}
                                    tableHeader={['순번', '고객사명', '고객사 위치', '메모', '방문 사원명', '사원 조직명', '방문 횟수']}
                                />
                            )}
                        </Col>
                    </Row>
                </Container>
                {clientManagementStore.root.isLoading && <Loader />}
            </div>
        );
    }
}

export default ClientManagement;
