/**
 * Adobe page builder compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';

export const PagebuilderElementType = PropTypes.objectOf(PropTypes.shape({
    // TODO: fix prop types
    propsBag: PropTypes.arrayOf(PropTypes.shape({})),
    childData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    childEleBag: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])),
    Ele: PropTypes.element
}));
