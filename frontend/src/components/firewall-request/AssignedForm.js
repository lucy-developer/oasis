import React, { Component } from 'react';
import {observer} from 'mobx-react';
import { Col, Row } from "reactstrap";
import AssignedRow from "./AssignedRow";

@observer
class AssignedForm extends Component {
    constructor(props) {
        super(props);
        this.renderFormBody = this.renderFormBody.bind(this);
    }

    appendRow = () => {
        const { store } = this.props;
        // eslint-disable-next-line radix
        store.handleAssignRowsChange(parseInt(store.assignRows)+1);
    };

    renderFormBody = () => {
        const { store } = this.props;
        const table = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < store.assignRows; i++) {
         table.push(<AssignedRow store={store} appendRow={this.appendRow} />);
        }
        return table;
    };

    render() {
        return (
            <>
                <Row>
                    <Col>
                        <h3>
                            결재자 정보
                        </h3>
                    </Col>
                </Row>
                {this.renderFormBody()}
            </>
        )
    }
}

export default AssignedForm;