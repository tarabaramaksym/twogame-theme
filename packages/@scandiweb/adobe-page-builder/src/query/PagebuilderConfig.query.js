/**
 * Adobe page builder compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { Field } from 'Util/Query';

/** @namespace Scandiweb/AdobePageBuilder/Query/PagebuilderConfig/Query */
export class PagebuilderConfigQuery {
    getQuery() {
        return new Field('pageBuilderConfig')
            .addFieldList(this.getConfigFields());
    }

    getConfigFields() {
        return [
            'googleMapsApiKey',
            'googleMapsStyle'
        ];
    }
}

export default new PagebuilderConfigQuery();
