import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class ClientStaticDetailMaps extends Component {
    renderMap = async () => {
        const { store } = this.props;
        const targetWindow = document.getElementsByName('static-maps-modal')[0].contentWindow;
        targetWindow.postMessage(
            JSON.stringify({
                method: 'staticMap',
                args: {
                    latitude: store.detailInfo.checkedIn.location.place.latitude,
                    longitude: store.detailInfo.checkedIn.location.place.longitude,
                    placeName: '방문 위치',
                    address: store.detailInfo.checkedIn.location.place.address,
                    zoom: 3,
                    zoomControl: true,
                },
            }),
            '*',
        );
    };

    render() {
        return (
            <div>
                <iframe
                    name="static-maps-modal"
                    width="100%"
                    height="200px"
                    frameBorder="0"
                    title="고객사 지도"
                    src="../kakaomap.html"
                    onLoad={this.renderMap}
                />
            </div>
        );
    }
}

export default ClientStaticDetailMaps;
