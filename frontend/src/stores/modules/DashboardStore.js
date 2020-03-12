import { action, observable, runInAction } from 'mobx';
import api from '../../utils/api.js_';

class DashboardStore {
    @observable teamData = {};

    @observable clientData = {};

    constructor(root) {
        this.root = root;
    }

    @action teamStatus = async () => {
        this.root.toggleLoading();
        const teams = this.api.teams();
        const { data } = await teams.status({ params: {} });
        runInAction(() => {
            this.root.toggleLoading();
        });
        this.teamData = data;
    };

    @action clientStatus = async () => {
        this.root.toggleLoading();
        //const clients = this.api.clients();
        const { data } = await api.search({ params: { page: 1, size: 1 } });
        runInAction(() => {
            this.root.toggleLoading();
        });
        this.clientData = data;
    };
}

export default DashboardStore;
