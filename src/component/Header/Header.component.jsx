/* eslint-disable max-lines */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import { lazy, Suspense } from 'react';

import AvatarIcon from 'Component/AvatarIcon';
import CartOverlay from 'Component/CartOverlay';
import ChevronIcon from 'Component/ChevronIcon';
import ClickOutside from 'Component/ClickOutside';
import CloseIcon from 'Component/CloseIcon';
import { Page } from 'Component/Header/Header.config';
import HeartIcon from 'Component/HeartIcon';
import Link from 'Component/Link';
import Menu from 'Component/Menu';
import { FormattedMenuItemType } from 'Component/Menu/Menu.type';
import MenuIcon from 'Component/MenuIcon';
import { MY_ACCOUNT_OPTIONS_KEY_OVERLAY } from 'Component/MyAccountOptionsOverlay/MyAccountOptionsOverlay.config';
import OfflineNotice from 'Component/OfflineNotice';
import PopupSuspense from 'Component/PopupSuspense';
import SearchField from 'Component/SearchField';
import {
    HeaderComponent as SourceHeaderComponent,
} from 'SourceComponent/Header/Header.component';
import { isSignedIn } from 'Util/Auth/IsSignedIn';
import { isCrawler, isSSR } from 'Util/Browser';

import './Header.override.style';

export const MyAccountOptionsOverlay = lazy(
    () => import(/* webpackMode: "lazy", webpackChunkName: "overlay" */ 'Component/MyAccountOptionsOverlay')
);

/** @namespace Scandipwa/Component/Header/Component */
export class HeaderComponent extends SourceHeaderComponent {
    static propTypes = {
        ...this.propTypes,
        isMenuOpen: PropTypes.bool,
        openMenu: PropTypes.func.isRequired,
        closeMenu: PropTypes.func.isRequired,
        expandSearch: PropTypes.func.isRequired,
        collapseSearch: PropTypes.func.isRequired,
        staticItems: PropTypes.arrayOf(FormattedMenuItemType),
    };

    static defaultProps = {
        isMenuOpen: false,
    };

    /**
     * Overridden to remove top bar
     */
    renderTopMenu() {
        return null;
    }

    /**
     * Created to render menu icon
     */
    renderMenuIcon() {
        const { device: { isDesktop }, openMenu } = this.props;

        if (isDesktop) {
            return null;
        }

        return (
            <button
              block="Header"
              elem="MenuIcon"
              id="menu"
              tabIndex="0"
              aria-label="Open menu"
              type="button"
              onClick={ openMenu }
            >
                <MenuIcon />
            </button>
        );
    }

    /**
     * Overridden to remove sharewishlist button forever!
     */
    renderShareWishListButton() {
        return null;
    }

    /**
     * New method to render the wishlist button block in header
     */
    renderWishlist() {
        return (
            <div block="Header" elem="Button" mods={ { type: 'wishlist' } }>
                { this.renderWishlistButton() }
            </div>
        );
    }

    /**
     * New method to render the wishlist button with heart icon and link to wishlist page
     */
    renderWishlistButton() {
        return (
            <button
              block="Header"
              elem="WishlistButtonWrapper"
              tabIndex={ 0 }
              aria-label={ __('Wishlist') }
            >
                <Link block="Header" elem="Wishlist" to="/wishlist">
                    <HeartIcon />
                </Link>
            </button>
        );
    }

    /**
     * Overridden to replace isMobile with !isDesktop
     */
    renderMenu() {
        const {
            isCheckout,
            device: { isDesktop },
            staticItems,
        } = this.props;

        if (!isDesktop || isCheckout) {
            return null;
        }

        return <Menu staticItems={ staticItems } />;
    }

    /**
     * Created to render mobile menu
     */
    renderMobileMenu() {
        const {
            device: { isDesktop },
            isMenuOpen,
            closeMenu,
            staticItems,
        } = this.props;

        if (isDesktop) {
            return null;
        }

        return (
            <>
                <div block="Header" elem="Menu" mods={ { isActive: isMenuOpen } }>
                    <div block="Header" elem="MenuHeader">
                        <div block="Header" elem="MenuActions" />
                        <button
                          id="menu-close"
                          tabIndex="0"
                          aria-label="Close Menu"
                          type="button"
                          onClick={ closeMenu }
                        >
                            <CloseIcon />
                        </button>
                    </div>
                    <Menu
                      staticItems={ staticItems }
                      closeMenu={ closeMenu }
                    />
                </div>
                <div
                  block="Header"
                  elem="MenuOverlay"
                  mods={ { isVisible: isMenuOpen } }
                  onClick={ closeMenu }
                />
            </>
        );
    }

    /**
     * Overriden to verify if user is signed in and show a new block "My Account" or "Sign In" + chevron icon with proper direction
     */
    renderAccountButton() {
        const {
            onMyAccountButtonClick,
            device: {
                isDesktop,
                isMobile,
            } = {},
            activeOverlay,
        } = this.props;

        if (!isDesktop) {
            return null;
        }

        const myAccountWrapperText = isSignedIn() ? __('My account') : __('Sign in');

        return (
            <button
              block="Header"
              elem="MyAccountWrapper"
              tabIndex={ 0 }
              onClick={ onMyAccountButtonClick }
              aria-label={ __('Open my account') }
              id="myAccount"
              mods={ { isActive: !isMobile && activeOverlay === MY_ACCOUNT_OPTIONS_KEY_OVERLAY } }
            >
                <AvatarIcon />
                <p block="Header" elem="MyAccountWrapperPlaceholder">{ myAccountWrapperText }</p>
                { isSignedIn() && <ChevronIcon direction="bottom" /> }
            </button>
        );
    }

    /**
     * New method to render fallback for my account options
     */
    renderMyAccountOptionsOverlayFallback() {
        return (
            <PopupSuspense
              actualOverlayKey={ MY_ACCOUNT_OPTIONS_KEY_OVERLAY }
            />
        );
    }

    /**
     * Overridden to render another overlay when signed in
     */
    renderMyAccountOptionsOverlay() {
        const {
            isCheckout,
            onSignIn,
            staticItems,
        } = this.props;

        // This is here to prevent the popup-suspense from rendering
        if (!isSignedIn()) {
            return null;
        }

        return (
            <Suspense fallback={ <div /> }>
                <MyAccountOptionsOverlay
                  onSignIn={ onSignIn }
                  isCheckout={ isCheckout }
                  staticItems={ staticItems }
                />
            </Suspense>
        );
    }

    /**
     * Overridden to render my account options overlay
     */
    renderAccount() {
        const {
            onMyAccountOutsideClick,
            isCheckout,
            device: { isMobile },
        } = this.props;

        // on mobile hide button if not in checkout
        if (isMobile && !isCheckout) {
            return null;
        }

        if (isCheckout && isSignedIn()) {
            return null;
        }

        return (
            <div key="account" block="Header" elem="MyAccountContainer">
                { this.renderWelcomeMessage() }
                <ClickOutside
                  onClick={ onMyAccountOutsideClick }
                >
                    <div
                      aria-label="My account"
                      block="Header"
                      elem="MyAccount"
                    >
                        { this.renderAccountButton() }
                        { this.renderAccountOverlay() }
                        { this.renderMyAccountOptionsOverlay() }
                    </div>
                </ClickOutside>
            </div>
        );
    }

    /**
     * Overridden to render wishlist and remove compare changes button in desktop, and remove account button from mobile
     * Add menu icon on mobile
     */
    renderDesktopIcons() {
        const {
            device: {
                isDesktop,
            } = {},
        } = this.props;

        return (
            <div
              block="Header"
              elem="IconsWrapper"
              key="desktop-icons"
            >
                { isDesktop && this.renderAccount() }
                { this.renderWishlistButton() }
                { this.renderMinicart() }
                { this.renderMenuIcon() }
            </div>
        );
    }

    /**
     * Overridden to change aria-label
     */
    renderLogo(isVisible = false) {
        const {
            isLoading,
        } = this.props;

        if (isLoading) {
            return null;
        }

        return (
            <Link
              to="/"
              aria-label={ __('Go to homepage by clicking on 2Games logo') }
              aria-hidden={ !isVisible }
              tabIndex={ isVisible ? 0 : -1 }
              block="Header"
              elem="LogoWrapper"
              mods={ { isVisible } }
              key="logo"
            >
                { this.renderLogoImage() }
            </Link>
        );
    }

    /**
     * Overridden to remove mobile confirmation so it can be displayed on mobile
     */
    renderMinicart(isVisible = false) {
        const {
            onMinicartOutsideClick,
            isCheckout,
            activeOverlay,
            cartState,
        } = this.props;

        if (isCheckout) {
            return null;
        }

        return (
            <ClickOutside
              onClick={ onMinicartOutsideClick }
              key="minicart"
            >
                <div
                  block="Header"
                  elem="Button"
                  mods={ { isVisible, type: 'minicart', isOpen: cartState || activeOverlay === Page.CART_OVERLAY } }
                >
                    { this.renderMinicartButton() }
                    { this.renderMinicartOverlay() }
                </div>
            </ClickOutside>
        );
    }

    /**
     * Overriden to change render condition to use the cartState prop on mobile
     */
    renderMinicartOverlay() {
        const { cartState, device: { isMobile } } = this.props;

        if (!isMobile) {
            return super.renderMinicartOverlay();
        }

        if (!cartState) {
            return null;
        }

        return <CartOverlay />;
    }

    /**
     * Overriden to pass expandSearch and collapseSearch props to manipulate search state through header
     */
    renderSearchField(isVisible = false) {
        const {
            searchCriteria,
            onSearchOutsideClick,
            onSearchBarFocus,
            onSearchBarChange,
            onClearSearchButtonClick,
            navigationState: { name },
            isCheckout,
            hideActiveOverlay,
            expandSearch,
            collapseSearch,
        } = this.props;

        if (isCheckout) {
            return null;
        }

        return (
            <SearchField
              key="search"
              searchCriteria={ searchCriteria }
              onSearchOutsideClick={ onSearchOutsideClick }
              onSearchBarFocus={ onSearchBarFocus }
              onSearchBarChange={ onSearchBarChange }
              onClearSearchButtonClick={ onClearSearchButtonClick }
              isVisible={ isVisible }
              isActive={ name === Page.SEARCH }
              hideActiveOverlay={ hideActiveOverlay }
              expandSearch={ expandSearch }
              collapseSearch={ collapseSearch }
            />
        );
    }

    /**
     * Overriden to detect if search is expanded and remove qty so it doesn't show up above search field
     */
    renderMinicartItemsQty() {
        const {
            cartTotals: { total_quantity },
            isSearchExpanded,
            device: {
                isDesktop,
            } = {},
        } = this.props;

        if (!total_quantity || (isSearchExpanded && !isDesktop)) {
            return null;
        }

        return (
            <span
              aria-label="Items in cart"
              block="Header"
              elem="MinicartItemCount"
            >
                { total_quantity }
            </span>
        );
    }

    /**
     * Overridden to render mobile menu
     */
    render() {
        const { stateMap } = this;
        const {
            navigationState: { name, isHiddenOnMobile = false },
            isCheckout,
            device: { isDesktop },
        } = this.props;

        if (isDesktop) {
            // hide edit button on desktop
            stateMap[Page.CUSTOMER_WISHLIST].edit = false;
            stateMap[Page.CUSTOMER_WISHLIST].share = false;
            stateMap[Page.CART_OVERLAY].edit = false;
        }

        return (
            <section
              block="Header"
              elem="Wrapper"
              mods={ { isPrerendered: isSSR() || isCrawler() } }
            >
                <header
                  block="Header"
                  mods={ { name, isHiddenOnMobile, isCheckout } }
                  mix={ { block: 'FixedElement', elem: 'Top' } }
                  ref={ this.logoRef }
                >
                    { this.renderTopMenu() }
                    <nav block="Header" elem="Nav">
                        { this.renderNavigationState() }
                    </nav>
                    { this.renderMenu() }
                </header>
                { this.renderMobileMenu() }
                <OfflineNotice />
            </section>
        );
    }
}

export default HeaderComponent;
