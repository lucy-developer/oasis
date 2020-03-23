import React, { Component } from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';

class CustomInput extends Component {
    render() {
        const {title, name, value, handleChange, disable} = this.props;
        return (
            <>
                {/*<Col md="4" xs="8">*/}
                    <FormGroup>
                        <Input readOnly={disable} name={name} type="text" value={value} onChange={handleChange} />
                    </FormGroup>
                {/*</Col>*/}
            </>
        )
    }
}

export default CustomInput;