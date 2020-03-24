import React, { Component } from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';

class CustomInput extends Component {
    render() {
        const {title, name, value, handleChange, disable} = this.props;
        return (
            <>
                <FormGroup>
                    <Input name={name} type="text" value={value} onChange={handleChange} />
                </FormGroup>
            </>
        )
    }
}

export default CustomInput;