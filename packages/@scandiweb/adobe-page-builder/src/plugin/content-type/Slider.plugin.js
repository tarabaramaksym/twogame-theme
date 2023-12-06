/**
 * Adobe page builder compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { createElement } from 'react';

import Slider from '../../component/Slider';
import { SLIDER_CONTENT_TYPE, SLIDER_SKELETON } from '../../component/Slider/Slider.config';

const addReplacementRule = (originalMember, instance) => ([
    ...originalMember,
    {
        query: { dataContentType: SLIDER_CONTENT_TYPE },
        replace: (domNode) => (
            createElement(Slider, {
                elements: instance.toReactElements(
                    [domNode],
                    SLIDER_SKELETON
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
