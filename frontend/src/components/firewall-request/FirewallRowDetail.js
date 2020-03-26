import React, { Component } from 'react';
import { Button } from "reactstrap";
import { observer } from 'mobx-react';
import CustomSelect from '../common/CustomSelect';
import CustomInput from '../common/CustomInput';
import CustomDate from "../common/CustomDate";

@observer
class FirewallRowDetail extends Component {

    render() {
        const { srcType, srcAddress, destType, destAddress, protocol, port, ruleAction, startDate, endDate, comment} = this.props;
            return (
                <tr className="text-center">
                    <td style={{paddingLeft: "22px"}}>
                        <input
                            className="detail-row-input"
                            type="text"
                            name="srcAddressType"
                            value={srcType}
                            disabled
                        />
                    </td>
                    <td>
                        <CustomInput
                            type="text"
                            name="srcAddress"
                            value={srcAddress}
                            disabled
                        />
                    </td>
                    <td style={{paddingLeft: "22px"}}>
                        <input
                            className="detail-row-input"
                            type="text"
                            name="dstAddressType"
                            value={destType}
                            disabled
                        />
                    </td>
                    <td>
                        <CustomInput
                            type="text"
                            name="dstAddress"
                            value={destAddress}
                            disabled
                        />
                    </td>
                    <td style={{paddingLeft: "22px"}}>
                        <input
                            className="detail-row-input"
                            type="text"
                            name="protocolType"
                            value={protocol}
                               disabled
                        />
                    </td>
                    <td>
                        <div style={{width: "75px"}}>
                            <CustomInput type="text" name="port" value={port} disabled />
                        </div>
                    </td>
                    <td style={{paddingLeft: "22px"}}>
                        <input
                            className="detail-row-input"
                            type="text"
                            name="protocolType"
                            value={ruleAction}
                               disabled
                        />
                    </td>
                    <td>
                        <CustomDate
                            prevDate={startDate}
                            endDate={endDate}
                            disabled
                        />
                    </td>
                    <td>
                        <CustomInput type="text" name="protocolType" value={comment} disabled />
                    </td>
                </tr>
            )
    };
}

export default FirewallRowDetail;