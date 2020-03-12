import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';

@observer
class ClientManagementDetailTableBody extends Component {
    renderTableBody = () => {
        const { store } = this.props;
        const { items } = store.detailClientData;
        if (items) {
            return items.map((row, key) => {
                return (
                    <tr onClick={() => store.toggleDetailInfoModal(row.id)} className="text-center" key={row.id}>
                        <td>{`방문 ${key + 1}`}</td>
                        <td>{row.organizer.name}</td>
                        <td>{row.notes}</td>
                        <td>{row.checkedIn ? row.checkedIn.location.place.address : ''}</td>
                        <td>{row.checkedIn ? moment(row.checkedIn.datetime).format('YYYY.MM.DD dddd HH:mm:SS') : '-'}</td>
                        <td>{row.status === 'SCHEDULED' ? '미방문' : '방문'}</td>
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

export default ClientManagementDetailTableBody;
