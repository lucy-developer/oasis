import { action, observable, runInAction } from 'mobx';
import moment from 'moment';
import api from '../../utils/api';

class FirewallStore {
    @observable clientName = '';

    @observable staffName = '';

    // @observable teamId = { id: '', label: '전체' };

    @observable page = 1;

    @observable size = 10;

    @observable data = {};

    @observable infoModal = false;

    @observable info = {};

    @observable alertModal = false;

    @observable alertMessage = '';

    @observable placeInfo = null;

    @observable detailInfoModal = false;

    @observable detailInfo = {};

    @observable teamData = {};

    @observable detailData = {};

    @observable clientId = null;

    @observable detailClientData = {};

    @observable rows = 1;

    //request data
    @observable srcIP = '';

    @observable srcType = '';

    @observable dstIP = '';

    @observable dstType = '';

    @observable protocol = '';

    @observable port = '';

    @observable ruleAction = '';

    @observable startDate = moment()
        .subtract(7, 'days')
        .format('YYYY-MM-DD');

    @observable endDate = moment().format('YYYY-MM-DD');

    @observable qdata = {
        src_type: '',
        src_address: '',
        dest_type: '',
        dest_address: '',
        protocol: '',
        port: '',
        rule_action: '',
        start_date: '',
        end_date: '',
        comment: '',
    };

    @observable addressTypeId = { id: 'IPv4', label: 'IPv4' };

    @observable addressType = [
        { id: 'IPv4', label: 'IPv4' },
        { id: 'FQDN', label: 'FQDN' },
        { id: 'USER', label: 'USER' },
        { id: 'USERGROUP', label: 'USERGROUP' } ];

    @observable protocolTypeId = { id: 'TCP', label: 'TCP' };

    @observable protocolType = [
        { id: 'TCP', label: 'TCP' },
        { id: 'UDP', label: 'UDP' },
        { id: 'ICMP', label: 'ICMP' },
        { id: 'IP', label: 'IP' } ];

    @observable ruleActionTypeId = { id: 'ALLOW', label: 'ALLOW' };

    @observable ruleActionType = [
        { id: 'ALLOW', label: 'ALLOW' },
        { id: 'DENY', label: 'DENY' }, ];

    constructor(root) {
        this.root = root;
    }

    @action handleChange = e => {
        this[e.target.name] = e.target.value;
    };

    @action handleSelectChange = e => {
        this.addressTypeId = {
            id: e.value,
            label: e.label,
        };
    };

    @action handlePrevDateChange = e => {
        this.startDate = moment(e, 'YYYY-MM-DD').format('YYYY-MM-DD');
    };

    @action handleEndDateChange = e => {
        this.endDate = moment(e, 'YYYY-MM-DD').format('YYYY-MM-DD');
    };

    @action handlePageChange = value => {
        this.page = value;
    };

    @action toggleInfoModal = id => {
        this.infoModal = !this.infoModal;
        if (id) {
            this.info = this.data.items.find(value => value.id === id);
        } else {
            this.info = {};
        }
    };

    @action toggleAlertModal = value => {
        this.alertModal = !this.alertModal;
        if (value) {
            this.alertMessage = value;
        } else {
            this.alertMessage = '';
        }
    };

    @action toggleDetailInfoModal = id => {
        this.detailInfoModal = !this.detailInfoModal;
        if (id) {
            this.detailInfo = this.detailClientData.items.find(value => value.id === id);
        } else {
            this.detailInfo = {};
        }
    };

    @action handleModalInfoChange = e => {
        this.info = {
            ...this.info,
            [e.target.name]: e.target.value,
        };
    };

    @action handleModalDetailInfoChange = e => {
        this.detailInfo = {
            ...this.detailInfo,
            [e.target.name]: e.target.value,
        };
    };

    @action handleModalInfoPlaceChange = e => {
        this.info = {
            ...this.info,
            place: {
                ...this.info.place,
                [e.target.name]: e.target.value,
            },
        };
    };

    @action handleModalInfoContactorChange = e => {
        this.info = {
            ...this.info,
            contactor: {
                ...this.info.contactor,
                [e.target.name]: e.target.value,
            },
        };
    };

    @action handleClickDetail = value => {
        this.clientId = value;
    };

    @action handleClickPlaceInfo = value => {
        this.placeInfo = value;
    };

    @action search = async () => {
        this.root.toggleLoading();
        /* const clients = this.api.teams(); */
        let params = {
            page: this.page,
            size: this.size,
            q: this.clientName,
            meeting_date_from: this.prevDate,
            meeting_date_to: this.endDate,
            meeting_organizer_name: this.staffName,
        };
        if (this.teamId.id !== '') {
            params = {
                ...params,
                meeting_organizer_team: this.teamId.id,
            };
        }
        const { data } = await api.get('/version');
        runInAction(() => {
            this.root.toggleLoading();
        });
        this.data = data;
        this.clientId = null;
        this.detailData = {};
    };

    @action teamStatus = async () => {
        this.root.toggleLoading();
        //const teams = await api.teams();
        // const teams = this.api.teams();
        const { data } = await api.lastVersion();
        runInAction(() => {
            this.root.toggleLoading();
        });
        this.teamData = data;
    };

    @action edit = async () => {
        this.root.toggleLoading();
        const clients = this.api.clients();
        const body = this.placeInfo
            ? {
                client: {
                    name: this.info.name,
                    placeInfo: this.placeInfo,
                    contactor: this.info.contactor,
                    notes: this.info.notes,
                },
            }
            : {
                client: {
                    name: this.info.name,
                    contactor: this.info.contactor,
                    notes: this.info.notes,
                },
            };
        await clients.edit({ clientId: this.info.id, params: body });
        runInAction(() => {
            this.root.toggleLoading();
        });

        this.data.items = this.data.items.map(data => {
            return data.id === this.info.id
                ? {
                    ...this.info,
                    place: this.placeInfo
                        ? {
                            ...data.place,
                            address: this.placeInfo.addressName,
                            latitude: this.placeInfo.latitude,
                            longitude: this.placeInfo.longitude,
                            altitude: this.placeInfo.altitude,
                        }
                        : data.place,
                }
                : data;
        });

        this.infoModal = false;
        this.placeInfo = null;
        this.toggleAlertModal('수정이 완료되었습니다.');
    };

    @action detail = async () => {
        this.root.toggleLoading();
        const clients = this.api.clients();
        const { data } = await clients.detail({ clientId: this.clientId, params: {} });
        runInAction(() => {
            this.root.toggleLoading();
        });
        this.detailData = data;
    };

    @action delete = async () => {
        this.root.toggleLoading();
        const clients = this.api.clients();
        await clients.delete({ clientId: this.info.id, params: {} });
        runInAction(() => {
            this.root.toggleLoading();
        });
        this.data.items = this.data.items.filter(data => data.id !== this.info.id);
        this.infoModal = false;
        this.placeInfo = null;
        this.toggleAlertModal('삭제가 완료되었습니다.');
    };

    @action detailClientList = async () => {
        this.root.toggleLoading();
        const clients = this.api.clients();
        const { data } = await clients.detailList({ clientId: this.clientId, params: { page: 1, size: 100 } });
        runInAction(() => {
            this.root.toggleLoading();
        });
        this.detailClientData = data;
    };

    @action detailMeetingEdit = async () => {
        this.root.toggleLoading();
        const meetings = this.api.meetings();
        const body = {
            meeting: {
                notes: this.detailInfo.notes,
                scheduled: this.detailInfo.scheduled,
                client: {
                    id: this.detailInfo.client.id,
                },
            },
        };
        await meetings.edit({ meetingId: this.detailInfo.id, params: body });
        this.detailClientList();
        runInAction(() => {
            this.root.toggleLoading();
        });
        this.detailInfoModal = false;
        this.toggleAlertModal('수정이 완료되었습니다.');
    };

    @action handleRowsChange = value => {
        this.rows = value;
    };

    @action handleQsetPush = value => {
        this.qdata.push(value)
    }

    @action  handleChange = (event, stateName, type, stateNameEqualTo) => {
        switch(type) {
            case 'IP':
                // if (this.verifyEmail(event.target.value)) {
                //     this[`${stateName}State`] = 'has-success';
                // } else {
                //     this[`${stateName}State`] = 'has-danger';
                //     this[`${stateName}Text`] = '올바른 이메일 주소를 입력하세요.';
                // }
                this[stateName] = event.target.value;
                break;
            case 'TYPE':
                // if (this.verifyEmail(event.target.value)) {
                //     this[`${stateName}State`] = 'has-success';
                // } else {
                //     this[`${stateName}State`] = 'has-danger';
                //     this[`${stateName}Text`] = '올바른 이메일 주소를 입력하세요.';
                // }
                //this[stateName] = event.target.value;
                this[stateName] = { id: event.value, label: event.label};
                break;
            case 'TEXT':
                this[stateName] = event.target.value;
                break;
            default:
                break;
        }

    };
}

export default FirewallStore;
