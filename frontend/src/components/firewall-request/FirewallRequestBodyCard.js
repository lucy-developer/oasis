import React, {Component} from 'react';
import {Button, Card, CardBody, Col, Row, Table} from 'reactstrap';
import {observer} from 'mobx-react';
import TableHeaders from "../common/TableHeaders";
import ApllyForm from "../common/ApplyForm";
import FirewallRequestTableBody from "./FirewallRequestTableBody";
import plus from '../../assets/img/button_plus.png';
import '../../assets/scss/FirewallRequest.scss';
import AssignedForm from "./AssignedForm";

@observer
class FirewallRequestBodyCard extends Component {
    componentDidMount() {
        const { store } = this.props;
    }


    appendRow = () => {
        const { store } = this.props;
        // eslint-disable-next-line radix
        store.handleRowsChange(parseInt(store.rows)+1);
    };

    removeRow = () => {
        const { store } = this.props;
        if (store.rows > 1) {
            // eslint-disable-next-line radix
            store.handleRowsChange(parseInt(store.rows) - 1);
        }
    };

   render() {
       const { store, tableHeader } = this.props;
       const firewallBtn = {
           borderRadius: "4px",
           boxShadow: "0px 2px 4px 0 rgba(56, 66, 72, 0.2)",
           backgroundColor: "#ffffff",
           width: "100%",
           height: "35px",
           color: "#000000"
       };

       const imgBtn = {
           paddingBottom: '18px'
       };

       return (
           <div>
               <Card>
                   <CardBody className="body-card">
                       <Row>
                           <Col className="table-body">
                               <Table className="custom-table custom-table-clickable" bordered striped responsive>
                                   <TableHeaders tableHeader={tableHeader} />
                                   <tbody>
                                   <FirewallRequestTableBody store={store} removeRow={this.removeRow} />
                                   </tbody>
                               </Table>
                               {/*<ApllyForm />*/}
                           </Col>
                       </Row>
                       <div className="row-buttons">
                           <Button onClick={this.appendRow} style={firewallBtn}>
                               {/*<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="svg" version="1.1" viewBox="0 0 400 400"
                                    <g id="svgg"><path id="path0" d="M85.333 85.333 C 19.189 151.478,19.189 248.522,85.333 314.667 C 190.592 419.925,360.000 349.202,360.000 200.000 C 360.000 50.798,190.592 -19.925,85.333 85.333 M213.333 160.000 C 213.333 177.778,222.222 186.667,240.000 186.667 C 254.667 186.667,266.667 192.667,266.667 200.000 C 266.667 207.333,254.667 213.333,240.000 213.333 C 222.222 213.333,213.333 222.222,213.333 240.000 C 213.333 254.667,207.333 266.667,200.000 266.667 C 192.667 266.667,186.667 254.667,186.667 240.000 C 186.667 222.222,177.778 213.333,160.000 213.333 C 145.333 213.333,133.333 207.333,133.333 200.000 C 133.333 192.667,145.333 186.667,160.000 186.667 C 177.778 186.667,186.667 177.778,186.667 160.000 C 186.667 145.333,192.667 133.333,200.000 133.333 C 207.333 133.333,213.333 145.333,213.333 160.000 " /></g>
                               </svg>*/}
                               <img src={plus} alt="logo" style={imgBtn} />
                           </Button>
                           <Button onClick={this.removeRow} style={firewallBtn}>
                               {/*<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="svg" version="1.1" viewBox="0, 0, 400,400">
                                   <g id="svgg"><path id="path0" d="M85.333 85.333 C 19.189 151.478,19.189 248.522,85.333 314.667 C 190.592 419.925,360.000 349.202,360.000 200.000 C 360.000 50.798,190.592 -19.925,85.333 85.333 M280.000 200.000 C 280.000 207.407,244.444 213.333,200.000 213.333 C 155.556 213.333,120.000 207.407,120.000 200.000 C 120.000 192.593,155.556 186.667,200.000 186.667 C 244.444 186.667,280.000 192.593,280.000 200.000 " /></g>
                               </svg>*/}
                               <div>-</div>
                           </Button>
                       </div>
                   </CardBody>
                   <CardBody className="body-card">
                       <AssignedForm store={store} />
                   </CardBody>
               </Card>
               <div className="modal-footer">
                   <div className="left-side">
                       <Button className="btn-link" type="button" onClick={store.toggleDetailInfoModal}>
                           취소
                       </Button>
                   </div>
                   <div className="divider" />
                   <div className="right-side">
                       <Button className="btn-link" color="default" type="button" onClick={store.detailMeetingEdit}>
                           요청
                       </Button>
                   </div>
               </div>
           </div>
       )
   }
}

export default FirewallRequestBodyCard