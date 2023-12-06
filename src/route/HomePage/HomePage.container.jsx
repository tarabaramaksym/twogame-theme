import { connect } from 'react-redux';

import InstallPrompt from 'Component/InstallPrompt';
import CmsPage from 'Route/CmsPage';
import {
    HomePageContainer as SourceHomePageContainer,
    mapDispatchToProps,
    mapStateToProps,
} from 'SourceRoute/HomePage/HomePage.container';

export {
    mapStateToProps,
    mapDispatchToProps,
};

/** @namespace Scandipwa/Route/HomePage/Container */
export class HomePageContainer extends SourceHomePageContainer {
    /**
     * Overriden to remove duplicate footer
     */
    render() {
        return (
            <div block="HomePage">
                <InstallPrompt />
                <CmsPage { ...this.containerProps() } />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
