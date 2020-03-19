import { action, observable, runInAction } from 'mobx';
// import ApiClient from 'lfin-apiclient-module';
// import api from '../../utils/api';
import api from '../../api/config';

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
        const params = ({
            email: this.loginName, password: this.password, admin_yn: "Y"
        });
        const { data } = await api.user.signin(params);
        runInAction(() => {
            this.root.toggleLoading();
        });
        await localStorage.setItem('jwtToken', data.access_token);
    };
}

export default SignInStore;
