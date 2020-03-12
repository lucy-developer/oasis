import React, { Component } from 'react';
import { Button, Col, Card, CardBody, Form, Row } from 'reactstrap';
import { observer } from 'mobx-react';
import SearchLabelInput from '../common/SearchLabelInput';
import SearchLabelDate from '../common/SearchLabelDate';
import SearchLabelSelect from '../common/SearchLabelSelect';

@observer
class ClientSearchCard extends Component {
    render() {
        const { store } = this.props;
        return (
            <div>
                <Card>
                    <CardBody className="search-card">
                        <Row md="12">
                            <Col xs="10" className="col-center">
                                <Form className="form-horizontal">
                                    <Row>
                                        <SearchLabelInput
                                            title="고객사명"
                                            name="clientName"
                                            value={store.clientName}
                                            handleChange={store.handleChange}
                                        />
                                        <SearchLabelInput
                                            title="방문 사원명"
                                            name="staffName"
                                            value={store.staffName}
                                            handleChange={store.handleChange}
                                        />
                                    </Row>
                                    <Row>
                                        <SearchLabelDate
                                            title="방문일시"
                                            handlePrevDateChange={store.handlePrevDateChange}
                                            handleEndDateChange={store.handleEndDateChange}
                                            prevDate={store.prevDate}
                                            endDate={store.endDate}
                                        />
                                        <SearchLabelSelect
                                            title="조직명"
                                            name="teamId"
                                            value={store.teamId}
                                            data={store.teamData}
                                            handleChange={store.handleSelectChange}
                                        />
                                    </Row>
                                </Form>
                            </Col>
                            <Col xs="2" className="text-center search-button">
                                <Button
                                    onClick={() => {
                                        store.handlePageChange(1);
                                        store.search();
                                    }}
                                >
                                    검색
                                </Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default ClientSearchCard;
