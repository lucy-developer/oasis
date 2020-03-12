import React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { NavbarBrand, Navbar, Container } from 'reactstrap';
import logo from '../../assets/img/logo_w.png';

class SidebarWithoutHeader extends React.Component {
    componentDidMount() {
        window.addEventListener('resize', this.updateColor);
    }

    render() {
        return (
            <Navbar className={classnames('navbar-absolute fixed-top navbar-transparent')} expand="lg">
                <Container>
                    <div className="navbar-wrapper">
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
