/**
 * Adobe page builder compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { escapeHtml } from '../../util/functions';

export const MAP_CONTENT_TYPE = 'map';

export const MAP_SKELETON = [{
    name: 'BaseGoogleMap',
    type: 'div'
}];

export const DEFAULT_ZOOM_LEVEL = 8;
export const DEFAULT_CENTER = {
    lat: 30.2672,
    lng: -97.7431
};

/* eslint-disable no-param-reassign */

/** @namespace Scandiweb/AdobePageBuilder/Component/Map/Config/buildAccessors */
export const buildAccessors = (location) => {
    const { city, state, zipcode: zipCode } = location;
    const cityComma = city !== '' && (zipCode !== '' || state !== '') ? ', ' : '';
    location.areaAddress = city + cityComma + state + zipCode;
};

/** @namespace Scandiweb/AdobePageBuilder/Component/Map/Config/parseLocations */
export const parseLocations = (locationsString) => {
    try {
        const locationsArr = JSON.parse(locationsString);
        // ^^^ We are expecting an array to be returned

        locationsArr.forEach((location) => {
            location.position.lat = parseFloat(location.position.latitude);
            location.position.lng = parseFloat(location.position.longitude);
            buildAccessors(location);
        });

        return locationsArr;
    } catch (e) {
        return [];
    }
};

/** @namespace Scandiweb/AdobePageBuilder/Component/Map/Config/escapeHtmlProps */
export const escapeHtmlProps = (mapProps) => [
    'location_name',
    'comment',
    'phone',
    'address',
    'city',
    'country',
    'state',
    'zipcode'
].reduce((acc, field) => {
    if (!mapProps[field]) {
        return acc;
    }

    return { ...acc, [field]: escapeHtml(mapProps[field]).replace(/(?:\r\n|\r|\n)/g, '<br/>') };
}, mapProps);

/** @namespace Scandiweb/AdobePageBuilder/Component/Map/Config/generateBounds */
export const generateBounds = (googleMap, locations) => {
    if (!locations || locations.length === 0) {
        return null;
    }
    const points = locations.map((l) => l.position);
    const bounds = new googleMap.maps.LatLngBounds();

    points.forEach((point) => {
        bounds.extend(point);
    });

    return bounds;
};
