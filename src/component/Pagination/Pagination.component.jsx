import {
    PaginationComponent as SourcePaginationComponent,
} from 'SourceComponent/Pagination/Pagination.component';

import './Pagination.override.style';

/** @namespace Scandipwa/Component/Pagination/Component */
export class PaginationComponent extends SourcePaginationComponent {
    /**
     * Overriden to always render the arrow for testing purposes
     */
    renderPreviousPageLink() {
        const {
            anchorTextPrevious,
            currentPage,
        } = this.props;

        return this.renderPageLink(
            currentPage - 1,
            __('Previous page'),
            anchorTextPrevious || this.renderPageIcon(),
        );
    }

    /**
     * Overriden to always render the arrow for testing purposes
     */
    renderNextPageLink() {
        const {
            anchorTextNext,
            currentPage,
        } = this.props;

        return this.renderPageLink(
            currentPage + 1,
            __('Next page'),
            anchorTextNext || this.renderPageIcon(true),
        );
    }
}

export default PaginationComponent;
