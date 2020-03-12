import React, { Component } from 'react';

class ClientDynamicMaps extends Component {
    renderMap = async () => {
        const { store } = this.props;

        const targetWindow = document.getElementsByName('dynamic-maps')[0].contentWindow;
        // eslint-disable-next-line no-unused-expressions
        store.info.place
            ? targetWindow.postMessage(
            JSON.stringify({
                method: 'dynamicMap',
                args: {
                    latitude: store.info.place.latitude,
                    longitude: store.info.place.longitude,
                    placeName: store.info.name,
                    address: store.info.place.address,
                    zoom: 5,
                    zoomControl: true,
                },
            }),
            '*',
            )
            : null;

        window.addEventListener(
            'message',
            e => {
                if (typeof e.data === 'string') {
                    const parseData = JSON.parse(e.data);
                    const data = {
                        latitude: parseData.latitude,
                        altitude: 0,
                        longitude: parseData.longitude,
                        roadAddressName: parseData.road_address ? parseData.road_address.address_name : '',
                        zipCode: parseData.address.zip_code ? parseData.address.zip_code : '',
                        addressName: parseData.address.address_name,
                        region1: parseData.address.region_1depth_name,
                        region2: parseData.address.region_2depth_name,
                        region3: parseData.address.region_3depth_name,
                        zoneNo: parseData.road_address ? parseData.road_address.zone_no : '',
                    };
                    store.handleClickPlaceInfo(data);
                }
            },
            false,
        );
    };

    render() {
        return (
            <div>
                <iframe
                    name="dynamic-maps"
                    width="100%"
                    height="250px"
                    frameBorder="0"
                    title="고객사 지도"
                    src="../kakaomap.html"
                    onLoad={this.renderMap}
                />
            </div>
        );
    }
}

export default ClientDynamicMaps;
