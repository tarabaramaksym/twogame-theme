import PropTypes from 'prop-types';

import Overlay from 'Component/Overlay';
import SearchItem from 'Component/SearchItem';
import {
    SearchOverlayComponent as SourceSearchOverlayComponent,
} from 'SourceComponent/SearchOverlay/SearchOverlay.component';

import './SearchOverlay.override.style';

/** @namespace Scandipwa/Component/SearchOverlay/Component */
export class SearchOverlayComponent extends SourceSearchOverlayComponent {
    static propTypes = {
        onViewAllPress: PropTypes.func.isRequired,
        beforeItemClick: PropTypes.func.isRequired,
    };

    /**
     * New method to render view all button
     */
    renderViewAllButton() {
        const { onViewAllPress } = this.props;
        const { searchResults, isLoading } = this.props;

        if (!searchResults.length && !isLoading && !this.timeout) {
            return null;
        }

        return (
            <button
              block="SearchOverlay"
              elem="ViewAllButton"
              onClick={ onViewAllPress }
            >
              { __('View all results') }
            </button>
        );
    }

    /**
     * New method to render content from original render() method to not duplicate it
     */
    renderResults() {
        return (
            <article
              block="SearchOverlay"
              elem="Results"
              aria-label="Search results"
            >
                { this.renderSearchResults() }
                { this.renderViewAllButton() }
            </article>
        );
    }

    /**
     * Overridden to pass beforeItemClick
     */
    renderSearchItem(product, i) {
        const { beforeItemClick } = this.props;

        return (
            <SearchItem
              product={ product }
              key={ product.id || i }
              beforeItemClick={ beforeItemClick }
            />
        );
    }

    /**
     * Overridden to to render results without duplicate code
     */
    render() {
        const { isHideOverlay, searchCriteria } = this.props;

        if (!searchCriteria.trim()) {
            return null;
        }

        if (isHideOverlay) {
            return this.renderResults();
        }

        return (
            <Overlay
              id="search"
              mix={ { block: 'SearchOverlay' } }
            >
                { this.renderResults() }
            </Overlay>
        );
    }
}

export default SearchOverlayComponent;
