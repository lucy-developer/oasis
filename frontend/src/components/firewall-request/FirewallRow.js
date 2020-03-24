import React, { Component } from 'react';
import { Button } from "reactstrap";
import { observer } from 'mobx-react';
import CustomSelect from '../common/CustomSelect';
import CustomInput from '../common/CustomInput';
import CustomDate from "../common/CustomDate";

@observer
class FirewallRow extends Component {
    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         items: [],
    //     };
    //     const { store } = this.props;
    // }
    //
    // componentDidMount() {
    // }

    // handleSrcType = e => {
    //     this.setState({ src_type: e.value });
    // };
    //
    // handleSrcIp = e => {
    //     this.setState({ src_ip: e.target.value });
    // };

    saving = async () => {
        const { store } = this.props;

        // const data = {
        //     src_ip : this.state.src_ip,
        //     src_type : this.state.src_type
        // };
        //
        // store.handleQsetPush(data)
    };


    render() {
        const { store } = this.props;
        return (
            <tr className="text-center">
                <td>
                    <CustomSelect
                        // title=""
                        name="srcAddressType"
                        value={store.addressTypeId}
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
                        value={store.addressTypeId}
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
                        value={store.protocolTypeId}
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
                        value={store.ruleActionTypeId}
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
                        <i className="fa   fa-remove" />
                    </Button>

                </td>
            </tr>
        );
    }
}

export default FirewallRow;