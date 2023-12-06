import { FieldSelectContainer as SourceFieldSelectContainer } from 'SourceComponent/FieldSelect/FieldSelect.container';

/** @namespace Scandipwa/Component/FieldSelect/Container */
export class FieldSelectContainer extends SourceFieldSelectContainer {
    containerFunctions = {
        ...this.containerFunctions,
        onSelectHover: this.onSelectHover.bind(this),
        onSelectBlur: this.onSelectBlur.bind(this),
    };

    state = {
        ...this.state,
        isSelectHovered: false,
    };

    containerProps() {
        const { isSelectHovered } = this.state;

        return {
            ...super.containerProps(),
            isSelectHovered,
        };
    }

    /**
     * Method created to manipulate hover state and set it to true when select is hovered
     */
    onSelectHover() {
        this.setState({ isSelectHovered: true });
    }

    /**
     * Method created to manipulate hover state and set it to false when select has no hover
     */
    onSelectBlur() {
        this.setState({ isSelectHovered: false });
    }
}

export default FieldSelectContainer;
