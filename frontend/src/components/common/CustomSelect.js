import React, { Component } from 'react';
import Select from 'react-select';
import { Col, FormGroup, Label } from 'reactstrap';
import { observer } from 'mobx-react';

@observer
class CustomSelect extends Component {
    render() {
        const {name, data, value, handleChange, disable } = this.props;
        return (
            <>
                <Col md="4" xs="8">
                    <FormGroup className={disable ? 'select-disabled' : 'select-able'}>
                        <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            isDisabled={disable}
                            name={name}
                            value={value}
                            onChange={handleChange}
                            placeholder=""
                            // options={data}
                            options={
                                data.map((t) => {
                                    return {
                                        value: t.id,
                                        label: t.label
                                    };
                                })
                            }
                        />
                    </FormGroup>
                </Col>
            </>
        )
    }
}

export default CustomSelect;