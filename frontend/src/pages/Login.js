import React, { Component } from 'react';

import { NavLink, Route } from "react-router-dom";
import LoginForm from "../components/common/LoginForm";
import AdminLoginForm from "../components/common/AdminLoginForm";
import logo from '../assets/img/oasis_logo_login.png';

//import backgroundImage from '../assets/img/background-image.png';

// 인덱스 페이지
class Login extends Component {

    componentDidMount() {
        const { onUpdate } = this.props;
        onUpdate();
    }

    render() {
        const { history } = this.props;
        return (
            <div>
                <div className="oasis-img">
                    <div className="login-logo">
                        <img width="293" height="102" src={logo} alt="logo" />
                    </div>
                </div>

                <div className="login">
                    <div className='form-signin'>
                        <h2 className="form-logo"> Login </h2>

                        <div className='login-select'>
                            <ul className='login-ul'>
                                <NavLink exact to="/auth/login" className="item" activeClassName="active"><li>User Login</li></NavLink>
                                <NavLink to="/auth/login/admin" className="item" activeClassName="active"><li>Admin Login</li></NavLink>
                            </ul>
                        </div>

                        <div className='user-login'>
                            <Route exact path="/auth/login" component={LoginForm} />
                            <Route path="/auth/login/admin" component={AdminLoginForm} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
