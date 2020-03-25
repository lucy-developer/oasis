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

        const detailInputSelect = {
            width:"105px",
        };

        const detailInput = {
            paddingLeft: "15px",
            paddingRight: "15px"
        };

        return (
            <div style={{paddingLeft: "15px"}}>
                <tr className="text-center">
                    <td style={{width:"105px"}}>
                        <CustomInput type="text" name="srcAddressType" value={store.qdata.src_type} disabled={store.qdata.src_type} />
                    </td>
                    <td style={detailInput}>
                        <CustomInput type="text" name="srcAddress" value={store.qdata.src_address} disabled={store.qdata.src_address} />
                    </td>
                    <td style={detailInputSelect}>
                        <CustomInput type="text" name="dstAddressType" value={store.qdata.dest_type} disabled={store.qdata.dest_type} />
                    </td>
                    <td style={detailInput}>
                        <CustomInput type="text" name="dstAddress" value={store.qdata.dest_address} disabled={store.qdata.dest_address} />
                    </td>
                    <td style={detailInputSelect}>
                        <CustomInput type="text" name="protocolType" value={store.qdata.protocol} disabled={store.qdata.protocol} />
                    </td>
                    <td style={detailInput}>
                        <CustomInput type="text" name="port" value={store.qdata.port} disabled={store.qdata.port} />
                    </td>
                    <td style={detailInputSelect}>
                        <CustomInput type="text" name="protocolType" value={store.qdata.rule_action} disabled={store.qdata.rule_action} />
                    </td>
                    <td style={{paddingLeft: "15px"}}>
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
            </div>
        );
    }
}

export default FirewallRowDetail;