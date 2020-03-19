import Base from './config/Base';

import ep from '../constants/endPoints.constant';

class UserAPI extends Base {
    signin(payload) {
        const url = ep.users.signin();
        return this.apiClient.post(url, payload)
    }

    search(payload) {
        const url = ep.users.search();
        return this.apiClient.post(url, payload)
    }

    getAll() {
        const url = ep.users.all();
        return this.apiClient.get(url);
    }
}

export default UserAPI;