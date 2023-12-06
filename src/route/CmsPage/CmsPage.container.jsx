import { connect } from 'react-redux';

import {
    CmsPageContainer as SourceCmsPageContainer,
    mapDispatchToProps,
    mapStateToProps,
} from 'SourceRoute/CmsPage/CmsPage.container';

import './CmsPage.override.style';

export {
    mapStateToProps,
    mapDispatchToProps,
};

/** @namespace Scandipwa/Route/CmsPage/Container */
export class CmsPageContainer extends SourceCmsPageContainer {
    /**
     * Overridden to remove check for already preloaded pages from action
     */
    requestPage() {
        const { requestPage } = this.props;
        const params = this.getRequestQueryParams();
        const { id, identifier = '' } = params;
        // const {
        //     actionName: {
        //         id: pageId = null,
        //         cmsPage: {
        //             identifier: pageIdentifier = null,
        //         } = {},
        //     } = {},
        // } = window;

        if (!id && (!identifier && !identifier !== '')) {
            return;
        }

        // TODO: this code causes issue when going from Home page to some other cms page and back to homepage.
        // I assume issue happens with all pages for which this check is valid. Wasn't able to come up with fix.
        // This does need to be looked into more and properly fixed.
        // https://scandiflow.atlassian.net/browse/G2-53

        // vvv check if cms page was already loaded from action
        // if (
        //     id === pageId
        //     || identifier.replace(/^\/+/, '') === pageIdentifier
        // ) {
        //     return;
        // }

        requestPage(params);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CmsPageContainer);
