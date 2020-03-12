import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Table } from 'reactstrap';
import { observer } from 'mobx-react';
import SizeComponents from '../common/SizeComponents';
import TableHeaders from '../common/TableHeaders';
import CustomPagination from '../common/CustomPagination';
import ClientManagementTableBody from './ClientManagementTableBody';
import ClientManagementModal from './ClientManagementModal';
import AlertModal from '../common/AlertModal';
import ExportExcel from '../common/ExportExcel';

@observer
class ClientManagementBodyCard extends Component {
    clientCsvData = () => {
        const { store } = this.props;
        if (store.data.items) {
            return store.data.items.map((row, key) => {
                return {
                    순번: (store.page - 1) * store.size + key + 1,
                    고객사명: row.name,
                    '고객사 위치': row.place.address,
                    메모: row.notes,
                    '방문 사원명': row.lastMeetingOrganizer ? row.lastMeetingOrganizer.name : '-',
                    '사원 조직명': row.lastMeetingOrganizer ? row.lastMeetingOrganizer.team.name : '-',
                    '방문 횟수': `${row.checkInCountOfCompany}회`,
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
                            <Col md="12" className="text-right">
                                <SizeComponents store={store} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="table-body">
                                <Table className="custom-table custom-table-clickable" bordered striped responsive>
                                    <TableHeaders tableHeader={tableHeader} />
                                    <tbody>
                                    <ClientManagementTableBody store={store} />
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="btn-area">
                                <ExportExcel csvData={this.clientCsvData()} fileName="고객사 정보" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <CustomPagination store={store} />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <ClientManagementModal store={store} />
                <AlertModal store={store} />
            </div>
        );
    }
}

export default ClientManagementBodyCard;
