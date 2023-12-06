import PropTypes from 'prop-types';

import CartItemPrice from 'Component/CartItemPrice';
import TrashIcon from 'Component/TrashIcon';
import {
    CartItemComponent as SourceCartItemComponent,
} from 'SourceComponent/CartItem/CartItem.component';

import './CartItem.override.style';

/** @namespace Scandipwa/Component/CartItem/Component */
export class CartItemComponent extends SourceCartItemComponent {
    static propTypes = {
        isCart: PropTypes.bool.isRequired,
        index: PropTypes.number.isRequired,
    };

    /**
     * Overriden to render a different button if it is CartPage item
     */
    renderDeleteButton() {
        const { isCart, handleRemoveItem, isCartOverlay } = this.props;

        if (isCart) {
            return (
                <button
                  block="CartItem"
                  id="RemoveItem"
                  name="RemoveItem"
                  elem="Delete"
                  aria-label="Remove item from cart"
                  onClick={ handleRemoveItem }
                >
                    <TrashIcon />
                    <span block="CartItem" elem="DeleteButtonText">
                        { __('Remove from cart') }
                    </span>
                </button>
            );
        }

        if (isCartOverlay) {
            return (
                <button
                  block="CartItem"
                  id="RemoveItem"
                  name="RemoveItem"
                  elem="Delete"
                  aria-label="Remove item from cart"
                  onClick={ handleRemoveItem }
                >
                    { __('Remove') }
                </button>
            );
        }

        return super.renderDeleteButton();
    }

    /**
     * Overriden to always invoke renderDesktopContent if it is the CartPage item
     */
    renderWrapperContent() {
        return this.renderDesktopContent();
    }

    /**
     * Overriden to render a different version of CartItem if it is a CartPage item
     */
    renderDesktopContent() {
        const { isCart, isCartOverlay } = this.props;

        if (isCart) {
            return (
                <div block="CartItem" elem="Wrapper" mods={ { isCart } }>
                    { this.renderCartIndex() }
                    <div block="CartItem" elem="ProductInfo">
                        { this.renderImage() }
                        <div block="CartItem" elem="TitleContainer">
                            { this.renderTitle() }
                            { this.renderProductPrice() }
                        </div>
                    </div>
                    <div
                      block="CartItem"
                      elem="ProductActions"
                    >
                        { this.renderDeleteButton() }
                    </div>
                </div>
            );
        }

        if (isCartOverlay) {
            return (
                <div block="CartItem" elem="Wrapper" mods={ { isCart: true } }>
                    <div block="CartItem" elem="ProductInfo">
                        { this.renderImage() }
                        <div block="CartItem" elem="TitleContainer">
                            { this.renderTitle() }
                            { this.renderProductPrice() }
                        </div>
                    </div>
                    { this.renderDeleteButton() }
                </div>
            );
        }

        return super.renderDesktopContent();
    }

    /**
     * New function to render the cart index if it is the CartPage
     */
    renderCartIndex() {
        const { isCart, index } = this.props;

        if (!isCart) {
            return null;
        }

        return <div block="CartItem" elem="Index">{ `0${index}` }</div>;
    }

    /**
     * Overridden to pass baseRowTotal
     */
    renderProductPrice() {
        const {
            currency_code,
            item: {
                prices: {
                    row_total: {
                        value: row_total = 0,
                    } = {},
                    row_total_including_tax: {
                        value: row_total_incl_tax = 0,
                    } = {},
                } = {},
            },
            isCartOverlay,
            isMobileLayout,
            baseRowTotal,
        } = this.props;

        return (
            <CartItemPrice
              row_total={ row_total }
              row_total_incl_tax={ row_total_incl_tax }
              baseRowTotal={ baseRowTotal }
              currency_code={ currency_code }
              mix={ {
                  block: 'CartItem',
                  elem: 'Price',
                  mods: { isCartOverlay, isMobileLayout },
              } }
            />
        );
    }

    /**
     * Overriden to pass the isCart mod
     */
    render() {
        const { isEditing, isCartOverlay, isCart } = this.props;

        return (
            <div block="CartItem" mods={ { isEditing, isCartOverlay, isCart } }>
                { this.renderLoader() }
                { this.renderContent() }
            </div>
        );
    }
}

export default CartItemComponent;
