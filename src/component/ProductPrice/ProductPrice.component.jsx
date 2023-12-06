import {
    ProductPriceComponent as SourceProductPriceComponent,
} from 'SourceComponent/ProductPrice/ProductPrice.component';
import { ProductType } from 'Type/ProductList.type';

import './ProductPrice.override.style';

/** @namespace Scandipwa/Component/ProductPrice/Component */
export class ProductPriceComponent extends SourceProductPriceComponent {
    /**
     * New method render discount percentage
     */
    renderDiscountPercentage() {
        const { discountPercentage } = this.props;

        if (!discountPercentage) {
            return null;
        }

        return (
            <div block="ProductPrice" elem="DiscountPercentage">
                { __('-%s%', Math.round(discountPercentage)) }
            </div>
        );
    }

    /**
     * Overridden to render discount percentage
     */
    render() {
        const {
            price: {
                finalPrice,
                originalPrice,
                finalPrice: {
                    value: finalPriceValue = 0,
                } = {},
            } = {},
            priceType,
            isPreview,
            discountPercentage,
            mix,
        } = this.props;

        if (!finalPrice || !originalPrice) {
            return this.renderPlaceholder();
        }

        const { [priceType]: renderer } = this.pricePreviewRenderMap;

        return (
            <div
              block="ProductPrice"
              mods={ { hasDiscount: discountPercentage !== 0, isPreview } }
              mix={ mix }
              aria-label={ `Product price: ${finalPriceValue}` }
            >
                { this.renderDiscountPercentage() }
                <div block="ProductPrice" elem="PriceWrapper">
                    { isPreview && renderer && renderer() }
                    { (!isPreview || !renderer) && this.renderDefaultPrice() }
                    { priceType !== ProductType.BUNDLE && this.renderTierPrice() }
                </div>
            </div>
        );
    }
}

export default ProductPriceComponent;
