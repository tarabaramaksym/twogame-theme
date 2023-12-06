/**
 * Adobe page builder compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { createElement } from 'react';

import Buttons from '../../component/Buttons';
import { BUTTONS_CONTENT_TYPE, BUTTONS_SKELETON } from '../../component/Buttons/Buttons.config';

const addReplacementRule = (originalMember, instance) => ([
    ...originalMember,
    {
        query: { dataContentType: BUTTONS_CONTENT_TYPE },
        replace: (domNode) => (
            createElement(Buttons, {
                elements: instance.toReactElements(
                    [domNode],
                    BUTTONS_SKELETON
                )
            })
        )
    }
]);

export default {
    'Component/Html/Component': {
        'member-property': {
            rules: addReplacementRule
        }
    }
};
