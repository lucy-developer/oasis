import Base from './config/Base';

import ep from '../constants/endPoints.constant';

class FirewallAPI extends Base {
    checkRule(payload) {
        const url = ep.firewalls.checkRule();
        return this.apiClient.post(url, payload)
    }

    search(paylod) {
        const url = ep.firewalls.search();
        return this.apiClient.get(url+paylod)
    }

    detail(paylod) {
        const url = ep.firewalls.detail();
        return this.apiClient.get(url+paylod)
    }

    apporoval(paylod) {
        const url = ep.firewalls.apporoval();
        return this.apiClient.post(url, paylod);
    }

    confirmApporoval(payload){
        const url = ep.firewalls.confirmApporoval();
        return this.apiClient.post(url, payload);
    }
    //
    // getAll() {
    //     const url = ep.users.all();
    //     return this.apiClient.get(url);
    // }
}

export default FirewallAPI;