/* eslint-disable @scandipwa/scandipwa-guidelines/no-jsx-variables */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    MenuContainer as SourceMenuContainer,
} from 'SourceComponent/Menu/Menu.container';
import MyAccountDispatcher from 'Store/MyAccount/MyAccount.dispatcher';

import { FormattedMenuItemType } from './Menu.type';

/** @namespace Scandipwa/Component/Menu/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    activeOverlay: state.OverlayReducer.activeOverlay,
});

/** @namespace Scandipwa/Component/Menu/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch),
    logout: () => MyAccountDispatcher.logout(false, true, dispatch),
});

/** @namespace Scandipwa/Component/Menu/Container */
export class MenuContainer extends SourceMenuContainer {
    static propTypes = {
        ...this.propTypes,
        logout: PropTypes.func.isRequired,
        onClose: PropTypes.func,
        staticItems: PropTypes.arrayOf(FormattedMenuItemType).isRequired,
    };

    __construct(props) {
        super.__construct(props);

        this.state = {
            ...this.state,
            activeSubCategory: null,
        };
    }

    containerFunctions = {
        ...this.containerFunctions,
        onSubCategoryHover: this.onSubCategoryHover.bind(this),
    };

    containerProps() {
        const { activeSubCategory } = this.state;
        const { staticItems, activeOverlay } = this.props;

        return {
            ...super.containerProps(),
            activeSubCategory,
            staticItems,
            activeOverlay,
        };
    }

    /**
     * Overridden to replace isMobile with !isDesktop
     */
    componentDidMount() {
        const { device: { isDesktop } } = this.props;

        this._getMenu();

        if (!isDesktop) {
            window.addEventListener('popstate', this.historyBackHook);
        }
    }

    componentDidUpdate(prevProps) {
        const { activeOverlay: prevActiveOverlay } = prevProps;
        const { activeOverlay } = this.props;
        const { activeMenuItemsStack } = this.state;

        // Close menu when any overlay opens
        if (activeOverlay !== prevActiveOverlay && activeOverlay && activeMenuItemsStack.length) {
            this.setState({ activeMenuItemsStack: [] });
        }
    }

    handleLogout() {
        const { logout } = this.props;

        logout();
    }

    /**
     * Overridden to call close menu if passed
     */
    closeMenu() {
        const { closeMenu, device: { isDesktop } } = this.props;

        if (closeMenu) {
            closeMenu();

            return;
        }

        if (!isDesktop) {
            return;
        }

        this.setState({ activeMenuItemsStack: [] });
    }

    /**
     * Overridden to unset active sub category on desktop
     */
    onCategoryHover(activeSubcategory, isClick = false) {
        const { device: { isDesktop } } = this.props;
        const { activeMenuItemsStack } = this.state;

        if (!isDesktop) {
            return;
        }

        const { item_id } = activeSubcategory;

        if (activeMenuItemsStack.includes(item_id)) {
            if (isClick) {
                this.setState({ activeMenuItemsStack: [] });
                this.setState({ activeSubCategory: null });
            }

            return;
        }

        this.setState({ activeSubCategory: null });
        this.setState({ activeMenuItemsStack: [item_id] });
    }

    /**
     * Created to handle sub category on desktop
     */
    onSubCategoryHover(subCategory, isClick = false) {
        const { item_id } = subCategory;
        const { device: { isDesktop } } = this.props;
        const { activeSubCategory } = this.state;

        const { item_id: activeSubCategoryId } = activeSubCategory || {};

        if (!isDesktop) {
            return;
        }

        if (isClick && activeSubCategoryId === item_id) {
            this.setState({ activeSubCategory: null });

            return;
        }

        this.setState({ activeSubCategory: subCategory });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
