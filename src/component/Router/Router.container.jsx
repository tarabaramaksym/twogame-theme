import { connect } from 'react-redux';

import {
    mapDispatchToProps,
    mapStateToProps,
    RouterContainer as SourceRouterContainer,
} from 'SourceComponent/Router/Router.container';
import { isMobile, isMobileClientHints, isUsingClientHints } from 'Util/Mobile';

export {
    mapStateToProps,
    mapDispatchToProps,
};

/** @namespace Scandipwa/Component/Router/Container */
export class RouterContainer extends SourceRouterContainer {
    /**
     * Overridden to add isDesktop condition
     */
    async handleResize() {
        const { updateConfigDevice } = this.props;

        if (isUsingClientHints) {
            const { platform, model } = await isMobileClientHints.getDeviceData();

            updateConfigDevice({
                isMobile: isMobile.any(),
                isDesktop: isMobile.desktop(),
                android: isMobile.android(platform),
                ios: isMobile.iOS(platform),
                blackberry: isMobile.blackBerry(model),
                opera: isMobile.opera(model),
                safari: isMobile.safari(model),
                windows: isMobile.windows(model),
            });
        } else {
            updateConfigDevice({
                isMobile: isMobile.any(),
                isDesktop: isMobile.desktop(),
                android: isMobile.android(),
                ios: isMobile.iOS(),
                blackberry: isMobile.blackBerry(),
                opera: isMobile.opera(),
                safari: isMobile.safari(),
                windows: isMobile.windows(),
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterContainer);
