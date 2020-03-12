import React, { Component } from 'react';
import { Button } from 'reactstrap';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

class ExportExcel extends Component {
    fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    fileExtension = '.xlsx';

    exportToCSV = fileName => {
        const { csvData } = this.props;
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: this.fileType });
        FileSaver.saveAs(data, fileName + this.fileExtension);
    };

    render() {
        const { fileName } = this.props;
        return (
            <Button variant="warning" onClick={() => this.exportToCSV(fileName)}>
                엑셀로 내려받기
            </Button>
        );
    }
}

export default ExportExcel;
