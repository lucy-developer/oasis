import React, { Component } from 'react';
import { post } from 'axios';
import '../../assets/scss/ApllyForm.scss';

class ApllyForm extends Component {
    /*constructor() {
        super();

        this.state={
            addressType1: '',
            startAddress: '',
            addressType2: '',
            arrivalAddress: '',
            protocol: '',
            portNum: '',
            permittedStatus: '',
            date1: '',
            date2: '',
            applyMemo: ''
        }

        this.handleFormCheck = this.handleFormCheck.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
    }*/

    componentDidMount() {
    }

    /*handleFormCheck(e) {
        e.preventDefault();
        // 폼 검증 후 결과에 따라 폼 등록
        this.addCustomer().then((response) => {
            console.log(response.data);
        })
    }

    handleValueChange(e) {
        const nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer(){
        const url = '/api/customers'; // 임시
        const formData = new FormData();
        //formData.append('addressType1', this.state.addressType1);
        const config = {
            headers: {
                'content-type': ''
            }
        }
        return post(url, formData, config)
    }*/

    render() {
        return (
            <>
                <div className="apply-form-body">
                    <form className="apply-form">
                        <select name="addressType1">
                            <option selected value="IPv4">IPv4</option>
                            <option value="FQDN">FQDN</option>
                            <option value="USER">USER</option>
                            <option value="USERGROUP">USERGROUP</option>
                        </select>

                        <input name="startAddress" type="number" className="address" />

                        <select name="addressType2">
                            <option selected value="IPv4">IPv4</option>
                            <option value="FQDN">FQDN</option>
                            <option value="USER">USER</option>
                            <option value="USERGROUP">USERGROUP</option>
                        </select>

                        <input name="arrivalAddress" type="number" className="address" />
                        <select name="protocol" value="TCP">
                            <option selected>TCP</option>
                            <option value="UDP">UDP</option>
                            <option value="ICMP">ICMP</option>
                            <option value="IP">IP</option>
                        </select>

                        <input name="portNum" type="number" style={{width: '75px'}} />

                        <select name="permittedStatus" style={{width: '98px'}}>
                            <option selected value="ALLOW">ALLOW</option>
                            <option value="DENY">DENY</option>
                        </select>

                        <input name="date1" type="date" style={{width: '135px'}} />
                        ~
                        <input name="date2" type="date" style={{width: '135px', marginLeft: '6px'}} />

                        <input name="applyMemo" type="text" style={{width: '225px'}} />

                        <button type="button" className="apply-btn" color="default">c</button>
                        <button type="button" className="apply-btn" color="default">d</button>
                    </form>
                </div>
                <div>
                    <button type="submit" onClick={this.handleSubmit}>등록</button>
                </div>
            </>
        );
    }
}

export default ApllyForm;