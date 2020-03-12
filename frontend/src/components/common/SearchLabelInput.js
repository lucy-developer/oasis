import React, { Component } from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';

class SearchLabelInput extends Component {
    render() {
        const { title, name, value, handleChange, disable } = this.props;
        return (
            <>
                <Label md="2" xs="4" className="search-label">
                    {title}
                </Label>
                <Col md="4" xs="8">
                    <FormGroup>
                        <Input readOnly={disable} name={name} type="text" value={value} onChange={handleChange} />
                    </FormGroup>
                </Col>
            </>
        );
    }
}

export default SearchLabelInput;
