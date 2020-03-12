import React from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
import { Route, Switch } from 'react-router-dom';

import SidebarWithFooter from './templates/SidebarWithFooter';
import Sidebar from './templates/Sidebar';

import routes from '../routes';
import notInSidebarRoutes from '../notInSidebarRoutes';
import SidebarWithHeader from './templates/SidebarWithHeader';

let ps;

class SidebarWithLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: 'brown',
            activeColor: 'danger',
            sidebarMini: false,
        };
    }

    componentDidMount() {
        if (navigator.platform.indexOf('Win') > -1) {
            document.documentElement.className += ' perfect-scrollbar-on';
            document.documentElement.classList.remove('perfect-scrollbar-off');
            ps = new PerfectScrollbar(this.mainPanel);
        }
    }

    componentDidUpdate(e) {
        if (e.history.action === 'PUSH') {
            document.documentElement.scrollTop = 0;
            document.scrollingElement.scrollTop = 0;
            this.mainPanel.scrollTop = 0;
        }
    }

    componentWillUnmount() {
        if (navigator.platform.indexOf('Win') > -1) {
            ps.destroy();
            document.documentElement.className += ' perfect-scrollbar-off';
            document.documentElement.classList.remove('perfect-scrollbar-on');
        }
    }

    getRoutes = route => {
        const { onUpdate } = this.props;
        const concatRouters = notInSidebarRoutes().concat(route);
        return concatRouters.map((prop, key) => {
            if (prop.collapse) {
                return this.getRoutes(prop.views);
            }
            if (prop.layout === '/admin') {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        render={props => <prop.component onUpdate={onUpdate} {...props} />}
                        key={key}
                    />
                );
            }
            return null;
        });
    };

    handleActiveClick = color => {
        this.setState({ activeColor: color });
    };

    handleBgClick = color => {
        this.setState({ backgroundColor: color });
    };

    handleMiniClick = () => {
        if (document.body.classList.contains('sidebar-mini')) {
            this.setState({ sidebarMini: false });
        } else {
            this.setState({ sidebarMini: true });
        }
        document.body.classList.toggle('sidebar-mini');
    };

    render() {
        const { backgroundColor, activeColor, sidebarMini } = this.state;
        const { location } = this.props;
        return (
            <div className="wrapper">
                <Sidebar {...this.props} routes={routes()} bgColor={backgroundColor} activeColor={activeColor} />
                <div
                    className="main-panel"
                    ref={ref => {
                        this.mainPanel = ref;
                    }}
                >
                    <SidebarWithHeader {...this.props} handleMiniClick={this.handleMiniClick} sidebarMini={sidebarMini} />
                    <Switch>{this.getRoutes(routes())}</Switch>
                    {location.pathname.indexOf('full-screen-map') !== -1 ? null : <SidebarWithFooter fluid />}
                </div>
            </div>
        );
    }
}

export default SidebarWithLayout;
