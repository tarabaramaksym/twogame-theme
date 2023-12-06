/**
 * Adobe page builder compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { PagebuilderElementType } from '../../type/Elements.type';
import Map from './Map.component';
import {
    DEFAULT_ZOOM_LEVEL,
    escapeHtmlProps,
    generateBounds,
    parseLocations
} from './Map.config';

/** @namespace Scandiweb/AdobePageBuilder/Component/Map/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    apiKey: state.ConfigReducer.pageBuilderConfig.googleMapsApiKey,
    styles: state.ConfigReducer.pageBuilderConfig.googleMapsStyle
});

/** @namespace Scandiweb/AdobePageBuilder/Component/Map/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Scandiweb/AdobePageBuilder/Component/Map/Container */
export class MapContainer extends PureComponent {
    static propTypes = {
        apiKey: PropTypes.string.isRequired,
        styles: PropTypes.string.isRequired,
        elements: PagebuilderElementType.isRequired
    };

    containerFunctions = {};

    getStyles() {
        const { styles } = this.props;

        try {
            return JSON.parse(styles);
        } catch (e) {
            return [];
        }
    }

    containerProps() {
        const {
            apiKey,
            elements: {
                BaseGoogleMap: {
                    propsBag,
                    Ele
                }
            }
        } = this.props;

        const mapProps = escapeHtmlProps((propsBag && propsBag[0]) || {});
        const locations = parseLocations(mapProps['data-locations']);
        const options = {
            styles: this.getStyles(),
            scrollwheel: true,
            disableDoubleClickZoom: false,
            disableDefaultUI: mapProps['data-show-controls'] !== 'true',
            mapTypeControl: mapProps['data-show-controls'] === 'true'
        };

        return {
            element: Ele,
            apiKey,
            locations,
            options,
            zoom: DEFAULT_ZOOM_LEVEL

        };
    }

    render() {
        return (
            <Map
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
