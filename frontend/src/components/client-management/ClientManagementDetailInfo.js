import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Table } from 'reactstrap';
import phoneFormatter from '../../utils/PhoneFormater';

@observer
class ClientManagementDetailInfo extends Component {
    render() {
        const { store } = this.props;
        const { detailData } = store;
        return (
            <>
                <h4>{detailData.name}</h4>
                <Table bordered>
                    <tbody className="table-body">
                    <tr>
                        <th className="table-header text-center">주소</th>
                        <td>{detailData.place ? detailData.place.address : ''}</td>
                    </tr>
                    <tr>
                        <th className="table-header text-center">담당자 명</th>
                        <td>{detailData.contactor ? detailData.contactor.name : ''}</td>
                    </tr>
                    <tr>
                        <th className="table-header text-center">담당자 전화번호</th>
                        <td>{detailData.contactor ? phoneFormatter(detailData.contactor.phone.replace(/ /gi, '')) : ''}</td>
                    </tr>
                    <tr>
                        <th className="table-header text-center">담당자 E-mail</th>
                        <td>{detailData.contactor ? detailData.contactor.email : ''}</td>
                    </tr>
                    <tr>
                        <th className="table-header text-center">방문 횟수</th>
                        <td>{`${detailData.checkInCountOfCompany}회`}</td>
                    </tr>
                    </tbody>
                </Table>
            </>
        );
    }
}

export default ClientManagementDetailInfo;
