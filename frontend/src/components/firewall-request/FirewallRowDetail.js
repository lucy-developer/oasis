import React, { Component } from 'react';
import { Button } from "reactstrap";
import { observer } from 'mobx-react';
import CustomSelect from '../common/CustomSelect';
import CustomInput from '../common/CustomInput';
import CustomDate from "../common/CustomDate";

@observer
class FirewallRowDetail extends Component {

    render() {
        const { store } = this.props;

        return (
            <>
                <tr className="text-center">
                    <td style={{paddingLeft:"22px"}}>
                        <input className="detail-row-input" type="text" name="srcAddressType" value={store.qdata.src_type} disabled />
                    </td>
                    <td>
                        <CustomInput type="text" name="srcAddress" value={store.qdata.src_address} disabled={store.qdata.src_address} />
                    </td>
                    <td style={{paddingLeft:"22px"}}>
                        <input className="detail-row-input" type="text" name="dstAddressType" value={store.qdata.dest_type} disabled={store.qdata.dest_type} />
                    </td>
                    <td>
                        <CustomInput type="text" name="dstAddress" value={store.qdata.dest_address} disabled={store.qdata.dest_address} />
                    </td>
                    <td style={{paddingLeft:"22px"}}>
                        <input className="detail-row-input" type="text" name="protocolType" value={store.qdata.protocol} disabled={store.qdata.protocol} />
                    </td>
                    <td>
                        <div style={{width: "75px"}}>
                            <CustomInput type="text" name="port" value={store.qdata.port} disabled={store.qdata.port} />
                        </div>
                    </td>
                    <td style={{paddingLeft:"22px"}}>
                        <input className="detail-row-input" type="text" name="protocolType" value={store.qdata.rule_action} disabled={store.qdata.rule_action} />
                    </td>
                    <td>
                        <CustomDate
                            handlePrevDateChange={store.handlePrevDateChange}
                            handleEndDateChange={store.handleEndDateChange}
                            prevDate={store.qdata.start_date}
                            endDate={store.qdata.end_date}
                            disabled
                            yesterday
                        />
                    </td>
                    <td>
                        <CustomInput type="text" name="protocolType" value={store.qdata.comment} disabled={store.qdata.comment} />
                    </td>
                </tr>
            </>
        );
    }
}

export default FirewallRowDetail;