/**
 * Adobe page builder compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import {
    GoogleApiWrapper as withGoogleApiWrapper,
    InfoWindow,
    Map,
    Marker,
} from 'google-maps-react';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { generateBounds } from './Map.config';

/** @namespace Scandiweb/AdobePageBuilder/Component/Map/Component */
export class MapComponent extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/forbid-prop-types
        google: PropTypes.any.isRequired,
        element: PropTypes.element.isRequired,
        locations: PropTypes.arrayOf(PropTypes.shape({
            location_name: PropTypes.string,
            comment: PropTypes.string,
            phone: PropTypes.string,
            address: PropTypes.string,
            areaAddress: PropTypes.string,
            country: PropTypes.string,
            position: PropTypes.shape({
                longitude: PropTypes.number,
                lat: PropTypes.number,
                latitude: PropTypes.number,
                lng: PropTypes.number,
            }),
        })).isRequired,
        options: PropTypes.shape({}).isRequired,
        zoom: PropTypes.number.isRequired,
    };

    __construct(props) {
        super.__construct(props);

        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            activeLocationIdx: undefined,
        };
    }

    onMarkerClick = ({ marker }, index) => this.setState({
        activeMarker: marker,
        activeLocationIdx: index,
        showingInfoWindow: true,
    });

    onMapClicked = () => {
        const { showingInfoWindow } = this.state;

        if (!showingInfoWindow) {
            return;
        }

        this.setState({
            showingInfoWindow: false,
            activeMarker: null,
        });
    };

    renderMarker = (location, index) => {
        const { location_name: name, position } = location;

        return (
            <Marker
              key={ JSON.stringify(position) }
              name={ name }
              title={ name }
              position={ position }
              // eslint-disable-next-line react/jsx-no-bind
              onClick={ (_props, marker) => this.onMarkerClick({ marker }, index) }
            />
        );
    };

    renderLocation() {
        const { locations } = this.props;
        const { activeLocationIdx } = this.state;

        const {
            location_name,
            comment,
            phone,
            address,
            areaAddress,
            country,
        } = locations[activeLocationIdx];

        return (
            <div>
                <h3>{ location_name }</h3>
                <p>{ comment }</p>
                <p>{ __('Phone: %s', phone) }</p>
                <p>
                    <span>
                        { address }
                        <br />
                        { areaAddress }
                        <br />
                        { country }
                    </span>
                </p>
            </div>
        );
    }

    renderInfoWindow() {
        const { locations } = this.props;

        const {
            activeLocationIdx,
            showingInfoWindow,
            activeMarker,
        } = this.state;

        const activeLocation = locations[activeLocationIdx];

        if (!activeLocation) {
            return null;
        }

        return (
            <InfoWindow marker={ activeMarker } visible={ showingInfoWindow }>
                { this.renderLocation() }
            </InfoWindow>
        );
    }

    renderMarkers() {
        const { locations } = this.props;

        return locations.map(this.renderMarker);
    }

    onMapMount = (mapRef) => {
        if (!mapRef) {
            return;
        }

        const { map } = mapRef;
        const { google, locations } = this.props;
        map?.fitBounds(generateBounds(google, locations));
    };

    render() {
        const {
            google,
            element: Element,
            options,
            zoom,
            locations,
        } = this.props;

        return (
            <Element>
                <Map
                  ref={ this.onMapMount }
                  options={ options }
                  google={ google }
                  zoom={ zoom }
                  onClick={ this.onMapClicked }
                  initialCenter={ locations[0]?.position }
                >
                    { this.renderMarkers() }
                    { this.renderInfoWindow() }
                </Map>
            </Element>
        );
    }
}

export default withGoogleApiWrapper(({ apiKey }) => ({ apiKey }))(MapComponent);
