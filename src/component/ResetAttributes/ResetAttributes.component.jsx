import {
    ResetAttributesComponent as SourceResetAttributesComponent,
} from 'SourceComponent/ResetAttributes/ResetAttributes.component';

import './ResetAttributes.override.style';

/** @namespace Scandipwa/Component/ResetAttributes/Component */
export class ResetAttributesComponent extends SourceResetAttributesComponent {
    /**
     * Overridden to render attributes directly skipping div wrappers
     */
    render() {
        const { filtersData = {} } = this.props;

        if (!Object.keys(filtersData).length) {
            return null;
        }

        return (
            <>
                { this.renderDesktopTitle() }
                { this.renderMobileTitle() }
                <div block="ResetAttributes">
                    { Object.entries(filtersData).map(
                        ([_attrName, attrData]) => attrData.map((o) => this.renderSelectedOption(o)),
                    ) }
                </div>
            </>
        );
    }
}

export default ResetAttributesComponent;
