/**
 * Adobe page builder compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { createElement } from 'react';

import Tab from '../../component/Tab';
import { TAB_CONTENT_TYPE, TAB_SKELETON } from '../../component/Tab/Tab.config';

const addReplacementRule = (originalMember, instance) => ([
    ...originalMember,
    {
        query: { dataContentType: TAB_CONTENT_TYPE },
        replace: (domNode) => (
            createElement(Tab, {
                elements: instance.toReactElements(
                    [domNode],
                    TAB_SKELETON
                ),
            })
        ),
    },
]);

export default {
    'Component/Html/Component': {
        'member-property': {
            rules: addReplacementRule,
        },
    },
};
