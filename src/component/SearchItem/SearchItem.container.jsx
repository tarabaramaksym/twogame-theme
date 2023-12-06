import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    mapDispatchToProps,
    mapStateToProps,
    SearchItemContainer as SourceSearchItemContainer,
} from 'SourceComponent/SearchItem/SearchItem.container';

export {
    mapDispatchToProps,
    mapStateToProps,
};

/** @namespace Scandipwa/Component/SearchItem/Container */
export class SearchItemContainer extends SourceSearchItemContainer {
    static propTypes = {
        beforeItemClick: PropTypes.func.isRequired,
    };

    /**
     * New method to get price data
     */
    getPrice() {
        const {
            product:
            {
                price_range:
                {
                    maximum_price:
                    {
                        final_price:
                        {
                            currency, value,
                        } = {},
                        regular_price:
                        {
                            value: regularValue,
                        } = {},
                        discount: {
                            percent_off: discountPercentage,
                        } = {},
                    } = {},
                } = {},
            } = {},
        } = this.props;

        return {
            currency,
            value,
            regularValue,
            discountPercentage,
        };
    }

    /**
     * Overridden to add beforeItemClick which closes overlay
     */
    handleItemClick() {
        const { hideActiveOverlay, beforeItemClick } = this.props;

        beforeItemClick();
        hideActiveOverlay();
    }

    containerProps() {
        return {
            ...super.containerProps(),
            price: this.getPrice(),
        };
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchItemContainer);
