import { action, observable, runInAction } from 'mobx';
import moment from 'moment';
// import api from '../../utils/api';
import jwt from "jsonwebtoken";
import api from '../../api/config';

class FirewallStore {
    @observable clientName = '';

    @observable staffName = '';

    // @observable teamId = { id: '', label: '전체' };

    @observable page = 1;

    @observable size = 10;

    @observable data = {};

    @observable approvalId = null;

    @observable detailData = {};

    @observable infoModal = false;

    @observable info = {};

    @observable alertModal = false;

    @observable alertMessage = '';

    @observable placeInfo = null;

    @observable detailInfoModal = false;

    @observable detailInfo = {};

    @observable teamData = {};

    @observable detailClientData = {};

    @observable rows = 1;

    //request data
    @observable srcIP = '';

    @observable srcType = { id: 'IPv4', label: 'IPv4' };

    @observable dstIP = '';

    @observable dstType = { id: 'IPv4', label: 'IPv4' };

    @observable protocol = { id: 'TCP', label: 'TCP' };

    @observable port = '';

    @observable ruleAction = { id: 'ALLOW', label: 'ALLOW' };

    @observable startDate = moment()
        .subtract(7, 'days')
        .format('YYYY-MM-DD');

    @observable endDate = moment().format('YYYY-MM-DD');

    @observable comment = '';

    @observable qdatas = [];

    @observable qdata = {
        src_type: 'IPv4',
        src_address: '',
        dest_type: 'IPv4',
        dest_address: '',
        protocol: 'TCP',
        port: '',
        rule_action: 'ALLOW',
        start_date: this.startDate,
        end_date: this.endDate,
        comment: '',
    };

    @observable assignRows = 1;

    @observable qdatesRows = 1;

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

    @observable assignId = { id: 'Approval', label: '결재' };

    @observable assignType = [
        { id: 'Approval', label: '결재' },
        { id: 'Consultation', label: '결재' },];

    @observable assignees = [];

    @observable assignee = {
        order: '',
        user_id: '',
    };

    constructor(root) {
        this.root = root;
    }

    @action handleSelectChange = e => {
        this.addressTypeId = {
            id: e.value,
            label: e.label,
        };
    };

    @action handlePrevDateChange = e => {
        this.qdata.start_date = moment(e, 'YYYY-MM-DD').format('YYYY-MM-DD');
    };

    @action handleEndDateChange = e => {
        this.qdata.end_date = moment(e, 'YYYY-MM-DD').format('YYYY-MM-DD');
    };

    @action handlePageChange = value => {
        this.page = value;
    };

    @action toggleInfoModal = id => {
        this.infoModal = !this.infoModal;
        if (id) {
            this.info = this.data.data.find(value => value.id === id);
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
        this.approvalId = value;
    };

    @action handleClickPlaceInfo = value => {
        this.placeInfo = value;
    };

    @action search = async () => {
        this.root.toggleLoading();

        let identityId;
        if (localStorage.getItem('jwtToken')) {
            identityId = jwt.decode(localStorage.getItem('jwtToken')).sub;
        }

        const { data } = await api.firewall.search(identityId);
        runInAction(() => {
            this.root.toggleLoading();
        });

        this.data = data;
    };

    @action detail = async () => {
        this.root.toggleLoading();
        const { data } = await api.firewall.detail(this.approvalId);

        runInAction(() => {
            this.root.toggleLoading();
        });

        this.detailData = data;
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
        this.qdatas.push(value)
    };

    @action  handleChange = (event, stateName, type, stateNameEqualTo) => {
        switch(type) {
            case 'IP':
                // if (this.verifyEmail(event.target.value)) {
                //     this[`${stateName}State`] = 'has-success';
                // } else {
                //     this[`${stateName}State`] = 'has-danger';
                //     this[`${stateName}Text`] = '올바른 이메일 주소를 입력하세요.';
                // }
                this.qdata[stateName] = event.target.value;
                break;
            case 'TYPE':
                // if (this.verifyEmail(event.target.value)) {
                //     this[`${stateName}State`] = 'has-success';
                // } else {
                //     this[`${stateName}State`] = 'has-danger';
                //     this[`${stateName}Text`] = '올바른 이메일 주소를 입력하세요.';
                // }
                //this[stateName] = event.target.value;
                // this.qdata[stateName] = {
                //     id: event.value,
                //     label: event.label,
                // };
                this.qdata[stateName] = event.label;
                break;
            case 'TEXT':
                this.qdata[stateName] = event.target.value;
                break;
            case 'NUMBER':
                // eslint-disable-next-line radix
                this.qdata[stateName] = parseInt(event.target.value);
                break;
            default:
                break;
        }
    };

    @action handleAssignChange = (event, stateName, type, stateNameEqualTo) => {
        switch(type) {
            case 'TYPE':
                break;
            case 'TEXT':
                this.assignee[stateName] = event.target.value;
                break;
            default:
                break;
        }
    };

    @action handleAddAssignees = async () => {
        if (this.assignees)
            this.assignee.order = this.assignees.length +1;
        else this.assignee.order = 1;
        this.assignees.push(this.assignee);
    };

    @action handleFireRuleCheck = async () => {
        this.root.toggleLoading();
        this.qdata.status = '1';
        const params = this.qdata;
        const { data } = await api.firewall.checkRule(params);
        runInAction(() => {
            this.root.toggleLoading();
        });

        if (data.data.check === "ERROR") {
            this.qdata.message = data.data.message;
            this.message = data.data.message;
            this.toggleAlertModal(data.data.message);
        } else if (data.data.check === "SUCCESS") {
            this.qdata.status = '0';
            if (this.qdata)
                this.handleQsetPush(this.qdata);
        }
    };

    @action approvalFirewall = async () => {
        this.root.toggleLoading();
        const params = ({
            rules: this.qdatas, assigns: this.assignees, creator: 8
        });

        const { data } = await api.firewall.apporoval(params);

        runInAction(() => {
            this.root.toggleLoading();
        });

        this.infoModal = false;
        this.placeInfo = null;
        this.toggleAlertModal('신청 처리 완료되었습니다.');
    };

    @action confirmApprovalFirewall = async () => {
        this.root.toggleLoading();
        const params = ({
            task: this.detailData.data.task.id,
            assignee: this.detailData.data.task.assignee.id, status: "APPROVED"
        });

        const { data } = await api.firewall.confirmApporoval(params);

        runInAction(() => {
            this.root.toggleLoading();
        });

        this.infoModal = false;
        this.placeInfo = null;
        this.toggleAlertModal('승인 처리 완료되었습니다.');
    };

    @action handleAssignRowsChange = value => {
        this.assignRows = value;
    };

    @action handleQdatesRowsChange = value => {
        this.qdatasRows = value;
    };

    @action handleQdateRowsChange = value => {
        this.qdatasRows = value;
    };

    @action createAssigns = value => {
        this.assigns = value;
    }

    @action requestFirewallRule = async () => {
        this.root.toggleLoading();
        const params = ({
            rules: this.qdatas,
            assigns: this.assigns,
            creator: this.root.myPageStore.id,
        });
    }
}

export default FirewallStore;
