import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FormattedMenuItemType } from 'Component/Menu/Menu.type';

import MyAccountOptionsOverlay from './MyAccountOptionsOverlay.component';

/** @namespace Scandipwa/Component/MyAccountOptionsOverlay/Container/mapStateToProps */
export const mapStateToProps = () => ({
});

/** @namespace Scandipwa/Component/MyAccountOptionsOverlay/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({
});

/** @namespace Scandipwa/Component/MyAccountOptionsOverlay/Container */
export class MyAccountOptionsOverlayContainer {
    static propTypes = {
        staticItems: PropTypes.arrayOf(FormattedMenuItemType).isRequired,
    };

    containerProps() {
        const {
            staticItems,
        } = this.props;

        return {
            staticItems,
        };
    }

    render() {
        return (
            <MyAccountOptionsOverlay
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    MyAccountOptionsOverlayContainer
);
