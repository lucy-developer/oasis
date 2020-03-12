import React, { Component } from 'react';
import { Button, Col, Row, Modal } from 'reactstrap';
import { observer } from 'mobx-react';

@observer
class AlertModal extends Component {
    render() {
        const { store } = this.props;
        return (
            <Modal className="modal-sm" isOpen={store.alertModal} toggle={() => store.toggleAlertModal('')}>
                <div className="modal-body justify-content-center text-center">
                    <Row>
                        <Col md="12">
                            {store.alertMessage
                                ? store.alertMessage.split('\n').map((line, index) => {
                                    return (
                                        <div key={index}>
                                            {line}
                                            <br />
                                        </div>
                                    );
                                })
                                : ''}
                        </Col>
                    </Row>
                </div>
                <div className="modal-footer justify-content-center">
                    <Button
                        data-dismiss="modal"
                        className="btn-round"
                        color="default"
                        outline
                        type="button"
                        onClick={() => store.toggleAlertModal('')}
                    >
                        확인
                    </Button>
                </div>
            </Modal>
        );
    }
}

export default AlertModal;
