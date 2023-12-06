import { PureComponent } from 'react';

import Field from 'Component/Field';
import SearchIcon from 'Component/SearchIcon';

import { FieldContainerProps } from '../Field/Field.type';

import './FilterSearchField.style';

/** @namespace Scandipwa/Component/FilterSearchField/Container */
export class FilterSearchFieldContainer extends PureComponent<FieldContainerProps> {
    containerProps() {
        const { attr, ...props } = this.props;

        return props;
    }

    render() {
        const { attr } = this.props;

        return (
            <Field
              attr={ {
                  block: 'FilterSearchField',
                  ...attr,
              } }
              icon={ <SearchIcon /> }
              { ...this.containerProps() }
            />
        );
    }
}

export default FilterSearchFieldContainer;
