import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Table } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import TableHeaders from '../common/TableHeaders';
import ClientStaticMaps from './ClientStaticMaps';
import ClientManagementDetailInfo from './ClientManagementDetailInfo';
import ClientManagementDetailTableBody from './ClientManagementDetailTableBody';
import ExportExcel from '../common/ExportExcel';
import ClientManagementDetailModal from './ClientManagementDetailModal';
import AlertModal from '../common/AlertModal';

@inject('clientManagementStore')
@observer
class ClientManagementDetailBodyCard extends Component {
    componentDidMount() {
        const { clientManagementStore } = this.props;
        clientManagementStore.detail();
        clientManagementStore.detailClientList();
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            clientManagementStore.clientId = null;
        };
    }

    componentWillUnmount() {
        window.onpopstate = null;
    }

    clientMeetingCsvData = () => {
        const { store } = this.props;
        if (store.detailClientData.items) {
            return store.detailClientData.items.map((row, key) => {
                return {
                    상태: `방문 ${key + 1}`,
                    방문자: row.organizer.name,
                    '방문 내용': row.notes,
                    '방문지 위치': row.place.address,
                    '방문 일시': row.checkedIn ? moment(row.checkedIn.datetime).format('YYYY.MM.DD dddd HH:mm:SS') : '-',
                    '방문 상태': row.status === 'SCHEDULED' ? '미방문' : '방문',
                };
            });
        }
        return [];
    };

    render() {
        const { store, tableHeader } = this.props;
        return (
            <div>
                <Card>
                    <CardBody className="body-card">
                        <Row>
                            <Col md="6">
                                <ClientStaticMaps store={store} />
                            </Col>
                            <Col md="6">
                                <ClientManagementDetailInfo store={store} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="btn-area">
                                <ExportExcel
                                    csvData={this.clientMeetingCsvData()}
                                    fileName={`고객사 ${store.detailData.name}의 방문 이력`}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="table-body">
                                <Table className="custom-table custom-table-clickable" bordered striped responsive>
                                    <TableHeaders tableHeader={tableHeader} />
                                    <tbody>
                                    <ClientManagementDetailTableBody store={store} />
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <ClientManagementDetailModal store={store} />
                <AlertModal store={store} />
            </div>
        );
    }
}

export default ClientManagementDetailBodyCard;
