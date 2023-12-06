/**
 * Adobe page builder compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

/* eslint-disable @scandipwa/scandipwa-guidelines/only-render-in-component */

import { createRef, PureComponent } from 'react';

import { PagebuilderElementType } from '../../type/Elements.type';

/** @namespace Scandiweb/AdobePageBuilder/Component/Buttons/Component */
export class ButtonsComponent extends PureComponent {
    static propTypes = {
        elements: PagebuilderElementType.isRequired
    };

    componentDidMount() {
        const {
            elements: {
                BaseButtons
            }
        } = this.props;

        const { propsBag } = BaseButtons;
        const isSameWidth = propsBag && propsBag[0] && propsBag[0]['data-same-width'] === 'true';

        if (isSameWidth) {
            this.equalizeButtonWidth();
        }
    }

    __construct(props) {
        super.__construct(props);
        this.ref = createRef();
    }

    equalizeButtonWidth() {
        const buttonList = this.ref.current.querySelectorAll(
            '[data-element="link"], [data-element="empty_link"]'
        );

        const buttonMinWidth = buttonList.reduce((acc, { offsetWidth }) => {
            if (offsetWidth > buttonMinWidth) {
                return offsetWidth;
            }

            return acc;
        });

        buttonList.forEach((_, idx) => {
            buttonList[idx].style['min-width'] = `${buttonMinWidth }px`;
        });
    }

    render() {
        const { elements: { BaseButtons } } = this.props;

        return (
          <BaseButtons.Ele ref={ this.ref }>
            { BaseButtons.childEleBag[0] }
          </BaseButtons.Ele>
        );
    }
}

export default ButtonsComponent;
