import React from 'react';
import { Container, Row } from 'reactstrap';

class SidebarWithFooter extends React.Component {
    render() {
        const { fluid, default: basic } = this.props;
        return (
            <footer className={`footer${basic ? ' footer-default' : ''}`}>
                <Container fluid={fluid}>
                    <Row className="text-center">
                        <div className="col-12">
                            <div className="credits index-footer-center">
                <span className="copyright" style={{ float: 'none' }}>
                  상호 : 주식회사 에스에스엔 | 대표이사 : 한은 | 개인정보책임자 : 신승업
                  <br />
                  소재지 : 서울특별시 마포구 백범로31길 21 서울핀테크랩 222호
                  <br />
                  사업자등록번호 : 317-81-47616 | 통신판매번호 : 서울마포 0901 호
                  <br />
                  전화 : 02-2059-3604 (상담시간 - 평일 10:00~18:00, 점심시간 - 12:00~13:00)
                </span>
                            </div>
                        </div>
                    </Row>
                </Container>
            </footer>
        );
    }
}

export default SidebarWithFooter;
