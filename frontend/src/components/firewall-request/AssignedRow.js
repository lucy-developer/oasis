import React, { Component } from 'react';
import { Button, FormGroup, Label, Form, Input, Row, Col } from "reactstrap";
import { observer } from 'mobx-react';
import plus from "../../assets/img/button_plus.png";
import CustomInput from "../common/CustomInput";

@observer
class AssignedRow extends Component {
    constructor(props) {
        super();
        this.state = {
            input: '',
            assignees: [],
        }
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value // input 의 다음 바뀔 값
        });
    }

    handleCreate = () => {
        const { input, assignees } = this.state;
        const { store } = this.props;
        this.setState({
            input: '',
            assignees: assignees.concat({
                // eslint-disable-next-line no-plusplus
                id: this.id++,
                text: input,
                checked: false
            })
        });
        store.createAssigns(assignees);
    };

    handleRemove = (id) => {
        const { assignees } = this.state;
        this.setState({
            assignees: assignees.filter(assignee => assignee.id !== id)
        });
    };

    render() {
        const { store , appendRow, removeRow } = this.props;
        const { input, assignees } = this.state;
        const todoList = assignees.map(
            ({id, text, checked}) => (
                // <AssigneeItem
                //     id={assignees.id}
                //     text={assignees.text}
                //     checked={assignees.checked}
                //     onRemove={this.handleRemove}
                //     key={id}
                // />
                <div>{text}</div>
            )
        );

        return (
            <div>
                <Form inline>
                    <FormGroup>
                        <Label>결재자</Label>
                        <CustomInput name="name" value={input} handleChange={this.handleChange} />
                    </FormGroup>
                    <Button onClick={this.handleCreate} text="추가" />
                </Form>
                {todoList}
            </div>
        )
    }
}

export default AssignedRow;