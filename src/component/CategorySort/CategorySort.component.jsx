import SortByIcon from 'Component/SortByIcon';
import {
    CategorySortComponent as SourceCategorySortComponent,
} from 'SourceComponent/CategorySort/CategorySort.component';

import './CategorySort.override.style';

/** @namespace Scandipwa/Component/CategorySort/Component */
export class CategorySortComponent extends SourceCategorySortComponent {
    render() {
        return (
            <div block="CategorySort">
                <SortByIcon />
                { this.renderSortField() }
            </div>
        );
    }
}

export default CategorySortComponent;
