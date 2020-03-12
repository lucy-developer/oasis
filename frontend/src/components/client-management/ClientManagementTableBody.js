import React, { Component } from 'react';
import { CardLink } from 'reactstrap';
import { observer } from 'mobx-react';

@observer
class ClientManagementTableBody extends Component {
    renderTableBody = () => {
        const { store } = this.props;
        const { items } = store.data;
        if (items) {
            return items.map((row, key) => {
                return (
                    <tr className="text-center click-available-tr" key={row.id}>
                        <td onClick={() => store.toggleInfoModal(row.id)} role="presentation">
                            {(store.page - 1) * store.size + key + 1}
                        </td>
                        <td>
                            <CardLink onClick={() => store.handleClickDetail(row.id)}>{row.name}</CardLink>
                        </td>
                        <td onClick={() => store.toggleInfoModal(row.id)} role="presentation">
                            {row.place.address}
                        </td>
                        <td onClick={() => store.toggleInfoModal(row.id)} role="presentation">
                            {row.notes}
                        </td>
                        {row.lastMeetingOrganizer ? (
                            <td onClick={() => store.toggleInfoModal(row.id)} role="presentation">
                                {row.lastMeetingOrganizer.name}
                            </td>
                        ) : (
                            <td onClick={() => store.toggleInfoModal(row.id)} role="presentation">
                                -
                            </td>
                        )}
                        {row.lastMeetingOrganizer ? (
                            <td onClick={() => store.toggleInfoModal(row.id)} role="presentation">
                                {row.lastMeetingOrganizer.team.name}
                            </td>
                        ) : (
                            <td onClick={() => store.toggleInfoModal(row.id)} role="presentation">
                                -
                            </td>
                        )}
                        <td onClick={() => store.toggleInfoModal(row.id)} role="presentation">
                            {`${row.checkInCountOfCompany}회`}
                        </td>
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

export default ClientManagementTableBody;
