import PropTypes from 'prop-types';

import {
    CartItemPriceComponent as SourceCartItemPriceComponent,
} from 'SourceComponent/CartItemPrice/CartItemPrice.component';
import { formatPrice, roundPrice } from 'Util/Price';

import './CartItemPrice.override.style';

/** @namespace Scandipwa/Component/CartItemPrice/Component */
export class CartItemPriceComponent extends SourceCartItemPriceComponent {
    static propTypes = {
        baseRowTotal: PropTypes.number.isRequired,
    };

    /**
     * New method to add discount to cart item price if it is the CartOverlay item
     */
    renderHighPrice() {
        const {
            baseRowTotal,
            price,
            currency_code,
            mix: { mods: { isCartOverlay } },
        } = this.props;
        const value = roundPrice(baseRowTotal);

        if (!isCartOverlay) {
            return null;
        }

        if (price === value) {
            return null;
        }

        return (
            <span
              aria-label={ __('Old product price') }
              block="CartItemPrice"
              elem="HighPrice"
            >
                <data value={ value }><del>{ formatPrice(baseRowTotal, currency_code) }</del></data>
            </span>
        );
    }

    /**
     * Overridden to add mods
     */
    renderPrice() {
        const { price, currency_code } = this.props;
        const value = roundPrice(price);

        return (
            <span block="CartItemPrice" elem="Price" aria-label={ __('Current product price') }>
                <data value={ value }>{ formatPrice(price, currency_code) }</data>
            </span>
        );
    }

    /**
     * New method to render discount percentage if it is the CartOverlay item
     */
    renderDiscountPercentage() {
        const { discountPercentage, mix: { mods: { isCartOverlay } } } = this.props;

        if (!isCartOverlay) {
            return null;
        }

        return (
            <div block="ProductPrice" elem="DiscountPercentage">{ __('-%s%', discountPercentage) }</div>
        );
    }

    /**
     * Overridden to render old price if it is the CartOverlay item.
     */
    render() {
        const {
            mix,
            price,
            baseRowTotal,
            mix: { mods: isCartOverlay },
        } = this.props;

        // Item has no discount
        // eslint-disable-next-line eqeqeq
        if (roundPrice(price) === roundPrice(baseRowTotal) || baseRowTotal === 0) {
            return super.render();
        }

        if (!isCartOverlay) {
            return super.render();
        }

        // Item has discount
        return (
            <p block="ProductPrice" mods={ { hasDiscount: true } } aria-label={ __('Product Price') } mix={ mix }>
                { this.renderDiscountPercentage() }
                <div block="ProductPrice" elem="PriceWrapper">
                    { this.renderHighPrice() }
                    { this.renderPrice() }
                </div>
            </p>
        );
    }
}

export default CartItemPriceComponent;
