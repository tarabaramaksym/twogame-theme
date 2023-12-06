/**
 * Adobe page builder compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { PropTypes } from 'prop-types';
import { PureComponent } from 'react';

import ExpandableContent from 'Component/ExpandableContent';

/** @namespace Scandiweb/AdobePageBuilder/Component/Accordion/Component */
export class AccordionComponent extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
            PropTypes.array,
        ]).isRequired,
        isDesktopDisabled: PropTypes.number.isRequired,
    };

    render() {
        const {
            title,
            content,
            isDesktopDisabled,
        } = this.props;

        return (
            <ExpandableContent
              heading={ title }
              isVisibleOnDesktop={ !isDesktopDisabled }
              isArrow
              mix={ { block: 'Accordion' } }
            >
                <p>{ content }</p>
            </ExpandableContent>
        );
    }
}

export default AccordionComponent;
