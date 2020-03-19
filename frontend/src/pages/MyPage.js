import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import MyPageInfoCard from '../components/my-page/MyPageInfoCard';
import MyPageConfirmCard from '../components/my-page/MyPageConfirmCard';
import AlertModal from '../components/common/AlertModal';
import Loader from '../components/common/Loader';

@inject('myPageStore')
@observer
class MyPage extends Component {
    async componentDidMount() {
        const { myPageStore, onUpdate, history } = this.props;
        document.title = '아임히어-Work. Web Admin - 마이페이지';
        onUpdate();
        myPageStore.password = '';
        myPageStore.toggle = false;
        try {
            await myPageStore.identities();
        } catch (e) {
            if (e.status === 401) {
                myPageStore.root.isLoading = false;
                history.push('/auth/login');
            }
        }
    }

    render() {
        const { myPageStore } = this.props;
        return (
            <>
                <div className="custom-my-page-main-panel">
                    <div className="custom-my-page-content">
                        <Container>
                            <Row>
                                <Col>
                                    {myPageStore.toggle ? (
                                        <MyPageInfoCard store={myPageStore} />
                                    ) : (
                                        <MyPageConfirmCard store={myPageStore} />
                                    )}
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
                <AlertModal store={myPageStore} />
                {myPageStore.root.isLoading && <Loader />}
            </>
        );
    }
}

export default MyPage;