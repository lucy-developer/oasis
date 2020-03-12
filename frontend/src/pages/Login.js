import React from 'react';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
} from 'reactstrap';
import { inject, observer } from 'mobx-react';
import logo from '../assets/img/logo_b.png';
import Loader from '../components/common/Loader';

@inject('signInStore')
@observer
class Login extends React.Component {
    componentDidMount() {
        const { signInStore, onUpdate } = this.props;
        signInStore.loginName = '';
        signInStore.password = '';
        document.title = 'OASIS. Web Admin - 로그인';
        onUpdate();
        document.body.classList.toggle('login-page');
        localStorage.clear();
        signInStore.root.setAuthToken();
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
            <div className="login-page">
                <Container>
                    <Row>
                        <Col className="ml-auto mr-auto" lg="4" md="6">
                            <Form action="" className="form" method="">
                                <Card className="card-login">
                                    <CardHeader>
                                        <CardHeader>
                                            <div className="text-center login-header">
                                                <img className="custom-logo" src={logo} alt="logo" />
                                            </div>
                                        </CardHeader>
                                    </CardHeader>
                                    <CardBody>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="nc-icon nc-single-02 text-danger" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="휴대폰번호 또는 ID"
                                                type="text"
                                                autoComplete="off"
                                                name="loginName"
                                                onChange={signInStore.handleChange}
                                                onKeyPress={this.keyPressInputId}
                                            />
                                        </InputGroup>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="nc-icon nc-key-25 text-danger" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="비밀번호"
                                                type="password"
                                                autoComplete="off"
                                                name="password"
                                                onChange={signInStore.handleChange}
                                                onKeyPress={this.keyPressPassword}
                                            />
                                        </InputGroup>
                                        <Badge className="errorBadge" color="danger">
                                            {signInStore.errorMessage}
                                        </Badge>
                                    </CardBody>
                                    <CardFooter>
                                        <Button block className="btn-default mb-3" color="default" onClick={this.login}>
                                            로그인
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <div className="full-page-background" />
                {signInStore.root.isLoading && <Loader />}
            </div>
        );
    }
}

export default Login;
