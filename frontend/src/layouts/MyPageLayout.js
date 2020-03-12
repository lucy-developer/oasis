import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../routes';
import notInSidebarRoutes from '../notInSidebarRoutes';
import MyPageHeader from './templates/MyPageHeader';

class MyPageLayout extends React.Component {
    getRoutes = route => {
        const { onUpdate } = this.props;
        const concatRouters = notInSidebarRoutes().concat(route);
        return concatRouters.map((prop, key) => {
            if (prop.collapse) {
                return this.getRoutes(prop.views);
            }
            if (prop.layout === '/my-page') {
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
            <div className="wrapper">
                <MyPageHeader {...this.props} />
                <Switch>{this.getRoutes(routes())}</Switch>
            </div>
        );
    }
}

export default MyPageLayout;
