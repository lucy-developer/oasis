import React, { Component } from 'react';
import { Button } from "reactstrap";
import { observer } from 'mobx-react';
import CustomSelect from '../common/CustomSelect';
import CustomInput from '../common/CustomInput';
import CustomDate from "../common/CustomDate";

@observer
class FirewallRow extends Component {

    render() {
        const { store } = this.props;
        // this.renderData();
        return (
            <tr className="text-center">
                <td>
                    <CustomSelect
                        // title=""
                        name="srcAddressType"
                        value={store.srcType}
                        data={store.addressType}
                        handleChange={e=> store.handleChange(e, 'src_type', 'TYPE')}
                    />
                </td>
                <td>
                    <CustomInput name="srcAddress" handleChange={e=> store.handleChange(e, 'src_address', 'IP')} />
                </td>
                <td>
                    <CustomSelect
                        name="dstAddressType"
                        value={store.dstType}
                        data={store.addressType}
                        handleChange={e=> store.handleChange(e, 'dest_type', 'TYPE')}
                    />
                </td>
                <td>
                    <CustomInput name="dstAddress" handleChange={e=> store.handleChange(e, 'dest_address', 'IP')} />
                </td>
                <td>
                    <CustomSelect
                        name="protocolType"
                        value={store.protocol}
                        data={store.protocolType}
                        handleChange={e=> store.handleChange(e, 'protocol', 'TYPE')}
                    />
                </td>
                <td style={{width: "75px"}}>
                    <CustomInput name="port" handleChange={e=> store.handleChange(e, 'port', 'NUMBER')} />
                </td>
                <td>
                    <CustomSelect
                        name="protocolType"
                        value={store.ruleAction}
                        data={store.ruleActionType}
                        handleChange={e=> store.handleChange(e, 'rule_action', 'TYPE')}
                    />
                </td>
                <td>
                    <CustomDate
                        handlePrevDateChange={store.handlePrevDateChange}
                        handleEndDateChange={store.handleEndDateChange}
                        prevDate={store.startDate}
                        endDate={store.endDate}
                        yesterday
                    />
                </td>
                <td>
                    <CustomInput name="comment" handleChange={e=> store.handleChange(e, 'comment', 'TEXT')} />
                </td>
                <td style={{padding:"8px 15px"}}>
                    <Button
                        onClick={e => store.handleFireRuleCheck(e)}
                        className="btn-icon btn-round"
                        color="warning"
                        size="sm"
                    >
                        <i className="fa  fa-check" />
                    </Button>
                    <Button
                        onClick={() => {
                            // let obj = this.state.data.find(o => o.id === key);
                            alert(
                                "You've clicked EDIT button on \n{ \nSrc_ip: " +
                                store.srcIP +
                                ", \nsrc_type: " +
                                store.srcType.id +
                                ", \ndst_ip: " +
                                store.dstIP +
                                ", \ndst_type: " +
                                store.dstType.id +
                                ", \nprotocol: " +
                                store.protocol.id +
                                "\n}."
                            );
                        }}
                        className="btn-icon btn-round"
                        color="warning"
                        size="sm"
                    >
                        <i className="fa fa-remove" />
                    </Button>
                </td>
            </tr>
        );
    }
}

export default FirewallRow;