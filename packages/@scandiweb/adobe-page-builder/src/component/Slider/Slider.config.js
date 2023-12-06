/**
 * Adobe page builder compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

export const SLIDER_CONTENT_TYPE = 'slider';

export const SLIDER_SKELETON = [{
    name: 'BaseSlider',
    type: 'div',
    isLoopParent: true,
    children: [
        { name: 'Slide', type: 'div' }
    ]
}];

export const DEFAULT_AUTOPLAY_DURATION_MS = 5000;
