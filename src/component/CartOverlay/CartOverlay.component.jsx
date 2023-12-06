import { Page } from 'Component/Header/Header.config';
import Link from 'Component/Link';
import Overlay from 'Component/Overlay';
import { CART_URL } from 'Route/CartPage/CartPage.config';
import {
    CartOverlayComponent as SourceCartOverlayComponent,
} from 'SourceComponent/CartOverlay/CartOverlay.component';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import { formatPrice } from 'Util/Price';

import './CartOverlay.override.style';

/** @namespace Scandipwa/Component/CartOverlay/Component */
export class CartOverlayComponent extends SourceCartOverlayComponent {
    /**
     * New function to render the Checkout button and total price
     */
    renderHeader() {
        const { totals: { items = [] } = {} } = this.props;

        if (items.length < 1) {
            return null;
        }

        return (
            <div block="CartOverlay" elem="Header">
                { this.renderCartInfo() }
                <Link
                  block="CartOverlay"
                  elem="Checkout"
                  mix={ { block: 'Button' } }
                  to={ CART_URL }
                >
                    { __('Proceed to Checkout') }
                </Link>
            </div>
        );
    }

    /**
     * New function to render current items and total price
     */
    renderCartInfo() {
        const {
            totals:
            {
                total_quantity = 0,
                prices: {
                    grand_total: {
                        value = 0,
                        currency = GQLCurrencyEnum.USD,
                    } = {},
                } = {},
            } = {},
        } = this.props;

        return (
            <div block="CartOverlay" elem="CartInfo">
                <div block="CartOverlay" elem="CartText">
                    <p block="CartOverlay" elem="HeaderText">{ __('Your shopping cart') }</p>
                    <strong block="CartOverlay" elem="ItemsCount">{ __('%s items added', total_quantity) }</strong>
                </div>
                <strong block="CartOverlay" elem="Totals">
                    { formatPrice(value, GQLCurrencyEnum[currency]) }
                </strong>
            </div>
        );
    }

    /**
     * Overriden to remove renderPromo and renderCartAdditional functions invocation
     * To invoke the newly created renderHeader function
     * To render a div instead of the Overlay component on mobile
     */
    render() {
        const { isMobile, changeHeaderState } = this.props;

        if (isMobile) {
            return (
                <div block="CartOverlay">
                    <div block="CartOverlay" elem="ContentWrapper">
                        { this.renderHeader() }
                        { this.renderCartItems() }
                    </div>
                </div>
            );
        }

        return (
            <Overlay
              id={ Page.CART_OVERLAY }
              onVisible={ changeHeaderState }
              mix={ { block: 'CartOverlay' } }
            >
                <div block="CartOverlay" elem="ContentWrapper">
                    { this.renderHeader() }
                    { this.renderCartItems() }
                </div>
            </Overlay>
        );
    }
}

export default CartOverlayComponent;
