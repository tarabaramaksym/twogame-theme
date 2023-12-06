/**
 * Adobe page builder compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

export const TAB_CONTENT_TYPE = 'tabs';

export const TAB_SKELETON = [{
    name: 'BaseTabs',
    type: 'div',
    children: [
        {
            name: 'TabMenu',
            type: 'ul',
            isLoopParent: true,
            children: [
                {
                    name: 'TabMenuHeader',
                    type: 'li',
                    children: [
                        {
                            name: 'TabMenuLink',
                            type: 'a',
                            children: [
                                { name: 'TabMenuTitle', type: 'span' }
                            ]
                        }
                    ]
                }
            ]
        }, {
            name: 'TabContent',
            type: 'div',
            isLoopParent: true,
            children: [
                { name: 'TabItem', type: 'div' }
            ]
        }
    ]
}];
