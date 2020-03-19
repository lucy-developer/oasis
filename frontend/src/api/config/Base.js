import { mandatory } from '../../utils/validation.helper';

class Base {
    constructor({ apiClient = mandatory('apiClient') }) {
        this.apiClient = apiClient;
    }
}

export default Base;