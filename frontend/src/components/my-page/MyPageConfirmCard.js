import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Row } from 'reactstrap';
import { observer } from 'mobx-react';
import MyPageLabelInput from './MyPageLabelInput';
import MyPageLabelPassword from './MyPageLabelPassword';

@observer
class MyPageConfirmCard extends Component {
    confirm = async () => {
        const { store } = this.props;
        if (store.passwordState === 'has-danger') {
            return;
        }
        try {
            await store.passwordConfirm();
            store.toggleMyPage();
        } catch (e) {
            store.root.isLoading = false;
            store.passwordState = 'has-danger';
            store.passwordText = '비밀번호가 맞지 않습니다.';
        }
    };

    render() {
        const { store } = this.props;
        return (
            <>
                <Card className="my-page-card">
                    <CardHeader className="text-center">
                        <h3>마이페이지</h3>
                    </CardHeader>
                    <CardBody className="body-card ">
                        <Row>
                            <MyPageLabelInput title="회사명" name="companyName" value={store.companyName} readOnly />
                        </Row>
                        <Row>
                            <MyPageLabelInput title="아이디" name="id" value={store.id} readOnly />
                        </Row>
                        <Row>
                            <MyPageLabelPassword
                                title="비밀번호"
                                name="password"
                                value={store.password}
                                handleChange={e => store.handleChange(e, 'password', 'password')}
                                state={store.passwordState}
                                text={store.passwordText}
                                handleKeyPress={this.confirm}
                            />
                        </Row>
                    </CardBody>
                    <CardFooter className="text-center">
                        <Button onClick={this.confirm}>비밀번호 확인</Button>
                    </CardFooter>
                </Card>
            </>
        );
    }
}

export default MyPageConfirmCard;
