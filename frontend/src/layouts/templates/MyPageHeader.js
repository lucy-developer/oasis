import React from 'react';
import classnames from 'classnames';
import { Collapse, Navbar, NavItem, Nav, Container } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/logo_w.png';

class MyPageHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseOpen: false,
            color: 'bg-default',
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
                color: 'bg-default',
            });
        } else {
            this.setState({
                color: 'bg-default',
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
            newState.color = 'bg-default';
        } else {
            newState.color = 'bg-default';
        }
        this.setState(newState);
    };

    render() {
        const { color, collapseOpen } = this.state;
        return (
            <>
                <Navbar className={classnames('navbar-absolute fixed-top', color)} expand="lg">
                    <Container fluid>
                        <div className="logo text-center">
                            <NavLink
                                to={localStorage.getItem('userRole') === 'STAFF' ? '/admin/commute/staff/' : '/admin/dashboard'}
                                className="simple-text logo-normal"
                                // style={{ position: 'relative', left: '-33px', height: '49px' }}
                                style={{ position: 'relative', height: '49px' }}
                            >
                                <img className="custom-logo" src={logo} alt="logo" />
                            </NavLink>
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
                            <span className="navbar-toggler-bar navbar-kebab my-page-kebab" />
                            <span className="navbar-toggler-bar navbar-kebab my-page-kebab" />
                            <span className="navbar-toggler-bar navbar-kebab my-page-kebab" />
                        </button>
                        <Collapse className="justify-content-end" navbar isOpen={collapseOpen}>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink to="/my-page" className="nav-link btn-magnify custom-mypage">
                                        {`${localStorage.getItem('userName')} 담당자님 환영합니다.`}
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link btn-magnify custom-mypage" to="/my-page">
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

export default MyPageHeader;
