import PropTypes from 'prop-types';

import { Device as SourceDevice } from 'SourceType/Device.type';

export * from 'SourceType/Device.type';

export interface Device extends SourceDevice {
    isDesktop: boolean;
}

// Support for compatibility

export const DeviceType = PropTypes.shape({
    isMobile: PropTypes.bool,
    isDesktop: PropTypes.bool,
    android: PropTypes.bool,
    ios: PropTypes.bool,
    blackberry: PropTypes.bool,
    opera: PropTypes.bool,
    safari: PropTypes.bool,
    windows: PropTypes.bool,
    standaloneMode: PropTypes.bool,
});
