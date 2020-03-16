import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import ReactGA from 'react-ga'; //google웹 로그 분석 모듈
import SidebarWithLayout from './layouts/SidebarWithLayout';
import SidebarWithoutLayout from './layouts/SidebarWithoutLayout';
import MyPageLayout from './layouts/MyPageLayout';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/scss/paper-dashboard.scss';
import RootStore from './stores/RootStore';
import IndexLayout from './layouts/IndexLayout';

const root = new RootStore();

ReactGA.initialize('UA-154674810-1');

const onUpdate = () => {
    ReactGA.set({ page: window.location.hash });
    ReactGA.pageview(window.location.hash);
};

ReactDOM.render(
// 새로고침 사용을 위해 HashRouter 적용
<Provider {...root}>
<HashRouter>
<Switch>
<Route paths="/index" render={props => <IndexLayout {...props} onUpdate={onUpdate} />} />
<Route paths="/auth" render={props => <SidebarWithoutLayout {...props} onUpdate={onUpdate} />} />
<Route paths="/admin" render={props => <SidebarWithLayout {...props} onUpdate={onUpdate} />} />
<Route paths="/my-page" render={props => <MyPageLayout {...props} onUpdate={onUpdate} />} />

<Redirect from="/" to="/index" />
    </Switch>
    </HashRouter>
    </Provider>,
document.getElementById('root'),
);
