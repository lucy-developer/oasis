import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../routes';
import notInSidebarRoutes from '../notInSidebarRoutes';
import IndexHeader from './templates/IndexHeader';

class IndexLayout extends React.Component {
    getRoutes = route => {
        const { onUpdate } = this.props;
        const concatRouters = notInSidebarRoutes().concat(route);
        return concatRouters.map((prop, key) => {
            if (prop.collapse) {
                return this.getRoutes(prop.views);
            }
            if (prop.layout === '/index') {
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
                <IndexHeader />
                <Switch>{this.getRoutes(routes())}</Switch>
            </>
        );
    }
}

export default IndexLayout;
