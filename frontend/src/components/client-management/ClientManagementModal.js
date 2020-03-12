import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal } from 'reactstrap';
import { observer } from 'mobx-react';
import ClientDynamicMaps from './ClientDynamicMaps';

@observer
class ClientManagementModal extends Component {
    render() {
        const { store } = this.props;
        return (
            <>
                <Modal className="client-management-modal" isOpen={store.infoModal} toggle={store.toggleInfoModal}>
                    <div className="modal-header justify-content-center">
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={store.toggleInfoModal}
                        >
                            <i className="nc-icon nc-simple-remove" />
                        </button>
                        <h4 className="title title-up">고객사 정보</h4>
                    </div>
                    <div className="modal-body">
                        <Form>
                            <Label>고객사명</Label>
                            <FormGroup>
                                <Input
                                    name="name"
                                    type="text"
                                    onChange={store.handleModalInfoChange}
                                    value={store.info ? store.info.name : ''}
                                />
                            </FormGroup>
                            <Label>고객사 위치</Label>
                            <FormGroup>
                                <Input
                                    name="address"
                                    type="text"
                                    onChange={store.handleModalInfoPlaceChange}
                                    value={store.info && store.info.place ? store.info.place.address : ''}
                                    readOnly
                                />
                            </FormGroup>
                            <ClientDynamicMaps store={store} />
                            <Label>메모</Label>
                            <FormGroup>
                                <Input
                                    name="notes"
                                    type="textarea"
                                    onChange={store.handleModalInfoChange}
                                    value={store.info && store.info.notes ? store.info.notes : ''}
                                />
                            </FormGroup>
                            <Label>방문 사원명</Label>
                            <FormGroup>
                                <Input
                                    name="name"
                                    type="text"
                                    onChange={store.handleModalInfoContactorChange}
                                    value={store.info && store.info.lastMeetingOrganizer ? store.info.lastMeetingOrganizer.name : ''}
                                    readOnly
                                />
                            </FormGroup>
                            <Label>사원 조직명</Label>
                            <FormGroup>
                                <Input
                                    type="text"
                                    onChange={store.handleModalInfoChange}
                                    value={store.info && store.info.lastMeetingOrganizer ? store.info.lastMeetingOrganizer.team.name : ''}
                                    readOnly
                                />
                            </FormGroup>
                        </Form>
                    </div>
                    <div className="modal-footer">
                        <div className="left-side">
                            <Button className="btn-link" type="button" onClick={store.delete}>
                                삭제
                            </Button>
                        </div>
                        <div className="divider" />
                        <div className="right-side">
                            <Button className="btn-link" color="default" type="button" onClick={store.edit}>
                                수정
                            </Button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}

export default ClientManagementModal;
