import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'reactstrap';
import moment from 'moment';

@observer
class FirewallSearchAssigneesTableBody extends Component {

    renderTableBody = () => {
        const { store } = this.props;
        const { data } = store.detailData;
        if (data) {
            return data.assignees.map((row, key) => {
                return (
                    // <tr onClick={() => store.toggleDetailInfoModal(row.id)} className="text-center" key={row.id}>
                    <tr>
                        <td>{`${key + 1}`}</td>
                        <td>{`${row.assign.username}`}</td>
                        <td>{`${row.status}`}</td>
                        {/*<td>{row.checkedIn ? row.checkedIn.location.place.address : ''}</td>*/}
                        <td>{moment(row.updateDate).format('YYYY.MM.DD dddd HH:mm:SS')}</td>
                        {/*<td>{row.status === 'SCHEDULED' ? '미방문' : '방문'}</td>*/}
                        {/*<td>{row.protocol}</td>*/}
                        {/*<td>{row.port}</td>*/}
                        <td>
                            { row.status==='PENDING' ? (
                                <Button
                                    onClick={e => store.confirmApprovalFirewall(e)}
                                    className="btn-icon btn-round"
                                    color="warning"
                                    size="sm"
                                >
                                    <i className="fa  fa-check" />
                                </Button>
                              )
                            : (
                                <Button
                                    onClick={e => store.handleFireRuleCheck(e)}
                                    className="btn-icon btn-round"
                                    color="warning"
                                    size="sm"
                                >
                                    <i className="fa fa-remove" />
                                </Button>
)}
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

export default FirewallSearchAssigneesTableBody;