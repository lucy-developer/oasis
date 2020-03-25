import React, { Component } from 'react';
import { Card, CardBody, Col, Row, Table, Button } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import TableHeaders from '../common/TableHeaders';
import AlertModal from '../common/AlertModal';
import FirewallSearchDetailTableBody from "./FirewallSearchDetailTableBody";

@inject('firewallStore')
@observer
class FirewallSearchDetailBodyCard extends Component {
    componentDidMount() {
        const { firewallStore } = this.props;
        firewallStore.detail();
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            firewallStore.approvalId = null;
        };
    }

    componentWillUnmount() {
        window.onpopstate = null;
    }

    render() {
        const { store, tableHeader } = this.props;
        return (
            <div>
                <Card>
                    <CardBody className="body-card">
                        {/*<Row>*/}
                        {/*    <Col md="6">*/}
                        {/*        <ClientStaticMaps store={store} />*/}
                        {/*    </Col>*/}
                        {/*    <Col md="6">*/}
                        {/*        <ClientManagementDetailInfo store={store} />*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}
                        <Row>
                            <Col className="table-body">
                                <Table className="custom-table custom-table-clickable" bordered striped responsive>
                                    <TableHeaders tableHeader={tableHeader} />
                                    <tbody>
                                    <FirewallSearchDetailTableBody store={store} />
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row>
                            <Button className="btn-link" color="default" type="button" onClick={store.detailMeetingEdit}>
                                승인
                            </Button>
                        </Row>
                    </CardBody>
                </Card>
                {/*<ClientManagementDetailModal store={store} />*/}
                <AlertModal store={store} />
            </div>
        );
    }
}

export default FirewallSearchDetailBodyCard;