import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';

@observer
class FirewallSearchDetailTableBody extends Component {

    renderTableBody = () => {
        const { store } = this.props;
        const { data } = store.detailData;
        if (data) {
            return data.details.map((row, key) => {
                return (
                    <tr onClick={() => store.toggleDetailInfoModal(row.id)} className="text-center" key={row.id}>
                        <td>{`방문 ${key + 1}`}</td>
                        <td>{row.src_type}</td>
                        <td>{row.src_address}</td>
                        {/*<td>{row.checkedIn ? row.checkedIn.location.place.address : ''}</td>*/}
                        {/*<td>{row.checkedIn ? moment(row.checkedIn.datetime).format('YYYY.MM.DD dddd HH:mm:SS') : '-'}</td>*/}
                        {/*<td>{row.status === 'SCHEDULED' ? '미방문' : '방문'}</td>*/}
                        <td>{row.dest_type}</td>
                        <td>{row.dest_address}</td>
                        <td>{row.port}</td>
                    </tr>
                );
            });
        }
        return null;
    };

    render() {
        return <>{this.renderTableBody()}</>;
    }
}

export default FirewallSearchDetailTableBody;