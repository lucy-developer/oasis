import React, { Component } from 'react';
import { Card, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import staffImage from '../../assets/img/img_Dashboard_Staff.png';

class DashboardStaffCard extends Component {
    render() {
        const { header, content } = this.props;
        return (
            <>
                <Col lg="4" sm="6">
                    <Card className="DashboardCard">
                        <CardHeader>
                            <Row>
                                <Col xs="6">
                                    <img className="dashboard-card-image" src={staffImage} alt="dashboard-icon" />
                                </Col>
                                <Col xs="6">
                                    <div className="pull-right">
                                        <p className="dashboard-card-title text-right">{header}</p>
                                        <p className="text-right dashboard-card-content">{content}</p>
                                    </div>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardFooter>
                            <hr />
                            <Row>
                                <Col sm="12">
                                    <div className="text-center">
                                        <NavLink
                                            to={{
                                                pathname: 'commute/team',
                                            }}
                                            className="dashboard-card-link"
                                        >
                                            View Details
                                        </NavLink>
                                    </div>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
                </Col>
            </>
        );
    }
}

export default DashboardStaffCard;
