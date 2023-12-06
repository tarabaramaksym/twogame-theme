import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Link from 'Component/Link';
import { FormattedMenuItemType } from 'Component/Menu/Menu.type';
import Overlay from 'Component/Overlay';
import { noopFn } from 'Util/Common';

import { MY_ACCOUNT_OPTIONS_KEY_OVERLAY } from './MyAccountOptionsOverlay.config';

import './MyAccountOptionsOverlay.style';

/** @namespace Scandipwa/Component/MyAccountOptionsOverlay/Component */
export class MyAccountOptionsOverlayComponent extends PureComponent {
    static propTypes = {
        staticItems: PropTypes.arrayOf(FormattedMenuItemType).isRequired,
    };

    renderOption(option, isLastChild = false) {
        const {
            icon,
            title,
            url: {
                pathname,
            } = {},
            onClick = noopFn,
            itemId,
        } = option;

        return (
            <>
                { isLastChild && <hr block="MyAccountOptionsOverlay" elem="Divider" /> }
                <li id={ itemId } block="MyAccountOptionsOverlay" elem="Option">
                    <Link to={ pathname } onClick={ onClick }>
                        <span block="MyAccountOptionsOverlay" elem="Icon">{ icon }</span>
                        <span>{ title }</span>
                    </Link>
                </li>
            </>

        );
    }

    renderOptions() {
        const { staticItems } = this.props;
        const myAccountItems = staticItems[1]?.children;
        const myAccountKeys = Object.keys(myAccountItems);

        return (
            <ul block="MyAccountOptionsOverlay" elem="Options">
                { myAccountKeys.map(
                    (key, i) => this.renderOption(myAccountItems[key], i === myAccountKeys.length - 1)
                ) }
            </ul>
        );
    }

    render() {
        return (
            <Overlay
              id={ MY_ACCOUNT_OPTIONS_KEY_OVERLAY }
              mix={ { block: 'MyAccountOptionsOverlay' } }
            //   onVisible={ onVisible }
            //   isStatic={ !isCheckout && isMobile }
            >
                { this.renderOptions() }
            </Overlay>
        );
    }
}

export default MyAccountOptionsOverlayComponent;
