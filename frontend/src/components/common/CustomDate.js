import React, { Component } from 'react';
import { Col, FormGroup, Label, Row } from 'reactstrap';
import ReactDatetime from 'react-datetime';
import moment from 'moment';

class CustomDate extends Component {
    render() {
        const { prevDate, endDate, handlePrevDateChange, handleEndDateChange, yesterday } = this.props;

        return (
            <>
                <Col md="4" xs="8" style={{ width: "257px" }}>
                    <Row style={{ width: "285px" }}>
                        <Col xs="5" className="datetime-custom-left" style={{ paddingLeft: "0px", width: "120px" }}>
                            <FormGroup>
                                <ReactDatetime
                                    inputProps={{
                                        name: 'prevDate',
                                        className: 'form-control datetime-custom text-center',
                                        value: prevDate,
                                        readOnly: true,
                                    }}
                                    defaultValue={prevDate}
                                    dateFormat="YYYY-MM-DD"
                                    onChange={async e => {
                                        await handlePrevDateChange(e);
                                    }}
                                    locale="ko"
                                    isValidDate={current => {
                                        return yesterday ? current.isBefore(moment().subtract(1, 'days')) : current.isBefore(moment());
                                    }}
                                    timeFormat={false}
                                    closeOnSelect
                                />
                            </FormGroup>
                        </Col>
                        <Label xs="2" className="search-label text-center datetime-custom-center dateLabel">
                            ~
                        </Label>
                        <Col xs="5" className="datetime-custom-right" style={{ paddingRight: "0px", width: "120px" }}>
                            <FormGroup>
                                <ReactDatetime
                                    inputProps={{
                                        name: 'endDate',
                                        className: 'form-control datetime-custom text-center',
                                        value: endDate,
                                        readOnly: true,
                                    }}
                                    defaultValue={endDate}
                                    dateFormat="YYYY-MM-DD"
                                    onChange={async e => {
                                        await handleEndDateChange(e);
                                    }}
                                    locale="ko"
                                    isValidDate={current => {
                                        return yesterday ? current.isBefore(moment().subtract(1, 'days')) : current.isBefore(moment());
                                    }}
                                    timeFormat={false}
                                    closeOnSelect
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            </>
        );
    }
}

export default CustomDate;
