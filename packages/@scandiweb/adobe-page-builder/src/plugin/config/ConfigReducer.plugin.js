/**
 * Adobe page builder compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { UPDATE_CONFIG } from 'SourceStore/Config/Config.action';

const addPageBuilderConfigToState = (args, callback) => ({
    ...callback(...args),
    pageBuilderConfig: {}
});

const getPageBuilderConfigFromAction = (args, callback) => {
    const [, action] = args;
    const { type, config: { pageBuilderConfig } = {} } = action;

    if (type !== UPDATE_CONFIG) {
        return callback(...args);
    }

    return {
        ...callback(...args),
        pageBuilderConfig
    };
};

export default {
    'Store/Config/Reducer/getInitialState': {
        function: addPageBuilderConfigToState
    },
    'Store/Config/Reducer/ConfigReducer': {
        function: getPageBuilderConfigFromAction
    }
};
