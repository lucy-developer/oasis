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
        return (
            <Navbar className={classnames('navbar-absolute fixed-top navbar-transparent indexNav')} expand="lg" style={{ width: "40%" }}>
                <Container className="indexNavContainer indexNav" style={{ width: "100%" }}>
                    <div className="navbar-wrapper indexNavDiv">
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
