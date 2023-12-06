import CartItem from 'Component/CartItem';
import Loader from 'Component/Loader';
import {
    CartPageComponent as SourceCartPageComponent,
} from 'SourceRoute/CartPage/CartPage.component';

import './CartPage.override.style';

/** @namespace Scandipwa/Route/CartPage/Component */
export class CartPageComponent extends SourceCartPageComponent {
    /**
     * Overriden to pass the isCart and index prop
     */
    renderCartItems() {
        const {
            totals: {
                items = [],
                prices: {
                    quote_currency_code = '',
                } = {},
            },
            onCartItemLoading,
            isInitialLoad,
        } = this.props;

        if (!items || isInitialLoad) {
            return (
                <div block="CartPage" elem="InitialLoaderContainer">
                    <Loader isLoading />
                </div>
            );
        }

        if (!items.length) {
            return (
                <p block="CartPage" elem="Empty">{ __('There are no products in cart.') }</p>
            );
        }

        return (
            <div block="CartPage" elem="Items" aria-label="List of items in cart">
                { items.map((item, index) => (
                    <CartItem
                      key={ item.id }
                      item={ item }
                      currency_code={ quote_currency_code }
                      onCartItemLoading={ onCartItemLoading }
                      showLoader
                      isEditing
                      updateCrossSellsOnRemove
                      isCart
                      index={ index + 1 }
                    />
                )) }
            </div>
        );
    }
}

export default CartPageComponent;
