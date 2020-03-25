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
            table.push(<div>{store.message}</div>);
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
        const { store } = this.props;
        const qdatas = store.qdatas.map(
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
            <>
            {this.renderTableBody()}
            </>
    );

    }
}

export default FirewallRequestTableBody;