import React, { Component } from 'react';
import '../../assets/scss/FireWallApply.scss';
import ApllyForm from "../../components/common/ApplyForm";

// 인덱스 페이지
class FireWallApply extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <>
                <div className="aplly-head">head</div>
                <div className="apply-body">
                    <div className="apply-firewall">
                        <h5 className="title-text">방화벽 정책 신청</h5>
                        <table className="table-text">
                            <tr>
                                <td style={{width: '91px'}}>주소유형</td>
                                <td style={{width: '180px'}}>출발지 주소</td>
                                <td style={{width: '91px'}}>주소유형</td>
                                <td style={{width: '180px'}}>목적지 주소</td>
                                <td style={{width: '98px'}}>프로토콜</td>
                                <td style={{width: '70px'}}>포트</td>
                                <td style={{width: '100px'}}>허용여부</td>
                                <td style={{width: '300px'}}>기간</td>
                                <td style={{width: '260px'}}>요청내용</td>
                                <td style={{width: '70px'}}>액션</td>
                            </tr>
                        </table>
                    </div>
                    <ApllyForm />
                </div>
            </>
        );
    }
}

export default FireWallApply;