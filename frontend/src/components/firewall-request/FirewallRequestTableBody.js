import React, { Component } from 'react';
import { CardLink } from 'reactstrap';
import {observer} from 'mobx-react';
import FirewallRow from "./FirewallRow";

@observer
class FirewallRequestTableBody extends Component {
    constructor(props) {
        super(props);
        this.renderTableBody = this.renderTableBody.bind(this);
    }

    renderTableBody = () => {
        const { store } = this.props;
        const table = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < store.rows; i++) {
            // row.push(<FirewallRow />)
            table.push(<FirewallRow store={store} />);
        }

        // eslint-disable-next-line no-undef
        // const { items } = [{'aaa', 'bbb'}, bbb, ccc, ddd, eee, fff};
        // if (items) {
        //     return items.map((row, key) => {
            // });
        // }
        return table;
    };

    render() {
        return (
            <>
            {this.renderTableBody()}
            </>
    );

    }
}

export default FirewallRequestTableBody;