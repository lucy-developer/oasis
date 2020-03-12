import { action, observable, runInAction } from 'mobx';
import moment from 'moment';
import api from '../../utils/api.js_';

class CommuteByStaffStore {
    @observable teamId = { id: '', label: '전체' };

    @observable staffName = '';

    @observable month = moment().format('YYYY-MM');

    @observable prevDate = moment()
        .startOf('month')
        .format('YYYY-MM-DD');

    @observable endDate = moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD');

    @observable phone = '';

    @observable teamData = {};

    @observable data = {};

    @observable detailInfo = {};

    @observable detailData = {};

    @observable page = 1;

    @observable size = 10;

    @observable alertModal = false;

    @observable alertMessage = '';

    constructor(root) {
        this.root = root;
    }

    @action handleChange = e => {
        this[e.target.name] = e.target.value;
    };

    @action handleSelectChange = e => {
        this.teamId = {
            id: e.value,
            label: e.label,
        };
    };

    @action handlePrevDateChange = e => {
        this.prevDate = moment(e, 'YYYY-MM-DD').format('YYYY-MM-DD');
    };

    @action handleEndDateChange = e => {
        this.endDate = moment(e, 'YYYY-MM-DD').format('YYYY-MM-DD');
    };

    @action handleMonthChange = e => {
        this.month = moment(e, 'YYYY-MM').format('YYYY-MM');
        this.prevDate = moment(e, 'YYYY-MM')
            .startOf('month')
            .format('YYYY-MM-DD');
        if (moment(e, 'YYYY-MM').month() === moment().month()) {
            this.endDate = moment()
                .subtract(1, 'days')
                .format('YYYY-MM-DD');
        } else {
            this.endDate = moment(e, 'YYYY-MM')
                .endOf('month')
                .format('YYYY-MM-DD');
        }
    };

    @action toggleDetailInfo = (user, date) => {
        this.detailInfo = {
            user,
            date,
        };
    };

    @action handleUrlTeamIdChange = async value => {
        await this.teamStatus();
        const teamInfo = this.teamData.items.filter(data => data.id === value)[0];
        this.teamId = {
            id: teamInfo.id,
            label: teamInfo.name,
        };
    };

    @action toggleAlertModal = value => {
        this.alertModal = !this.alertModal;
        if (value) {
            this.alertMessage = value;
        } else {
            this.alertMessage = '';
        }
    };

    @action handlePageChange = value => {
        this.page = value;
    };

    @action search = async () => {
        this.root.toggleLoading();
        //const companies = this.api.companies();
        let params = {
            page: this.page,
            size: this.size,
            cellphone: this.phone.replace(/[^0-9]/g, ''),
            startDate: this.prevDate,
            endDate: this.endDate,
            name: this.staffName,
        };
        if (this.teamId.id !== '') {
            params = {
                ...params,
                team: this.teamId.id,
            };
        }
        // const { data } = await api.eventStatistics({ params });
        // runInAction(() => {
        //     this.root.toggleLoading();
        // });
        // this.data = data;
        // this.detailInfo = {};
    };

    @action detail = async () => {
        this.root.toggleLoading();
        // const meetings = this.api.meetings();
        // const { data } = await meetings.search({
        //     params: { userId: this.detailInfo.user.id, date: this.detailInfo.date.replace(/[^0-9]/g, '') },
        // });
        // runInAction(() => {
        //     this.root.toggleLoading();
        // });
        // this.detailData = data;
    };

    @action teamStatus = async () => {
        this.root.toggleLoading();
        // const teams = this.api.teams();
        // const { data } = await teams.status({ params: {} });
        // runInAction(() => {
        //     this.root.toggleLoading();
        // });
        // this.teamData = data;
    };
}

export default CommuteByStaffStore;
