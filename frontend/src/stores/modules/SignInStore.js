import { action, observable, runInAction } from 'mobx';
import api from '../../utils/api.js_';

class SignInStore {
    @observable loginName = '';

    @observable password = '';

    @observable errorMessage = '';

    constructor(root) {
        this.root = root;
    }

    @action handleChange = e => {
        this[e.target.name] = e.target.value;
        this.errorMessage = '';
    };

    @action handleErrorMessage = value => {
        this.errorMessage = value;
    };

    @action
    signIn = async () => {
        this.root.toggleLoading();
        //const signIn = this.api.login();
        const { data } = await api.login({
            params: { login_name: this.loginName, password: this.password },
        });
        runInAction(() => {
            this.root.toggleLoading();
        });
        await localStorage.setItem('jwtToken', data.accessToken);
        await this.root.setAuthToken();
    };
}

export default SignInStore;
