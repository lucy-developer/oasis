import React, { Component } from 'react';
import { observer } from 'mobx-react';
import CustomSelect from '../common/CustomSelect';
import CustomInput from '../common/CustomInput';

@observer
class FirewallRow extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         // eslint-disable-next-line react/no-unused-state
    //         is_active: true
    //     };
    //     const { store } = this.props;
    // }

    render() {
        const { store } = this.props;
        return (
            <tr className="text-center">
                <td>
                    <CustomSelect
                        // title=""
                        name="srcAddressType"
                        // disable
                        value={store.addressTypeId}
                        // defaultValue={{ label: "Select...", value: 0 }}
                        data={store.addressType}
                        handleChange={store.handleSelectChange}
                    />
                </td>
                <td>
                    {/*<CardLink onClick={() => store.handleClickDetail(row.id)}>{row.name}</CardLink>*/}
                    {/*<input name="startAddress" type="number" className="address" />*/}
                    <CustomInput name="srcAddress" handleChange={store.handleChange} />
                </td>
                <td>
                    {/*onClick={() => store.toggleInfoModal(row.id)} role="presentation">*/}
                    <CustomSelect
                        // title=""
                        name="dstAddressType"
                        // disable
                        value={store.addressTypeId}
                        // defaultValue={{ label: "Select...", value: 0 }}
                        data={store.addressType}
                        handleChange={store.handleSelectChange}
                    />
                </td>
                <td>
                    {/*onClick={() => store.toggleInfoModal(row.id)} role="presentation">*/}
                    {/*{row.notes}*/}
                    {/*<input name="arrivalAddress" type="number" className="address" />*/}
                    <CustomInput name="dstAddress" handleChange={store.handleChange} />
                </td>
                <td>
                    {/*<select name="protocol" value="TCP">*/}
                    {/*    <option selected>TCP</option>*/}
                    {/*    <option value="UDP">UDP</option>*/}
                    {/*    <option value="ICMP">ICMP</option>*/}
                    {/*    <option value="IP">IP</option>*/}
                    {/*</select>*/}
                    <CustomSelect
                        // title=""
                        name="protocolType"
                        // disable
                        value={store.protocolTypeId}
                        // defaultValue={{ label: "Select...", value: 0 }}
                        data={store.protocolType}
                        handleChange={store.handleSelectChange}
                    />
                </td>
                {/*{row.lastMeetingOrganizer ? (*/}
                {/*    <td onClick={() => store.toggleInfoModal(row.id)} role="presentation">*/}
                {/*        {row.lastMeetingOrganizer.name}*/}
                {/*    </td>*/}
                {/*) : (*/}
                {/*    <td onClick={() => store.toggleInfoModal(row.id)} role="presentation">*/}
                {/*        -*/}
                {/*    </td>*/}
                {/*)}*/}
                {/*{row.lastMeetingOrganizer ? (*/}
                {/*    <td onClick={() => store.toggleInfoModal(row.id)} role="presentation">*/}
                {/*        {row.lastMeetingOrganizer.team.name}*/}
                {/*    </td>*/}
                {/*) : (*/}
                {/*    <td onClick={() => store.toggleInfoModal(row.id)} role="presentation">*/}
                {/*        -*/}
                {/*    </td>*/}
                {/*)}*/}
                {/*<td onClick={() => store.toggleInfoModal(row.id)} role="presentation">*/}
                {/*    {`${row.checkInCountOfCompany}회`}*/}
                {/*</td>*/}
            </tr>
        );
    }
}

export default FirewallRow;