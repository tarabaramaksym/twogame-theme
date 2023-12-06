/**
 * Adobe page builder compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

/** @namespace Scandiweb/AdobePageBuilder/Util/Functions/escapeHtml */
export const escapeHtml = (unsafe) => unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

/** @namespace Scandiweb/AdobePageBuilder/Util/Functions/makeId */
// eslint-disable-next-line no-magic-numbers
export const makeId = () => Math.random().toString(36).slice(2, 7);

/** @namespace Scandiweb/AdobePageBuilder/Util/Functions/decodeUrl */
export const decodeUrl = (value) => {
    const processedValue = decodeURIComponent((value).replace(window.location.href, ''));
    const regexp = /{{.*\s*url="?(.*\.([a-z|A-Z]*))"?\s*}}/;

    if (!regexp.test(processedValue)) {
        return '';
    }

    const [, url] = regexp.exec(processedValue);
    return `media/${ url}`;
};
