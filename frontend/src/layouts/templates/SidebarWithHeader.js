import React from 'react';
import classnames from 'classnames';
import { Button, Collapse, Container, Nav, Navbar, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class SidebarWithHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseOpen: false,
            color: 'bg-white',
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateColor);
    }

    componentDidUpdate(e) {
        if (
            window.outerWidth < 993 &&
            e.history.location.pathname !== e.location.pathname &&
            document.documentElement.className.indexOf('nav-open') !== -1
        ) {
            document.documentElement.classList.toggle('nav-open');
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateColor);
    }

    // function that adds color white/transparent to the navbar on resize (this is for the collapse)
    updateColor = () => {
        const { collapseOpen } = this.state;
        if (window.innerWidth < 993 && collapseOpen) {
            this.setState({
                color: 'bg-white',
            });
        } else {
            this.setState({
                color: 'bg-white',
            });
        }
    };

    // this function opens and closes the sidebar on small devices
    toggleSidebar = () => {
        document.documentElement.classList.toggle('nav-open');
    };

    // this function opens and closes the collapse on small devices
    // it also adds navbar-transparent class to the navbar when closed
    // ad bg-white when opened
    toggleCollapse = () => {
        const { collapseOpen } = this.state;
        const newState = {
            collapseOpen: !collapseOpen,
        };
        if (!collapseOpen) {
            newState.color = 'bg-white';
        } else {
            newState.color = 'navbar-transparent';
        }
        this.setState(newState);
    };

    render() {
        const { color, sidebarOpen, collapseOpen } = this.state;
        const { handleMiniClick } = this.props;
        return (
            <>
                <Navbar className={classnames('navbar-absolute fixed-top', color)} expand="lg">
                    <Container fluid>
                        <div className="navbar-wrapper">
                            <div className="navbar-minimize">
                                <Button className="btn-icon btn-round" color="default" id="minimizeSidebar" onClick={handleMiniClick}>
                                    <i className="nc-icon nc-minimal-right text-center visible-on-sidebar-mini" />
                                    <i className="nc-icon nc-minimal-left text-center visible-on-sidebar-regular" />
                                </Button>
                            </div>
                            <div
                                className={classnames('navbar-toggle', {
                                    toggled: sidebarOpen,
                                })}
                            >
                                <button className="navbar-toggler" type="button" onClick={this.toggleSidebar}>
                                    <span className="navbar-toggler-bar bar1" />
                                    <span className="navbar-toggler-bar bar2" />
                                    <span className="navbar-toggler-bar bar3" />
                                </button>
                            </div>
                        </div>
                        <button
                            aria-controls="navigation-index"
                            aria-expanded={collapseOpen}
                            aria-label="Toggle navigation"
                            className="navbar-toggler"
                            // data-target="#navigation"
                            data-toggle="collapse"
                            type="button"
                            onClick={this.toggleCollapse}
                        >
                            <span className="navbar-toggler-bar navbar-kebab" />
                            <span className="navbar-toggler-bar navbar-kebab" />
                            <span className="navbar-toggler-bar navbar-kebab" />
                        </button>
                        <Collapse className="justify-content-end" navbar isOpen={collapseOpen}>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink to="/my-page" className="nav-link btn-magnify" style={{ color: 'black' }}>
                                        {`${localStorage.getItem('userName')} 담당자님 환영합니다.`}
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link btn-magnify" to="/my-page">
                                        <p>마이페이지</p>
                                        <i className="nc-icon nc-layout-11 nc-settings-gear-65 text-primary" />
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link btn-magnify" to="/auth/login">
                                        <p className="text-danger">로그아웃</p>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default SidebarWithHeader;
