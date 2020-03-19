import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Row } from 'reactstrap';
import { observer } from 'mobx-react';
import MyPageLabelInput from './MyPageLabelInput';
import MyPageLabelPassword from './MyPageLabelPassword';
import phoneFormatter from '../../utils/PhoneFormater';

@observer
class MyPageInfoCard extends Component {
    edit = async () => {
        const { store } = this.props;
        if (store.newPasswordState === 'has-danger') {
            return;
        }
        if (store.confirmPasswordState === 'has-danger') {
            return;
        }
        if (store.newPassword !== store.confirmPassword) {
            store.confirmPasswordState = 'has-danger';
            store.confirmPasswordText = '비밀번호가 다릅니다. 확인해주세요.';
            return;
        }
        if (store.nameState === 'has-danger') {
            return;
        }
        if (store.emailState === 'has-danger') {
            return;
        }
        await store.edit();
        store.toggleMyPage();
        store.toggleAlertModal('정보가 저장되었습니다.');
    };

    render() {
        const { store } = this.props;
        return (
            <>
                <Card className="my-page-card">
                    <CardHeader className="text-center">
                        <h3>마이페이지</h3>
                    </CardHeader>
                    <CardBody className="body-card">
                        <Row>
                            <MyPageLabelInput title="회사명" name="companyName" value={store.companyName} readOnly />
                        </Row>
                        <Row>
                            <MyPageLabelInput title="아이디" name="id" value={store.id} readOnly />
                        </Row>
                        <Row>
                            <MyPageLabelPassword
                                title="새로운 비밀번호"
                                name="newPassword"
                                value={store.newPassword}
                                handleChange={e => store.handleChange(e, 'newPassword', 'newPassword')}
                                state={store.newPasswordState}
                                text={store.newPasswordText}
                            />
                        </Row>
                        <Row>
                            <MyPageLabelPassword
                                title="비밀번호 재확인"
                                name="confirmPassword"
                                value={store.confirmPassword}
                                handleChange={e => store.handleChange(e, 'confirmPassword', 'equalTo', 'newPassword')}
                                state={store.confirmPasswordState}
                                text={store.confirmPasswordText}
                            />
                        </Row>
                        <Row>
                            <MyPageLabelInput
                                title="이름"
                                name="name"
                                value={store.name}
                                handleChange={e => store.handleChange(e, 'name', 'password')}
                                state={store.nameState}
                                text={store.nameText}
                            />
                        </Row>
                        <Row>
                            <MyPageLabelInput title="전화번호" name="phone" value={phoneFormatter(store.phone)} readOnly />
                        </Row>
                        <Row>
                            <MyPageLabelInput
                                title="E-mail"
                                name="email"
                                value={store.email}
                                handleChange={e => store.handleChange(e, 'email', 'email')}
                                state={store.emailState}
                                text={store.emailText}
                            />
                        </Row>
                    </CardBody>
                    <CardFooter className="text-center">
                        <Button onClick={this.edit}>저장</Button>
                    </CardFooter>
                </Card>
            </>
        );
    }
}

export default MyPageInfoCard;