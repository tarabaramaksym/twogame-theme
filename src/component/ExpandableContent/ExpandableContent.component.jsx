import ChevronIcon from 'Component/ChevronIcon';
import { Directions } from 'Component/ChevronIcon/ChevronIcon.config';
import {
    ExpandableContentComponent as SourceExpandableContentComponent,
} from 'SourceComponent/ExpandableContent/ExpandableContent.component';

import './ExpandableContent.override.style';

/** @namespace Scandipwa/Component/ExpandableContent/Component */
export class ExpandableContentComponent extends SourceExpandableContentComponent {
    /**
     * Overridden to render arrow icon and remove add/minus icons
     */
    renderButtonIcon() {
        const { isContentExpanded } = this.state;

        return <ChevronIcon direction={ isContentExpanded ? Directions.TOP : Directions.BOTTOM } />;
    }
}

export default ExpandableContentComponent;
