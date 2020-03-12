import React from 'react';
import { NavbarBrand, Navbar, Container } from 'reactstrap';
import logo from '../../assets/img/logo_b.png';

class IndexHeader extends React.Component {
    render() {
        return (
            <>
                <Navbar className="index-header navbar-absolute fixed-top" expand="lg" color="transparent">
                    <Container>
                        <div>
                            <NavbarBrand href="/">
                                <img width="160" src={logo} alt="logo" />
                            </NavbarBrand>
                        </div>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default IndexHeader;
