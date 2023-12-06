import {
    FieldContainer as SourceFieldContainer,
} from 'SourceComponent/Field/Field.container';

/** @namespace Scandipwa/Component/Field/Container */
export class FieldContainer extends SourceFieldContainer {
    static defaultProps = {
        ...this.defaultProps,
        icon: null,
    };

    containerProps() {
        const { icon } = this.props;

        return {
            ...super.containerProps(),
            icon,
        };
    }
}

export default FieldContainer;
