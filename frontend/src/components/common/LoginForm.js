import React, { Component } from 'react';
import {
    Badge,
    Button,
    Form,
    Input
} from 'reactstrap';
import  '../../assets/scss/Login.scss';
import { inject, observer } from 'mobx-react';
import Loader from './Loader';

@inject('signInStore')
@observer
class LoginForm extends React.Component {
    componentDidMount() {
        const { signInStore, onUpdate } = this.props;
        signInStore.userId = '';
        signInStore.password = '';
        document.title = 'OASIS. Web User - 로그인';
        //onUpdate();
        document.body.classList.toggle('login-page');
        localStorage.clear();
        //signInStore.root.setAuthToken();
    }

    componentWillUnmount() {
        document.body.classList.toggle('login-page');
    }

    login = async () => {
        const { history, signInStore } = this.props;
        try {
            await signInStore.signIn();
            if (localStorage.getItem('jwtToken')) {
                signInStore.root.setAuthToken();
                await signInStore.root.myPageStore.identities();
                await signInStore.root.companyStore.preferences();
                localStorage.setItem('userName', signInStore.root.myPageStore.name);
                localStorage.setItem('userRole', signInStore.root.myPageStore.role);
                localStorage.setItem('featureEnabled', JSON.stringify(signInStore.root.companyStore.featureEnabled));
                if (signInStore.root.myPageStore.role === 'STAFF') {
                    history.push({
                        pathname: '/admin/commute/staff/',
                    });
                } else {
                    history.push({
                        pathname: '/admin/dashboard',
                    });
                }
            }
        } catch (e) {
            signInStore.root.isLoading = false;
            signInStore.handleErrorMessage('아이디와 비밀번호를 확인하세요.');
        }
    };

    keyPressInputId = e => {
        if (e.key === 'Enter') {
            const { form } = e.target;
            const index = Array.prototype.indexOf.call(form, e.target);
            form.elements[index + 1].focus();
            e.preventDefault();
        }
    };

    keyPressPassword = e => {
        if (e.key === 'Enter') {
            this.login();
        }
    };

    render() {
        const { signInStore } = this.props;
        return (
            <>
                <Form action="" className="form-user" method="">
                    <Input
                        placeholder="User E-mail"
                        type="email"
                        autoComplete="off"
                        name="userId"
                        className="form-input"
                        onChange={signInStore.handleChange}
                        onKeyPress={this.keyPressInputId}
                        required
                    />
                    <Input
                        placeholder="PW"
                        type="password"
                        autoComplete="off"
                        name="password"
                        className="form-input"
                        onChange={signInStore.handleChange}
                        onKeyPress={this.keyPressPassword}
                        required
                    />
                    <Badge className="errorBadge" color="danger">
                        {signInStore.errorMessage}
                    </Badge>
                    <Button block className="btn-default mb-3 login-button" color="default" onClick={this.login}>로그인</Button>
                    <Button block className="btn-default mb-3 login-button" color="default">등록</Button>
                </Form>
                <div className="full-page-background" />
                {signInStore.root.isLoading && <Loader />}
            </>
        );
    }
}

export default LoginForm
