import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Nav, Collapse, Label, Row } from 'reactstrap';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';

import logo from '../../assets/img/logo_w.png';

let ps;

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getCollapseStates(props.routes);
    }

    componentDidMount() {
        // if you are using a Windows Machine, the scrollbars will have a Mac look
        if (navigator.platform.indexOf('Win') > -1) {
            ps = new PerfectScrollbar(this.sidebar, {
                suppressScrollX: true,
                suppressScrollY: false,
            });
        }
    }

    componentWillUnmount() {
        // we need to destroy the false scrollbar when we navigate
        // to a page that doesn't have this component rendered
        if (navigator.platform.indexOf('Win') > -1) {
            ps.destroy();
        }
    }

    // this creates the intial state of this component based on the collapse routes
    // that it gets through this.props.routes
    getCollapseStates = routes => {
        let initialState = {};
        routes.map(prop => {
            if (prop.collapse) {
                initialState = {
                    [prop.state]: this.getCollapseInitialState(prop.views),
                    ...this.getCollapseStates(prop.views),
                    ...initialState,
                };
            }
            return null;
        });
        return initialState;
    };

    // this verifies if any of the collapses should be default opened on a rerender of this component
    // for example, on the refresh of the page,
    // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
    getCollapseInitialState(routes) {
        for (let i = 0; i < routes.length; i += 1) {
            if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
                return true;
            }
            if (window.location.pathname.indexOf(routes[i].path) !== -1) {
                return true;
            }
        }
        return false;
    }

    // this function creates the links and collapses that appear in the sidebar (left menu)
    createLinks = routes => {
        return routes.map((prop, key) => {
            if (prop.redirect) {
                return null;
            }
            if (prop.collapse) {
                const st = {};
                const states = this.state;
                // eslint-disable-next-line react/destructuring-assignment
                st[prop.state] = !states[prop.state];
                return (
                    <li className={this.getCollapseInitialState(prop.views) ? 'active' : ''} key={key}>
                        <a
                            href="#pablo"
                            data-toggle="collapse"
                            aria-expanded={states[prop.state]}
                            onClick={e => {
                                e.preventDefault();
                                this.setState(st);
                            }}
                        >
                            {prop.icon !== undefined ? (
                                <>
                                    <i>
                                        <img className="sidebar-icon" src={prop.icon} alt="sidebar-icon" />
                                    </i>
                                    <p className="sidebar-text">
                                        {prop.name}
                                        <b className="caret" />
                                    </p>
                                </>
                            ) : (
                                <>
                                    <span className="sidebar-mini-icon">{prop.mini}</span>
                                    <span className="sidebar-normal">
                    {prop.name}
                                        <b className="caret" />
                  </span>
                                </>
                            )}
                        </a>
                        <Collapse isOpen={states[prop.state]}>
                            <ul className="nav">{this.createLinks(prop.views)}</ul>
                        </Collapse>
                    </li>
                );
            }
            return (
                <li className={this.activeRoute(prop.layout + prop.path)} key={key}>
                    <NavLink to={prop.layout + prop.path} activeClassName="">
                        {prop.icon !== undefined ? (
                            <>
                                <i className={prop.icon} />
                                <p>{prop.name}</p>
                            </>
                        ) : (
                            <>
                                <span className="sidebar-mini-icon">{prop.mini}</span>
                                <span className="sidebar-normal">{prop.name}</span>
                            </>
                        )}
                    </NavLink>
                </li>
            );
        });
    };

    // verifies if routeName is the one active (in browser input)
    activeRoute = routeName => {
        const { location } = this.props;
        return location.pathname.indexOf(routeName) > -1 ? 'active' : '';
    };

    render() {
        const { bgColor, activeColor, routes } = this.props;
        return (
            <div className="sidebar" data-color={bgColor} data-active-color={activeColor}>
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
                <div
                    className="sidebar-wrapper"
                    ref={ref => {
                        this.sidebar = ref;
                    }}
                >
                    <Nav>{this.createLinks(routes)}</Nav>
                    <Row className="version-label">
                        <Col className="text-center text-white">
                            <Label>{`Version ${process.env.REACT_APP_VERSION}`}</Label>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Sidebar;
