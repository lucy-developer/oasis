import React, { Component } from 'react';
import { Spinner } from 'reactstrap';

class Loader extends Component {
    render() {
        return (
            <div className="loader-page">
                <Spinner />
            </div>
        );
    }
}

export default Loader;
