import Loader from 'Component/Loader';
import { CategoryPageComponent as SourceCategoryPageComponent } from 'SourceRoute/CategoryPage/CategoryPage.component';
import { isCrawler, isSSR } from 'Util/Browser';

import './CategoryPage.override.style';

/** @namespace Scandipwa/Route/CategoryPage/Component */
export class CategoryPageComponent extends SourceCategoryPageComponent {
    /**
     * Overridden to remove heading on loading
     */
    renderFilterPlaceholder() {
        return (
            <div block="CategoryPage" elem="PlaceholderWrapper">
                <div block="CategoryPage" elem="PlaceholderContainer">
                    <div block="CategoryPage" elem="PlaceholderList">
                        <div block="CategoryPage" elem="PlaceholderListItem" />
                        <div block="CategoryPage" elem="PlaceholderListItem" />
                        <div block="CategoryPage" elem="PlaceholderListItem" />
                    </div>
                    <Loader isLoading />
                </div>
            </div>
        );
    }

    renderMiscellaneousDivider() {
        const {
            isContentFiltered,
            totalPages,
            category: { is_anchor },
            isSearchPage,
            isCurrentCategoryLoaded,
            isMatchingInfoFilter,
        } = this.props;

        if (!isMatchingInfoFilter) {
            return null;
        }

        if ((!isContentFiltered && totalPages === 0) || (!is_anchor && !isSearchPage) || !isCurrentCategoryLoaded) {
            return null;
        }

        return <hr block="CategoryPage" elem="MiscellaneousDivider" />;
    }

    /**
     * Overridden to render divider on mobile
     */
    renderMiscellaneous() {
        const { totalItems } = this.props;

        if (totalItems === 0 || !this.displayProducts()) {
            return <aside block="CategoryPage" elem="Miscellaneous" mods={ { noResults: true } } />;
        }

        return (
            <aside block="CategoryPage" elem="Miscellaneous">
                { this.renderItemsCount() }
                <div
                  block="CategoryPage"
                  elem="MiscellaneousLayoutWrapper"
                >
                  <div
                    block="CategoryPage"
                    elem="LayoutWrapper"
                    mods={ { isPrerendered: isSSR() || isCrawler() } }
                  >
                      { this.renderLayoutButtons() }
                      { this.renderCategorySort() }
                  </div>
                  { this.renderMiscellaneousDivider() }
                  <div
                    block="CategoryPage"
                    elem="LayoutWrapper"
                    mods={ { isPrerendered: isSSR() || isCrawler() } }
                  >
                      { this.renderFilterButton() }
                  </div>
                </div>
            </aside>
        );
    }
}

export default CategoryPageComponent;
