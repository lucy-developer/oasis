import { action, observable } from 'mobx';
import SignInStore from './modules/SignInStore';
import DashboardStore from './modules/DashboardStore';
import ClientManagementStore from './modules/ClientManagementStore';
import MyPageStore from './modules/MyPageStore';
import CommuteByStaffStore from './modules/CommuteByStaffStore';
import CommuteByTeamStore from './modules/CommuteByTeamStore';
import CompanyStore from './modules/CompanyStore';
import FirewallStore from './modules/FirewallStore';

class RootStore {
    @observable isLoading = false;

    constructor() {
        this.signInStore = new SignInStore(this);
        this.dashboardStore = new DashboardStore(this);
        this.clientManagementStore = new ClientManagementStore(this);
        this.myPageStore = new MyPageStore(this);
        this.commuteByStaffStore = new CommuteByStaffStore(this);
        this.commuteByTeamStore = new CommuteByTeamStore(this);
        this.companyStore = new CompanyStore(this);
        this.firewallStore = new FirewallStore(this);
    }

    setAuthToken = () => {
        this.dashboardStore.api.setAuthToken({ authToken: localStorage.getItem('jwtToken') });
        this.clientManagementStore.api.setAuthToken({ authToken: localStorage.getItem('jwtToken') });
        this.myPageStore.api.setAuthToken({ authToken: localStorage.getItem('jwtToken') });
        this.commuteByStaffStore.api.setAuthToken({ authToken: localStorage.getItem('jwtToken') });
        this.commuteByTeamStore.api.setAuthToken({ authToken: localStorage.getItem('jwtToken') });
        this.companyStore.api.setAuthToken({ authToken: localStorage.getItem('jwtToken') });
        this.firewallStore.api.setAuthTag({ authToken: localStorage.getItem('jwtToken') });
    };

    @action toggleLoading = () => {
        this.isLoading = !this.isLoading;
    };
}
export default RootStore;
