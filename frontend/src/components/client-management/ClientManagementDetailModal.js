import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal } from 'reactstrap';
import { observer } from 'mobx-react';
import moment from 'moment';
import ClientStaticDetailMaps from './ClientStaticDetailMaps';

@observer
class ClientManagementDetailModal extends Component {
    render() {
        const { store } = this.props;
        return (
            <>
                <Modal className="client-management-modal" isOpen={store.detailInfoModal} toggle={store.toggleDetailInfoModal}>
                    <div className="modal-header justify-content-center">
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={store.toggleDetailInfoModal}
                        >
                            <i className="nc-icon nc-simple-remove" />
                        </button>
                        <h4 className="title title-up">방문 기록 정보</h4>
                    </div>
                    <div className="modal-body">
                        <Form>
                            <Label>방문자</Label>
                            <FormGroup>
                                <Input
                                    name="name"
                                    type="text"
                                    value={store.detailInfo && store.detailInfo.organizer ? store.detailInfo.organizer.name : ''}
                                    readOnly
                                />
                            </FormGroup>
                            <Label>방문 일시</Label>
                            <FormGroup>
                                <Input
                                    type="text"
                                    value={
                                        store.detailInfo && store.detailInfo.checkedIn
                                            ? moment(store.detailInfo.checkedIn.datetime).format('YYYY.MM.DD dddd HH:mm:SS')
                                            : '-'
                                    }
                                    readOnly
                                />
                            </FormGroup>
                            <Label>고객사명</Label>
                            <FormGroup>
                                <Input type="text" value={store.detailData ? store.detailData.name : ''} readOnly />
                            </FormGroup>
                            <Label>방문지 위치</Label>
                            <FormGroup>
                                <Input
                                    type="text"
                                    value={
                                        store.detailInfo && store.detailInfo.checkedIn
                                            ? store.detailInfo.checkedIn.location.place.address
                                            : ''
                                    }
                                    readOnly
                                />
                            </FormGroup>
                            {store.detailInfo && store.detailInfo.checkedIn && <ClientStaticDetailMaps store={store} />}
                            <Label>방문 내용</Label>
                            <FormGroup>
                                <Input
                                    name="notes"
                                    type="textarea"
                                    onChange={store.handleModalDetailInfoChange}
                                    value={store.detailInfo && store.detailInfo.notes ? store.detailInfo.notes : ''}
                                />
                            </FormGroup>
                        </Form>
                    </div>
                    <div className="modal-footer">
                        <div className="left-side">
                            <Button className="btn-link" type="button" onClick={store.toggleDetailInfoModal}>
                                닫기
                            </Button>
                        </div>
                        <div className="divider" />
                        <div className="right-side">
                            <Button className="btn-link" color="default" type="button" onClick={store.detailMeetingEdit}>
                                수정
                            </Button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}

export default ClientManagementDetailModal;
