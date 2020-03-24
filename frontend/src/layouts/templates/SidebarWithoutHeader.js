import React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { NavbarBrand, Navbar, Container } from 'reactstrap';


import logo from '../../assets/img/oasis_logo_login.png';

class SidebarWithoutHeader extends React.Component {
    componentDidMount() {
        window.addEventListener('resize', this.updateColor);
    }

    render() {
        const indexNav = {
            width: "40%",
            height: "90vh",
            padding: "0",
            margin: "0px",
            paddingBottom: "0px",
            border: "0px"
        };

        const indexNavContainer = {
            height: "100%",
            backgroundColor: "#f3f6f8"
        };

        const indexNavDiv = {
            marginLeft: "50%"
        };
        return (
            <Navbar style={indexNav} className={classnames('navbar-absolute fixed-top navbar-transparent')} expand="lg">
                <Container style={indexNavContainer}>
                    <div className="navbar-wrapper" style={indexNavDiv}>
                        <NavbarBrand />
                        <NavLink to="/index" className="nav-link">
                            <img className="custom-logo" src={logo} alt="logo" />
                        </NavLink>
                    </div>
                </Container>
            </Navbar>
        );
    }
}

export default SidebarWithoutHeader;
