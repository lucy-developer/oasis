import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import 'moment/locale/ko';
import DashboardTeamCard from '../components/dashboard/DashboardTeamCard';
import DashboardClientCard from '../components/dashboard/DashboardClientCard';
import DashboardStaffCard from '../components/dashboard/DashboardStaffCard';
import Loader from '../components/common/Loader';

@inject('dashboardStore')
@observer
class Dashboard extends Component {
    async componentDidMount() {
        const { dashboardStore, onUpdate, history } = this.props;
        document.title = '아임히어-Work. Web Admin - 대시보드';
        onUpdate();
        try {
            await dashboardStore.teamStatus();
            await dashboardStore.clientStatus();
        } catch (e) {
            if (e.status === 401) {
                dashboardStore.root.isLoading = false;
                history.push('/auth/login');
            }
        }
    }

    renderDashboardTeamCard = () => {
        const { dashboardStore } = this.props;
        const { items } = dashboardStore.teamData;
        if (items) {
            return items.map((value, key) => {
                return <DashboardTeamCard header={value.name} content={`${value.staffsCount}명`} teamId={value.id} key={key} />;
            });
        }
        return null;
    };

    renderDashboardClientCard = () => {
        const { dashboardStore } = this.props;
        const { totalItems } = dashboardStore.clientData;
        if (totalItems) {
            return <DashboardClientCard header="고객사 관리" content={totalItems} />;
        }
        return null;
    };

    renderDashboardStaffCard = () => {
        const { dashboardStore } = this.props;
        const { items } = dashboardStore.teamData;
        if (items) {
            const totalStaffCount = items.map(value => value.staffsCount).reduce((acc, current) => acc + current);
            return <DashboardStaffCard header="총 관리 사원 수" content={`${totalStaffCount}명`} />;
        }
        return null;
    };

    render() {
        const { dashboardStore } = this.props;
        return (
            <>
                <div className="custom-dashboard">
                    <Container>
                        <Row>
                            <Col className="date-header text-center">{moment().format('YYYY년 MM월 DD일')}</Col>
                        </Row>
                        <Row>{this.renderDashboardTeamCard()}</Row>
                        <Row>{this.renderDashboardClientCard()}</Row>
                        <Row>{this.renderDashboardStaffCard()}</Row>
                    </Container>
                </div>
                {dashboardStore.root.isLoading && <Loader />}
            </>
        );
    }
}

export default Dashboard;
