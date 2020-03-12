import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SidebarWithoutHeader from './templates/SidebarWithoutHeader';
import routes from '../routes';
import notInSidebarRoutes from '../notInSidebarRoutes';
import SidebarWithoutFooter from './templates/SidebarWithoutFooter';

class SidebarWithoutLayout extends React.Component {
    getRoutes = route => {
        const { onUpdate } = this.props;
        const concatRouters = notInSidebarRoutes().concat(route);
        return concatRouters.map((prop, key) => {
            if (prop.collapse) {
                return this.getRoutes(prop.views);
            }
            if (prop.layout === '/auth') {
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

    render() {
        return (
            <>
                <SidebarWithoutHeader />
                <div
                    className="wrapper wrapper-full-page"
                    ref={ref => {
                        this.mainPanel = ref;
                    }}
                >
                    <div className="full-page section-image">
                        <Switch>{this.getRoutes(routes())}</Switch>
                        <SidebarWithoutFooter fluid />
                    </div>
                </div>
            </>
        );
    }
}

export default SidebarWithoutLayout;
