import React, { Component } from 'react';
import Select from 'react-select';
import { Col, FormGroup, Label } from 'reactstrap';
import { observer } from 'mobx-react';

@observer
class SearchLabelSelect extends Component {
    render() {
        const { title, name, data, value, handleChange, disable } = this.props;
        return (
            <>
                <Label md="2" xs="4" className="search-label">
                    {title}
                </Label>
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
                            options={
                                data.items
                                    ? [{ label: '전체', value: '' }].concat(
                                    data.items.map(row => {
                                        return { label: row.name, value: row.id };
                                    }),
                                    )
                                    : []
                            }
                        />
                    </FormGroup>
                </Col>
            </>
        );
    }
}

export default SearchLabelSelect;
