import { action, observable, runInAction } from 'mobx';
import qs from 'qs';
import api from '../../utils/api';

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
        const params = ({
            email: this.loginName, password: this.password, admin_yn: "Y"
        });
        const { data } = await api.post('/api/v1/auth/login', params, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        runInAction(() => {
            this.root.toggleLoading();
        });
        await localStorage.setItem('jwtToken', data.access_token);
        await this.root.setAuthToken();
    };
}

export default SignInStore;
