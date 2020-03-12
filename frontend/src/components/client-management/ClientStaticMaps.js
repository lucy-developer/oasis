import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class ClientStaticMaps extends Component {
    renderMap = () => {
        setTimeout(() => {
            const { store } = this.props;
            const targetWindow = document.getElementsByName('static-maps')[0].contentWindow;
            if (store.detailData.place) {
                targetWindow.postMessage(
                    JSON.stringify({
                        method: 'staticMap',
                        args: {
                            latitude: store.detailData.place.latitude,
                            longitude: store.detailData.place.longitude,
                            placeName: store.detailData.name,
                            address: store.detailData.place.address,
                            zoom: 3,
                            zoomControl: true,
                        },
                    }),
                    '*',
                );
            }
        }, 100);
    };

    render() {
        return (
            <div>
                <iframe
                    name="static-maps"
                    width="100%"
                    height="400px"
                    frameBorder="0"
                    title="고객사 지도"
                    src="../kakaomap.html"
                    onLoad={this.renderMap}
                />
            </div>
        );
    }
}

export default ClientStaticMaps;
