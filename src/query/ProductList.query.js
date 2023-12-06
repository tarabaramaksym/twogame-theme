import {
    ProductListQuery as SourceProductListQuery,
} from 'SourceQuery/ProductList.query';

/** @namespace Scandipwa/Query/ProductList/Query */
export class ProductListQuery extends SourceProductListQuery {
    /**
     * Overridden to fetch price for cart item
     */
    _getCartProductInterfaceFields() {
        return [
            ...super._getCartProductInterfaceFields(),
            this._getPriceRangeField(),
        ];
    }
}

export default new ProductListQuery();
