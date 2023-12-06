import CloseIcon from 'Component/CloseIcon';
import {
    CategoryFilterOverlayComponent as SourceCategoryFilterOverlayComponent,
} from 'SourceComponent/CategoryFilterOverlay/CategoryFilterOverlay.component';

import './CategoryFilterOverlay.override.style';

/** @namespace Scandipwa/Component/CategoryFilterOverlay/Component */
export class CategoryFilterOverlayComponent extends SourceCategoryFilterOverlayComponent {
    /**
     * Overridden to edit the heading and add the close icon
     */
    renderHeading() {
        const { isContentFiltered, onSeeResultsClick } = this.props;

        return (
            <h3 block="CategoryFilterOverlay" elem="Heading" mods={ { isContentFiltered } }>
                { __('Filters') }
                <button
                  block="CategoryFilterOverlay"
                  elem="CloseButton"
                  onClick={ onSeeResultsClick }
                  aria-label={ __('Close filters') }
                >
                    <CloseIcon />
                </button>
            </h3>
        );
    }
}

export default CategoryFilterOverlayComponent;
