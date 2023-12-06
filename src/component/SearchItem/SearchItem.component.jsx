import ProductPrice from 'Component/ProductPrice';
import TextPlaceholder from 'Component/TextPlaceholder';
import { TextPlaceHolderLength } from 'Component/TextPlaceholder/TextPlaceholder.config';
import {
    SearchItemComponent as SourceSearchItemComponent,
} from 'SourceComponent/SearchItem/SearchItem.component';
import { getPrice } from 'Util/Product/Extract';

import './SearchItem.override.style';

/** @namespace Scandipwa/Component/SearchItem/Component */
export class SearchItemComponent extends SourceSearchItemComponent {
    /**
     * New method to render price
     */
    renderPrice() {
        const { product: { id, price_range, type_id } = {} } = this.props;
        const price = getPrice(price_range, null, null, type_id);

        if (!price_range) {
            return null;
        }

        return (
            <ProductPrice
              price={ price }
              key={ id }
              priceType={ type_id }
            />
        );
    }

    /**
     * Overridden to render price
     */
    renderContent() {
        const { product: { name } } = this.props;

        return (
            <figcaption block="SearchItem" elem="Content">
                { this.renderCustomAttribute() }
                <p block="SearchItem" elem="Title" mods={ { isLoaded: !!name } }>
                    <TextPlaceholder content={ name } length={ TextPlaceHolderLength.LONG } />
                </p>
                <div block="SearchItem" elem="BrandPriceWrapper">
                    { /* TODO: Render brand in place of div */ }
                    <div />
                    { this.renderPrice() }
                </div>
            </figcaption>
        );
    }
}

export default SearchItemComponent;
