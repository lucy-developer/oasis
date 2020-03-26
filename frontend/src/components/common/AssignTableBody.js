import React, { Component } from 'react';
import {Button, CardLink} from 'reactstrap';
import {observer} from 'mobx-react';
import CustomSelect from "./CustomSelect";
import CustomInput from "./CustomInput";

@observer
class AssignTableBody extends Component {
    renderTableBody = () => {
        const { store } = this.props;
        return (
            <tr className="text-center">
                <td>{ }</td>
                <td>
                    <CustomSelect
                        // title=""
                        name="assighType"
                        data={store.assignType}
                        handleChange={e=> store.handleAssignChange(e, 'assignType', 'TYPE')}
                    />
                </td>
                <td>
                    <CustomInput name="assignName" handleChange={e=> store.handleAssignChange(e, 'user_id', 'TEXT')} />
                </td>
                <td style={{padding:"8px 15px"}}>
                    <Button
                        onClick={e => store.handleAddAssignees(e)}
                        className="btn-icon btn-round"
                        color="warning"
                        size="sm"
                    >
                        <i className="fa  fa-check" />
                    </Button>
                </td>
            </tr>
        )
    };

    // eslint-disable-next-line consistent-return
    renderAssignList = () => {
        const { store } = this.props;

        if (store.assignees) {
            return store.assignees.map((row, key) => {
                return (
                    <tr>
                        <td>{row.order}</td>
                        <td>{ }</td>
                        <td>{row.user_id}</td>
                        <td>{ }</td>
                    </tr>
                )}
            )
        }
    };

    render() {
        return (
            <>
                {this.renderTableBody()}
                {this.renderAssignList()}
            </>
        )
    }
}

export default AssignTableBody;