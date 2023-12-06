import ChevronIcon from 'Component/ChevronIcon';
import { Directions } from 'Component/ChevronIcon/ChevronIcon.config';
import ClickOutside from 'Component/ClickOutside';
import { FieldSelectComponent as SourceFieldSelectComponent } from 'SourceComponent/FieldSelect/FieldSelect.component';
import { noopFn } from 'Util/Common';

import './FieldSelect.override.style';

/** @namespace Scandipwa/Component/FieldSelect/Component */
export class FieldSelectComponent extends SourceFieldSelectComponent {
    /**
     * Overriden to include on hover function manipulations and modifier for select on hover
     */
    render() {
        const {
            attr: { id = '' } = {},
            isExpanded,
            handleSelectExpand,
            handleSelectListKeyPress,
            handleSelectExpandedExpand,
            isDisabled,
            isSelectHovered,
            onSelectHover,
            onSelectBlur,
        } = this.props;

        return (
            <ClickOutside onClick={ handleSelectExpandedExpand }>
                <div
                  id={ `${ id }_wrapper` }
                  block="FieldSelect"
                  mods={ { isExpanded, isHovered: isSelectHovered } }
                  onMouseEnter={ onSelectHover }
                  onMouseLeave={ onSelectBlur }
                  onClick={ !isDisabled ? handleSelectExpand : noopFn }
                  onKeyPress={ !isDisabled ? handleSelectListKeyPress : noopFn }
                  role="button"
                  tabIndex={ 0 }
                  aria-label="Select dropdown"
                  aria-expanded={ isExpanded }
                >
                    <div block="FieldSelect" elem="Clickable">
                        { this.renderSortSelect() }
                        { this.renderNativeSelect() }
                        <ChevronIcon direction={ isExpanded ? Directions.TOP : Directions.BOTTOM } />
                    </div>
                    { this.renderOptions() }
                </div>
            </ClickOutside>
        );
    }
}

export default FieldSelectComponent;
