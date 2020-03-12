import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
// import CommuteByStaffSearchCard from '../components/commute-by-staff/CommuteByStaffSearchCard';
import Loader from '../components/common/Loader';
// import CommuteByStaffBodyCard from '../components/commute-by-staff/CommuteByStaffBodyCard';
// import CommuteByStaffDetailBodyCard from '../components/commute-by-staff/CommuteByStaffDetailBodyCard';

@inject('commuteByStaffStore')
@observer
class CommuteByStaff extends Component {
    async componentDidMount() {
        const { commuteByStaffStore, match, onUpdate, history } = this.props;
        document.title = '아임히어-Work. Web Admin - 근무 > 사원 관리';
        onUpdate();
        if (match.params.teamId) {
            await commuteByStaffStore.handleUrlTeamIdChange(match.params.teamId);
        }
        try {
            await commuteByStaffStore.search();
            await commuteByStaffStore.teamStatus();
        } catch (e) {
            if (e.status === 401) {
                commuteByStaffStore.root.isLoading = false;
                history.push('/auth/login');
            }
        }
    }

    commuteByStaffBodyCardTableHeader = () => {
        const featureEnabled = JSON.parse(localStorage.getItem('featureEnabled'));
        const defaultTableHeader = ['날짜', '조직명', '사원명', '사원 전화번호', '근무 형태', '방문 횟수'];

        if (featureEnabled.attend === true) {
            defaultTableHeader.push('출근');
        }

        if (featureEnabled.leave === true) {
            defaultTableHeader.push('퇴근');
        }

        if (featureEnabled.officeWork === true) {
            defaultTableHeader.push('출근 시간', '퇴근 시간');
        }

        return defaultTableHeader;
    };

    render() {
        const { commuteByStaffStore } = this.props;
        return (
            <div className="admin-page">
                <Container fluid>
                    <Row>
                        <Col>
                            {commuteByStaffStore.detailInfo.date && commuteByStaffStore.detailInfo.user ? (
                                <h3>
                                    {`근무 > ${commuteByStaffStore.detailInfo.user.name}님의 ${moment(
                                        commuteByStaffStore.detailInfo.date,
                                        'YYYY-MM-DD',
                                    ).format('YYYY-MM-DD dddd')} 근태 현황`}
                                </h3>
                            ) : (
                                <h3>{'근무 > 사원 관리'}</h3>
                            )}
                        </Col>
                    </Row>
                    {/*<Row>*/}
                    {/*    <Col>*/}
                    {/*        <CommuteByStaffSearchCard store={commuteByStaffStore} />*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    {/*<Row>*/}
                    {/*    <Col>*/}
                    {/*        {commuteByStaffStore.detailData.items ? (*/}
                    {/*            <CommuteByStaffDetailBodyCard*/}
                    {/*                store={commuteByStaffStore}*/}
                    {/*                tableHeader={['순서', '고객사', '방문지 위치', '방문 일시', '방문 내용', '방문 상태']}*/}
                    {/*            />*/}
                    {/*        ) : (*/}
                    {/*            <CommuteByStaffBodyCard*/}
                    {/*                store={commuteByStaffStore}*/}
                    {/*                tableHeader={this.commuteByStaffBodyCardTableHeader()}*/}
                    {/*            />*/}
                    {/*        )}*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                </Container>
                {commuteByStaffStore.root.isLoading && <Loader />}
            </div>
        );
    }
}

export default CommuteByStaff;
