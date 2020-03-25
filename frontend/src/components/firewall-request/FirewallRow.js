import React, { Component } from 'react';
import { Button } from "reactstrap";
import { observer } from 'mobx-react';
import CustomSelect from '../common/CustomSelect';
import CustomInput from '../common/CustomInput';
import CustomDate from "../common/CustomDate";

@observer
class FirewallRow extends Component {
    // eslint-disable-next-line consistent-return
    renderData = () => {
        const { store } = this.props;
        if (store.qdatas) {
            return store.qdatas.map((row, key) => {
                return (
                    <div>
                        <tr className="text-center">
                            <td>
                                <CustomSelect
                                    // title=""
                                    name="srcAddressType"
                                    value={row.src_type}
                                    data={store.addressType}
                                    handleChange={e => store.handleChange(e, 'srcType', 'TYPE')}
                                />
                            </td>
                            <td>
                                <CustomInput name="srcAddress" value={row.src_address} handleChange={e => store.handleChange(e, 'srcIP', 'IP')}  />
                            </td>
                            <td>
                                <CustomSelect
                                    name="dstAddressType"
                                    value={row.dest_type}
                                    data={store.addressType}
                                    handleChange={e => store.handleChange(e, 'dstType', 'TYPE')}
                                />
                            </td>
                            <td>
                                <CustomInput name="dstAddress" value={row.dest_address} handleChange={e => store.handleChange(e, 'dstIP', 'IP')} />
                            </td>
                            <td>
                                <CustomSelect
                                    name="protocolType"
                                    value={row.protocol}
                                    data={store.protocolType}
                                    handleChange={e => store.handleChange(e, 'protocol', 'TYPE')}
                                />
                            </td>
                            <td>
                                <CustomInput name="port" value={row.port} handleChange={e => store.handleChange(e, 'port', 'TEXT')} />
                            </td>
                            <td>
                                <CustomSelect
                                    name="protocolType"
                                    value={row.rule_action}
                                    data={store.ruleActionType}
                                    handleChange={e => store.handleChange(e, 'ruleAction', 'TYPE')}
                                />
                            </td>
                            <td>
                                <CustomDate
                                    handlePrevDateChange={store.handlePrevDateChange}
                                    handleEndDateChange={store.handleEndDateChange}
                                    prevDate={row.start_date}
                                    endDate={row.end_date}
                                    yesterday
                                />
                            </td>
                            <td>
                                <CustomInput name="comment" value={row.comment} handleChange={e => store.handleChange(e, 'comment', 'TEXT')} />
                            </td>
                            <td>
                                if (row.status === `0`)
                                <Button
                                    onClick={e => store.handleFireRuleCheck(e)}
                                    className="btn-icon btn-round"
                                    color="warning"
                                    size="sm"
                                >
                                    <i className="fa fa-edit" />
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
                    </div>
                )
            })
        }
    };

    render() {
        const { store } = this.props;
<<<<<<< HEAD
        this.renderData();
        return (
                <tr className="text-center">
                    <td>
                        <CustomSelect
                            // title=""
                            name="srcAddressType"
                            value={store.srcType}
                            data={store.addressType}
                            handleChange={e=> store.handleChange(e, 'srcType', 'TYPE')}
                        />
                    </td>
                    <td>
                        <CustomInput name="srcAddress" handleChange={e=> store.handleChange(e, 'srcIP', 'IP')} />
                    </td>
                    <td>
                        <CustomSelect
                            name="dstAddressType"
                            value={store.dstType}
                            data={store.addressType}
                            handleChange={e=> store.handleChange(e, 'dstType', 'TYPE')}
                        />
                    </td>
                    <td>
                        <CustomInput name="dstAddress" handleChange={e=> store.handleChange(e, 'dstIP', 'IP')} />
                    </td>
                    <td>
                        <CustomSelect
                            name="protocolType"
                            value={store.protocol}
                            data={store.protocolType}
                            handleChange={e=> store.handleChange(e, 'protocol', 'TYPE')}
                        />
                    </td>
                    <td>
                        <CustomInput name="port" handleChange={e=> store.handleChange(e, 'port', 'TEXT')} />
                    </td>
                    <td>
                        <CustomSelect
                            name="protocolType"
                            value={store.ruleAction}
                            data={store.ruleActionType}
                            handleChange={e=> store.handleChange(e, 'ruleAction', 'TYPE')}
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
                    <td>
=======

        return (
            <tr className="text-center">
                <td>
                    <CustomSelect
                        // title=""
                        name="srcAddressType"
                        value={store.srcType}
                        data={store.addressType}
                        handleChange={e=> store.handleChange(e, 'srcType', 'TYPE')}
                    />
                </td>
                <td>
                    <CustomInput name="srcAddress" handleChange={e=> store.handleChange(e, 'srcIP', 'IP')} />
                </td>
                <td>
                    <CustomSelect
                        name="dstAddressType"
                        value={store.dstType}
                        data={store.addressType}
                        handleChange={e=> store.handleChange(e, 'dstType', 'TYPE')}
                    />
                </td>
                <td>
                    <CustomInput name="dstAddress" handleChange={e=> store.handleChange(e, 'dstIP', 'IP')} />
                </td>
                <td>
                    <CustomSelect
                        name="protocolType"
                        value={store.protocol}
                        data={store.protocolType}
                        handleChange={e=> store.handleChange(e, 'protocol', 'TYPE')}
                    />
                </td>
                <td>
                    <CustomInput name="port" className="inputPort" handleChange={e=> store.handleChange(e, 'port', 'TEXT')} />
                </td>
                <td>
                    <CustomSelect
                        name="protocolType"
                        value={store.ruleAction}
                        data={store.ruleActionType}
                        style={{ width: "150px" }}
                        handleChange={e=> store.handleChange(e, 'ruleAction', 'TYPE')}
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
                <td>
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
>>>>>>> 7383de9746b734a9806fbad0df16305845c807fa

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