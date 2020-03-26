import React, { Component } from 'react';
import {Button, CardLink} from 'reactstrap';
import {observer} from 'mobx-react';
import FirewallRow from "./FirewallRow";
import FirewallRowDetail from "./FirewallRowDetail";
import CustomInput from "../common/CustomInput";
import CustomDate from "../common/CustomDate";
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
            table.push(<FirewallRow store={store} />);
            table.push(
                <div>
                    {store.message}
                </div>
            );
        }
        return table;
    };

    // eslint-disable-next-line consistent-return
    renderRowDetail = () => {
        const { store } = this.props;

        if (store.qdatas) {
            return store.qdatas.map((row, key) => {
                return (
                    <FirewallRowDetail
                        srcType={row.src_type}
                        srcAddress={row.src_address}
                       destType={row.dest_type}
                       destAddress={row.dest_address}
                       protocol={row.protocol}
                       port={row.port}
                       ruleAction={row.rule_action}
                       startDate={row.start_date}
                       endDate={row.end_date}
                       comment={row.comment}
                    />
                )
            })
        }
    };

    render() {
        const { store } = this.props;

        return (
            <>
                {this.renderTableBody()}
                {this.renderRowDetail()}
            </>
    );

    }
}

export default FirewallRequestTableBody;