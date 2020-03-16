import React, { Component } from 'react';
import {Route} from "react-router-dom";
import SideBar from "../layouts/side/SideBar";
import FireWallApply from "../layouts/side/FireWallApply";

// 인덱스 페이지
class Main extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <>
                <SideBar />
                <Route exact path="/firewall/aplly" component={FireWallApply} />
            </>
        );
    }
}

export default Main;