import React, { Component } from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';

class SearchLabelInput extends Component {
    render() {
        const { title, name, value, handleChange, readOnly, state, text } = this.props;
        return (
            <>
                <Label xs="3" className="my-page-label text-right">
                    {title}
                </Label>
                <Col xs="6">
                    <FormGroup className={`has-label ${state}`}>
                        <Input
                            style={{ padding: '10px' }}
                            className="text-center"
                            name={name}
                            type="text"
                            value={value}
                            onChange={handleChange}
                            readOnly={readOnly}
                        />
                    </FormGroup>
                    {state === 'has-danger' ? <Label className="text-danger">{text}</Label> : null}
                </Col>
                <Col xs="3" />
            </>
        );
    }
}

export default SearchLabelInput;