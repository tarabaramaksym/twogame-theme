import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    CartItemPriceContainer as SourceCartItemPriceContainer,
    mapDispatchToProps,
    mapStateToProps,
} from 'SourceComponent/CartItemPrice/CartItemPrice.container';

export {
    mapStateToProps,
    mapDispatchToProps,
};

/** @namespace Scandipwa/Component/CartItemPrice/Container */
export class CartItemPriceContainer extends SourceCartItemPriceContainer {
    static propTypes = {
        baseRowTotal: PropTypes.number.isRequired,
    };

    containerProps() {
        const {
            baseRowTotal,
            getCartItemPrice,
            ...rest
        } = this.props;
        const price = getCartItemPrice(rest);
        // eslint-disable-next-line no-magic-numbers
        const discountPercentage = Math.round(((baseRowTotal - price) / baseRowTotal) * 100);

        return {
            ...super.containerProps(),
            baseRowTotal,
            discountPercentage,
        };
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItemPriceContainer);
