import { action, observable, runInAction } from 'mobx';
import moment from 'moment';
import api from '../../utils/api.js_';

class CommuteByTeamStore {
    @observable teamId = { id: '', label: '전체' };

    @observable staffName = '';

    @observable prevDate = moment()
        .subtract(7, 'days')
        .format('YYYY-MM-DD');

    @observable endDate = moment().format('YYYY-MM-DD');

    @observable phone = '';

    @observable page = 1;

    @observable size = 10;

    @observable teamData = {};

    @observable data = {};

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

    @action handlePageChange = value => {
        this.page = value;
    };

    @action search = async () => {
        this.root.toggleLoading();
        // const companies = this.api.companies();
        // let params = {
        //     name: this.staffName,
        //     cellphone: this.phone.replace(/[^0-9]/g, ''),
        //     page: this.page,
        //     size: this.size,
        // };
        // if (this.teamId.id !== '') {
        //     params = {
        //         ...params,
        //         team_uid: this.teamId.id,
        //     };
        // }
        // const { data } = await companies.members({ params });
        // runInAction(() => {
        //     this.root.toggleLoading();
        // });
        // this.data = data;
    };

    @action teamStatus = async () => {
        // const teams = this.api.teams();
        // const { data } = await teams.status({ params: {} });
        // this.teamData = data;
    };
}

export default CommuteByTeamStore;
