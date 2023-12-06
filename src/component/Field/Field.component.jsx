import { FieldType } from 'Component/Field/Field.config';
import {
    FieldComponent as SourceFieldComponent,
} from 'SourceComponent/Field/Field.component';

import './Field.override.style';

/** @namespace Scandipwa/Component/Field/Component */
export class FieldComponent extends SourceFieldComponent {
    static defaultProps = {
        ...this.defaultProps,
        icon: null,
    };

    /**
     * Created to render icon
     */
    renderIcon() {
        const { icon } = this.props;

        if (!icon) {
            return null;
        }

        return (
            <div block="Field" elem="Icon">
                { icon }
            </div>
        );
    }

    /**
     * Overridden to add icon
     */
    render() {
        const {
            type, validationResponse, mix,
        } = this.props;
        const inputRenderer = this.renderMap[type] ?? this.renderDefaultInput.bind(this);
        const { mods: { hasError = false } = {} } = mix;

        return (
            <div block="Field" elem="Wrapper" mods={ { type } }>
                <div
                  block="Field"
                  mods={ {
                      type,
                      isValid: !hasError && validationResponse === true,
                      hasError: validationResponse !== true && Object.keys(validationResponse || {}).length !== 0,
                  } }
                  mix={ mix }
                >
                    { type !== FieldType.CHECKBOX && type !== FieldType.RADIO && this.renderLabel() }
                    { inputRenderer && inputRenderer() }
                    { this.renderIcon() }
                </div>
                { this.renderErrorMessages() }
                { this.renderSubLabel() }
            </div>
        );
    }
}

export default FieldComponent;
