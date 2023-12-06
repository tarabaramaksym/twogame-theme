import CheckoutOrderSummaryPriceLine from 'Component/CheckoutOrderSummaryPriceLine';
import {
    CartCoupon,
    CheckoutOrderSummaryComponent as SourceCheckoutOrderSummaryComponent,
} from 'SourceComponent/CheckoutOrderSummary/CheckoutOrderSummary.component';
import { GQLCurrencyEnum } from 'Type/Graphql.type';

import './CheckoutOrderSummary.override.style';

export {
    CartCoupon,
};

/** @namespace Scandipwa/Component/CheckoutOrderSummary/Component */
export class CheckoutOrderSummaryComponent extends SourceCheckoutOrderSummaryComponent {
    /**
     * Overriden to change title text
     */
    renderOrderTotal() {
        const {
            totals: {
                prices: {
                    grand_total: {
                        value: grand_total = 0,
                    } = {},
                    quote_currency_code = GQLCurrencyEnum.USD,
                } = {},
            },
            cartTotalSubPrice,
        } = this.props;
        const title = __('Grand Total');

        return (
            <CheckoutOrderSummaryPriceLine
              price={ Number(grand_total || 0).toFixed(2) }
              currency={ quote_currency_code }
              title={ title }
              subPrice={ Number(cartTotalSubPrice || 0).toFixed(2) }
              mods={ { isTotal: true } }
            />
        );
    }
}

export default CheckoutOrderSummaryComponent;
