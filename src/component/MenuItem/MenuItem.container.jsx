import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    mapDispatchToProps,
    mapStateToProps,
    MenuItemContainer as SourceMenuItemContainer,
} from 'SourceComponent/MenuItem/MenuItem.container';
import { noopFn } from 'Util/Common';

export {
    mapDispatchToProps,
    mapStateToProps,
} from 'SourceComponent/MenuItem/MenuItem.container';

/** @namespace Scandipwa/Component/MenuItem/Container */
export class MenuItemContainer extends SourceMenuItemContainer {
    static propTypes = {
        ...this.propTypes,
        onClick: PropTypes.func,
        icon: PropTypes.element,
    };

    static defaultProps = {
        ...this.defaultProps,
        onClick: noopFn,
    };

    containerProps() {
        const { device, onClick, icon } = this.props;

        return {
            ...super.containerProps(),
            onClick,
            device,
            icon,
        };
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemContainer);
