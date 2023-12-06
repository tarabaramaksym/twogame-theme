import {
    ProductAttributeValueComponent as SourceProductAttributeValueComponent,
} from 'SourceComponent/ProductAttributeValue/ProductAttributeValue.component';

import './ProductAttributeValue.override.style';

/** @namespace Scandipwa/Component/ProductAttributeValue/Component */
export class ProductAttributeValueComponent extends SourceProductAttributeValueComponent {
    /**
     * Overridden to remove subLabel
     */
    renderSublabel() {
        return null;
    }
}

export default ProductAttributeValueComponent;
