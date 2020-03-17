import React, { Component } from 'react';
import { NavLink, Route } from "react-router-dom";
import logo from '../../assets/img/oasis_logo.png';
import '../../assets/scss/SideBar.scss';

class SideBar extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <>
                <div className="sidebar-layout">
                    <div className="sideBar-logo">
                        <img width="124" height="44" src={logo} alt="logo" />
                    </div>

                    <div>
                        <ul>
                            <li>
                                <NavLink exact to="/firewall/aplly" className="item" activeClassName="sidebar-active">
                                    신청
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}

export default SideBar;