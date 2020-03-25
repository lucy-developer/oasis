import React, { Component } from 'react';
import { CardLink } from 'reactstrap';
import { observer } from 'mobx-react';
import moment from "moment";

@observer
class FirewallSearchTableBody extends Component {
    renderTableBody = () => {
        const { store } = this.props;
        const { data } = store.data;
        if (data) {
            return data.map((row, key) => {
                return (
                    <tr className="text-center click-available-tr" key={row.id}>
                        <td>{row.title}</td>
                        <td>
                            <CardLink onClick={() => store.handleClickDetail(row.id)}>{row.key}</CardLink>
                        </td>
                        <td>{row.creator.username}</td>
                        <td>{row.status}</td>
                        <td>{row.assignee.username}</td>
                        <td>{moment(row.createDate).format('YYYY.MM.DD HH:mm')}</td>
                    </tr>
                )
            })
        }
        return null;
    };

    render() {
        return <>{this.renderTableBody()}</>;
    }
}

export default FirewallSearchTableBody;