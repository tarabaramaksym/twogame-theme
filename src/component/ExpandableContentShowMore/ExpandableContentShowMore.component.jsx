import {
    ExpandableContentShowMoreComponent as SourceExpandableContentShowMoreComponent,
} from 'SourceComponent/ExpandableContentShowMore/ExpandableContentShowMore.component';

import './ExpandableContentShowMore.override.style';

/** @namespace Scandipwa/Component/ExpandableContentShowMore/Component */
export class ExpandableContentShowMoreComponent extends SourceExpandableContentShowMoreComponent {
    static defaultProps = {
        showElemCount: 6,
    };

    /**
     * Overridden to add modifier when it's open
     */
    renderExpandableChildren() {
        const { isOpen, isExpanding } = this.state;
        const { children, showElemCount } = this.props;

        const child = (isOpen || isExpanding) ? children.slice(showElemCount) : null;
        const style = {
            height: isOpen ? this.expandableContentHeight : 0,
        };

        return (
            <div
              ref={ this.expandableRef }
              block="ExpandableContentShowMore"
              elem="ExpandableChildren"
              mods={ { isOpen } }
              style={ style }
            >
                { child }
            </div>
        );
    }

    /**
     * Overridden to display show more button on mobile
     */
    render() {
        return (
            <div block="ExpandableContentShowMore" ref={ this.ref }>
                { this.renderContent() }
            </div>
        );
    }
}

export default ExpandableContentShowMoreComponent;
