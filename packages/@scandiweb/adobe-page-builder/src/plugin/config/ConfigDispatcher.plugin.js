/**
 * Adobe page builder compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PagebuilderConfigQuery from '../../query/PagebuilderConfig.query';

const addPagebuilderConfigToRequest = (args, callback) => ([
    ...callback(...args),
    PagebuilderConfigQuery.getQuery()
]);

export default {
    'Store/Config/Dispatcher': {
        'member-function': {
            prepareRequest: addPagebuilderConfigToRequest
        }
    }
};
