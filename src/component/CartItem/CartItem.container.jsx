import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    CartItemContainer as SourceCartItemContainer,
    mapDispatchToProps,
    mapStateToProps,
} from 'SourceComponent/CartItem/CartItem.container';

/** @namespace Scandipwa/Component/CartItem/Container */
export class CartItemContainer extends SourceCartItemContainer {
    static propTypes = {
        isCart: PropTypes.bool,
        index: PropTypes.number,
    };

    static defaultProps = {
        ...this.defaultProps,
        isCart: false,
        index: 0,
    };

    /*
     * New method to get product price before discount.
     */
    getBaseRowTotal() {
        const { item: { product, quantity } } = this.props;
        const {
            price_range: {
                maximum_price:
                {
                    default_price:
                    {
                        value = 0,
                    } = {},
                } = {},
            } = {},
        } = product;

        return value * quantity;
    }

    containerProps() {
        const { isCart, index } = this.props;

        return {
            ...super.containerProps(),
            isCart,
            index,
            baseRowTotal: this.getBaseRowTotal(),
        };
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItemContainer);
