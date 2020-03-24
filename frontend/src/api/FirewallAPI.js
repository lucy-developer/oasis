import Base from './config/Base';

import ep from '../constants/endPoints.constant';

class FirewallAPI extends Base {
    checkRule(payload) {
        const url = ep.firewalls.checkRule();
        return this.apiClient.post(url, payload)
    }

    // search(payload) {
    //     const url = ep.users.search();
    //     return this.apiClient.post(url, payload)
    // }
    //
    // getAll() {
    //     const url = ep.users.all();
    //     return this.apiClient.get(url);
    // }
}

export default FirewallAPI;