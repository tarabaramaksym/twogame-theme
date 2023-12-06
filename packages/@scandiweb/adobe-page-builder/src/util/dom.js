/**
 * Adobe page builder compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { decodeUrl, makeId } from './functions';

/** @namespace Scandiweb/AdobePageBuilder/Util/Dom/replaceSpecialDomAttrs */
export const replaceSpecialDomAttrs = (domNode) => {
    const { attribs: domAttrs } = domNode;

    if (!domAttrs || Object.keys(domAttrs).length === 0) {
        return domNode;
    }

    if (!domAttrs['data-background-images']) {
        return domNode;
    }

    try {
        const images = JSON.parse(domAttrs['data-background-images'].replace(/\\(.)/mg, '$1')) || {};
        const uniqClassName = `bg-image-${ makeId() }`;

        // eslint-disable-next-line fp/no-let
        let css = '';

        if (images.desktop_image) {
            // Sometimes Magento returns an stringify object instead of a string. We need to decode to a URL string
            const imageUrl = decodeUrl(images.desktop_image) || images.desktop_image;
            css += `
            .${uniqClassName} {
                background-image: url(${imageUrl});
            }`;
        }

        if (images.mobile_image) {
            const imageUrl = decodeUrl(images.mobile_image) || images.mobile_image;
            css += `
            @media only screen and (max-width: 810px) {
                .${uniqClassName} {
                    background-image: url(${imageUrl});
                }
            }`;
        }

        if (!css) {
            return domNode;
        }

        // Let's add custom CSS it to our <head /> tag
        const { head } = document;
        const style = document.createElement('style');
        head.appendChild(style);
        style.appendChild(document.createTextNode(css));

        // And return modified node
        const newDomNode = { ...domNode };
        newDomNode.attribs.class = `${domNode.attribs.class || ''} ${uniqClassName}`;
        return newDomNode;
    } catch (e) {
        // eslint-disable-next-line no-console
        return domNode;
    }
};
