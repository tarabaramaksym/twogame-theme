/* eslint-disable max-lines */
/* eslint-disable @scandipwa/scandipwa-guidelines/no-jsx-variables */
import { connect } from 'react-redux';

import AvatarIcon from 'Component/AvatarIcon';
import DashboardIcon from 'Component/DashboardIcon';
import { Page } from 'Component/Header/Header.config';
import HeartIcon from 'Component/HeartIcon';
import KeyIcon from 'Component/KeyIcon';
import LogoutIcon from 'Component/LogoutIcon';
import { MY_ACCOUNT_OPTIONS_KEY_OVERLAY } from 'Component/MyAccountOptionsOverlay/MyAccountOptionsOverlay.config';
import { CUSTOMER_ACCOUNT_OVERLAY_KEY } from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import SettingsIcon from 'Component/SettingsIcon';
import UserIcon from 'Component/UserIcon';
import {
    HeaderContainer as SourceHeaderContainer,
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
} from 'SourceComponent/Header/Header.container';
import MyAccountDispatcher from 'Store/MyAccount/MyAccount.dispatcher';
import { toggleScroll } from 'Util/Browser';

/** @namespace Scandipwa/Component/Header/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    isSignedIn: state.MyAccountReducer.isSignedIn,
});

/** @namespace Scandipwa/Component/Header/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch),
    logout: () => MyAccountDispatcher.logout(false, true, dispatch),
});

/** @namespace Scandipwa/Component/Header/Container */
export class HeaderContainer extends SourceHeaderContainer {
    containerFunctions = {
        ...this.containerFunctions,
        openMenu: this.openMenu.bind(this),
        closeMenu: this.closeMenu.bind(this),
        expandSearch: this.expandSearch.bind(this),
        collapseSearch: this.collapseSearch.bind(this),
    };

    __construct(props) {
        super.__construct(props);

        this.state = {
            ...this.state,
            isMenuOpen: false,
            isSearchExpanded: false,
            staticItems: this.getStaticItems(),
            cartState: false,
        };
    }

    /**
     * Overridden to close mobile menu when view is changed and collapse expanded search
     */
    componentDidUpdate(prevProps) {
        const {
            isSignedIn: prevIsSignedIn,
            device: { isDesktop: prevIsDesktop },
        } = prevProps;

        const {
            device: { isDesktop },
            isSignedIn,
        } = this.props;

        super.componentDidUpdate(prevProps);

        if (prevIsDesktop !== isDesktop || prevIsSignedIn !== isSignedIn) {
            this.closeMenu();
            this.collapseSearch();
            this.setState({ staticItems: this.getStaticItems() });
        }
    }

    /**
     * Overriden to change the logic of disabling and enabling the minicart overlay on mobile
     */
    onMinicartButtonClick() {
        const { device: { isMobile } } = this.props;
        const { cartState } = this.state;

        if (!isMobile) {
            super.onMinicartButtonClick();
        }

        this.setState({ cartState: !cartState });
    }

    /**
     * Overriden to change the logic of disabling the minicart overlay on mobile
     */
    onMinicartOutsideClick() {
        const { device: { isMobile } } = this.props;
        const { cartState } = this.state;

        if (!isMobile) {
            super.onMinicartOutsideClick();
        }

        if (cartState === false) {
            return;
        }

        this.setState({ cartState: false });
    }

    /**
     * Created to get static menu items on mobile
     */
    getStaticItems() {
        const { device: { isDesktop }, isSignedIn, logout } = this.props;

        return [
            {
                item_id: 'sign-in',
                title: 'Sign In',
                icon: <UserIcon />,
                is_active: !isDesktop && !isSignedIn,
                url: '/customer/account/login',
                children: {},
            },
            {
                item_id: 'my-account',
                title: __('My Account'),
                icon: <AvatarIcon />,
                is_active: !isDesktop && isSignedIn,
                children: {
                    dashboard: {
                        item_id: 'dashboard',
                        title: __('Dashboard'),
                        icon: <DashboardIcon />,
                        url: {
                            pathname: '/customer/account',
                        },
                        children: {},
                    },
                    orders: {
                        item_id: 'orders',
                        title: __('My Orders & Keys'),
                        icon: <KeyIcon />,
                        url: {
                            pathname: '/sales/order/history',
                        },
                        children: {},
                    },
                    wishlist: {
                        item_id: 'wishlist',
                        title: __('Wishlist'),
                        icon: <HeartIcon />,
                        url: {
                            pathname: '/wishlist',
                        },
                        children: {},
                    },
                    settings: {
                        item_id: 'settings',
                        title: __('Account Settings'),
                        icon: <SettingsIcon />,
                        url: {
                            pathname: '/customer/account/edit',
                        },
                        children: {},
                    },
                    logout: {
                        item_id: 'logout',
                        title: __('Logout'),
                        icon: <LogoutIcon />,
                        onClick: logout,
                        children: {},
                    },
                },
            },
        ];
    }

    /**
     * Created to open mobile menu
     */
    openMenu() {
        this.setState({ isMenuOpen: true });
        toggleScroll(false);
    }

    /**
     * Created to close mobile menu
     */
    closeMenu() {
        this.setState({ isMenuOpen: false });
        toggleScroll(true);
    }

    /**
     * Method created to manipulate search state and set it to true when called
     */
    expandSearch() {
        this.setState({ isSearchExpanded: true });
    }

    /**
     * Method created to manipulate search state and set it to false when called
     */
    collapseSearch() {
        this.setState({ isSearchExpanded: false });
    }

    /**
     * Overridden to show another overlay even when signed in.
     */
    onMyAccountButtonClick() {
        const {
            showOverlay,
            setNavigationState,
            isSignedIn,
        } = this.props;

        if (isSignedIn) {
            this.setState({ showMyAccountOptions: true }, () => {
                showOverlay(MY_ACCOUNT_OPTIONS_KEY_OVERLAY);
                setNavigationState({
                    name: Page.CHECKOUT_ACCOUNT,
                    title: 'My Account Options',
                    onCloseClick: this.closeOverlay,
                });
            });

            return;
        }

        this.setState({ showMyAccountLogin: true }, () => {
            showOverlay(CUSTOMER_ACCOUNT_OVERLAY_KEY);
            setNavigationState({
                name: Page.CHECKOUT_ACCOUNT,
                title: 'Sign in',
                onCloseClick: this.closeOverlay,
            });
        });
    }

    containerProps() {
        const {
            isMenuOpen, isSearchExpanded, staticItems, cartState,
        } = this.state;

        return {
            ...super.containerProps(),
            isMenuOpen,
            isSearchExpanded,
            staticItems,
            cartState,
        };
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
