import React from 'react';
import { NavbarBrand, Navbar, Container } from 'reactstrap';
import logo from '../../assets/img/oasis_logo.png';

class IndexHeader extends React.Component {
    render() {
        const indexNav = {
            width: "30%",
            height: "100vh",
            padding: "0",
            margin: "0px",
            paddingBottom: "99px",
            border: "0px"
        };

        const indexNavDiv = {
            height: "100%"
            /*backgroundColor: "#f3f6f8"*/
        };

        return (
            <>
                <Navbar style={indexNav} className="index-header navbar-absolute fixed-top" expand="lg" color="transparent">
                    <Container>
                        <div style={indexNavDiv}>
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
