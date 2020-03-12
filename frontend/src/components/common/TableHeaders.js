import React, { Component } from 'react';

export default class TableHeaders extends Component {
    renderTableHeader = () => {
        const { tableHeader } = this.props;
        return tableHeader.map((row, key) => <th key={key}>{row}</th>);
    };

    render() {
        return (
            <thead>
            <tr className="table-header text-center">{this.renderTableHeader()}</tr>
            </thead>
        );
    }
}

//export default TableHeaders;
