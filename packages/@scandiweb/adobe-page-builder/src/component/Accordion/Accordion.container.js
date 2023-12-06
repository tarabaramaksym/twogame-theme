/**
 * Adobe page builder compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { PureComponent } from 'react';

import { PagebuilderElementType } from '../../type/Elements.type';
import Accordion from './Accordion.component';

/** @namespace Scandiweb/AdobePageBuilder/Component/Accordion/Container */
export class AccordionContainer extends PureComponent {
    static propTypes = {
        elements: PagebuilderElementType.isRequired,
    };

    containerProps() {
        const {
            elements: {
                BaseAccordion: {
                    propsBag: [{
                        'data-accordion-desktop-disabled': isDesktopDisabled = 0,
                    }] = [],
                },
                ExpandableContent: {
                    childEleBag: [
                        title = '',
                        content = {},
                    ] = [],
                },
            },
        } = this.props;

        return {
            title,
            content,
            isDesktopDisabled,
        };
    }

    render() {
        return (
            <Accordion
              { ...this.containerProps() }
            />
        );
    }
}

export default AccordionContainer;
