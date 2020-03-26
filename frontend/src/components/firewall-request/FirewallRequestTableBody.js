import React, { Component } from 'react';
import {Button, CardLink} from 'reactstrap';
import {observer} from 'mobx-react';
import FirewallRow from "./FirewallRow";
import FirewallRowDetail from "./FirewallRowDetail";
/*import CustomInput from "../common/CustomInput";
import CustomDate from "../common/CustomDate";
import CustomSelect from "../common/CustomSelect";
import AssignedRow from "./AssignedRow";*/

@observer
class FirewallRequestTableBody extends Component {
    constructor(props) {
        super(props);

        this.state ={
            src_type: '',
            src_address: '',
            dest_type: '',
            dest_address: '',
            protocol: '',
            port: '',
            rule_action: '',
            start_date: '',
            end_date: '',
            comment: '',
            status: '',
            message : '',
        };

        this.renderTableBody = this.renderTableBody.bind(this);
    }

    renderTableBody = () => {
        const { store } = this.props;

        const table = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < store.rows; i++) {
            // row.push(<FirewallRow />)
            table.push(<FirewallRow store={store} />);
            table.push(
                <div>
                    {store.message}
                </div>
            );
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

        const qdatasTable = store.qdatas.map(({row}) => (
            <FirewallRowDetail store={store} />
        ));

        const dateStatus = store.qdata.status;
        /*let rowDetail = null;
        if (dateStatus === "1") {
            rowDetail = <FirewallRowDetail store={store} />;
        }*/

        return (
            <>
                {this.renderTableBody()}
                {qdatasTable}
            </>
    );

    }
}

export default FirewallRequestTableBody;