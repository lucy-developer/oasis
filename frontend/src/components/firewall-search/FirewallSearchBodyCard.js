import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Table } from 'reactstrap';
import { observer } from 'mobx-react';
import SizeComponents from '../common/SizeComponents';
import TableHeaders from '../common/TableHeaders';
import CustomPagination from '../common/CustomPagination';
import FirewallSearchTableBody from './FirewallSearchTableBody';
import AlertModal from '../common/AlertModal';

@observer
class FirewallSearchBodyCard extends Component {
    render() {
        const { store , tableHeader } = this.props;
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
                                    <FirewallSearchTableBody store={store} />
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        {/*<Row>*/}
                        {/*    <Col className="btn-area">*/}
                        {/*        <ExportExcel csvData={this.clientCsvData()} fileName="고객사 정보" />*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}
                        <Row>
                            <Col>
                                <CustomPagination store={store} />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {/*<ClientManagementModal store={store} />*/}
                <AlertModal store={store} />
            </div>
        )
    }
}

export default FirewallSearchBodyCard;