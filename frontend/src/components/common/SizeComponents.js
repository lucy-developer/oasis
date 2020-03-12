import React, { Component } from 'react';
import { Input, Label } from 'reactstrap';
import { observer } from 'mobx-react';

@observer
class SizeComponents extends Component {
    render() {
        const { store } = this.props;
        return (
            <div className="page-div">
                <Label className="page-label">페이지 당</Label>
                <Input
                    name="size"
                    bsSize="sm"
                    type="select"
                    value={store.size}
                    onChange={e => {
                        store.handleChange(e);
                        store.search();
                    }}
                >
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                </Input>
                <Label className="page-label">개씩 보기</Label>
            </div>
        );
    }
}

export default SizeComponents;
