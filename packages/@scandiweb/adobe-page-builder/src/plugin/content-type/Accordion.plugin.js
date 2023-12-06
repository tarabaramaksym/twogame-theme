/**
 * Adobe page builder compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { createElement } from 'react';

import Accordion from '../../component/Accordion';
import { ACCORDION_CONTENT_TYPE, ACCORDION_SKELETON } from '../../component/Accordion/Accordion.config';

const addReplacementRule = (originalMember, instance) => ([
    ...originalMember,
    {
        query: { dataContentType: ACCORDION_CONTENT_TYPE },
        replace: (domNode) => (
            createElement(Accordion, {
                elements: instance.toReactElements(
                    [domNode],
                    ACCORDION_SKELETON
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
