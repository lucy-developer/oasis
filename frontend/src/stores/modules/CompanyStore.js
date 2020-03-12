import { action, observable, runInAction } from 'mobx';
import api from '../../utils/api.js_';

class CompanyStore {
    @observable featureEnabled = {};

    constructor(root) {
        this.root = root;
    }

    @action preferences = async () => {
        this.root.toggleLoading();
        // const company = this.api.companies();
        // const { data } = await company.preferences({});
        // this.featureEnabled = data.featureEnabled;
        // runInAction(() => {
        //     this.root.toggleLoading();
        // });
    };
}

export default CompanyStore;
