import { action, observable, runInAction } from 'mobx';
import jwt from 'jsonwebtoken';
import api from '../../utils/api.js_';

class MyPageStore {
    @observable toggle = false;

    @observable companyName = '';

    @observable id = '';

    @observable role = '';

    @observable password = '';

    @observable passwordState = '';

    @observable passwordText = '';

    @observable newPassword = '';

    @observable newPasswordState = '';

    @observable newPasswordText = '';

    @observable confirmPassword = '';

    @observable confirmPasswordState = '';

    @observable confirmPasswordText = '';

    @observable name = '';

    @observable nameState = '';

    @observable nameText = '';

    @observable phone = '';

    @observable email = '';

    @observable emailState = '';

    @observable emailText = '';

    @observable alertModal = false;

    @observable alertMessage = '';

    @observable data = {};

    constructor(root) {
        this.root = root;
    }

    verifyEmail = value => {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRex.test(value);
    };

    verifyLength = (value, length) => {
        return value.length >= length;
    };

    compare = (string1, string2) => {
        return string1 === string2;
    };

    verifyNumber = value => {
        const numberRex = new RegExp('^[0-9]+$');
        return numberRex.test(value);
    };

    @action handleChange = (event, stateName, type, stateNameEqualTo) => {
        switch (type) {
            case 'email':
                if (this.verifyEmail(event.target.value)) {
                    this[`${stateName}State`] = 'has-success';
                } else {
                    this[`${stateName}State`] = 'has-danger';
                    this[`${stateName}Text`] = '올바른 이메일 주소를 입력하세요.';
                }
                break;
            case 'password':
                if (this.verifyLength(event.target.value, 1)) {
                    this[`${stateName}State`] = 'has-success';
                } else {
                    this[`${stateName}State`] = 'has-danger';
                    this[`${stateName}Text`] = '한글자 이상 입력하세요.';
                }
                break;
            case 'newPassword':
                if (event.target.value.length === 0 || this.verifyLength(event.target.value, 6)) {
                    this[`${stateName}State`] = 'has-success';
                } else {
                    this[`${stateName}State`] = 'has-danger';
                    this[`${stateName}Text`] = '비밀번호는 6자리 이상이여야합니다.';
                }
                break;
            case 'equalTo':
                if (this.compare(event.target.value, this[stateNameEqualTo])) {
                    this[`${stateName}State`] = 'has-success';
                } else {
                    this[`${stateName}State`] = 'has-danger';
                    this[`${stateName}Text`] = '비밀번호가 다릅니다. 확인해주세요.';
                }
                break;
            case 'number':
                if (this.verifyNumber(event.target.value)) {
                    this[`${stateName}State`] = 'has-success';
                } else {
                    this[`${stateName}State`] = 'has-danger';
                }
                break;
            case 'length':
                if (this.verifyLength(event.target.value, stateNameEqualTo)) {
                    this[`${stateName}State`] = 'has-success';
                } else {
                    this[`${stateName}State`] = 'has-danger';
                }
                break;
            default:
                break;
        }
        this[stateName] = event.target.value;
    };

    @action toggleMyPage = () => {
        this.toggle = !this.toggle;
    };

    @action toggleAlertModal = value => {
        this.alertModal = !this.alertModal;
        if (value) {
            this.alertMessage = value;
        } else {
            this.alertMessage = '';
        }
    };

    @action passwordConfirm = async () => {
        this.root.toggleLoading();
        /* const users = this.api.users(); */
        await api.passwordConfirm({ params: { login_name: this.id, password: this.password } });
        runInAction(() => {
            this.root.toggleLoading();
        });
    };

    @action identities = async () => {
        this.root.toggleLoading();
        let identityId;
        if (localStorage.getItem('jwtToken')) {
            identityId = jwt.decode(localStorage.getItem('jwtToken')).identityId;
        }
        //const users = this.api.users();
        // const { data } = await api.identity({ identityId, params: {} });
        // runInAction(() => {
        //     this.root.toggleLoading();
        // });
        // this.data = data;
        // this.companyName = data.company.name;
        // this.id = data.identity.loginName;
        // this.role = data.identity.role;
        // this.name = data.name;
        // this.phone = data.cellphone;
        // this.email = data.email;
    };

    @action edit = async () => {
        this.root.toggleLoading();
        let identityId;
        // if (localStorage.getItem('jwtToken')) {
        //     identityId = jwt.decode(localStorage.getItem('jwtToken')).identityId;
        // }
        // //const users = this.api.users();
        // let userIdentity = { name: this.name, email: this.email, cellphone: this.phone, password: this.password };
        // if (this.newPassword !== '') {
        //     userIdentity = {
        //         ...userIdentity,
        //         newPassword: this.newPassword,
        //     };
        // }
        // await api.edit({ identityId, params: { userIdentity } });
        // runInAction(() => {
        //     this.root.toggleLoading();
        // });
        // this.password = '';
    };
}

export default MyPageStore;
