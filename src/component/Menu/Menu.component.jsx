/* eslint-disable max-lines */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable @scandipwa/scandipwa-guidelines/only-render-in-component */
import PropTypes from 'prop-types';

import ContentWrapper from 'Component/ContentWrapper';
import FireIcon from 'Component/FireIcon';
import MenuItem from 'Component/MenuItem';
import { MenuComponent as SourceMenuComponent } from 'SourceComponent/Menu/Menu.component';
import { getSortedItems } from 'Util/Menu';

import { FormattedMenuItemType } from './Menu.type';

import './Menu.override.style';

/** @namespace Scandipwa/Component/Menu/Component */
export class MenuComponent extends SourceMenuComponent {
    static propTypes = {
        ...this.propTypes,
        activeSubCategory: FormattedMenuItemType,
        onSubCategoryHover: PropTypes.func.isRequired,
        staticItems: PropTypes.arrayOf(FormattedMenuItemType),
    };

    static defaultProps = {
        ...this.defaultProps,
        activeSubCategory: null,
        staticItems: [],
    };

    /**
     * Overridden to remove on scroll event handler
     */
    componentDidMount() {
    }

    /**
     * Created to render banners
     */
    renderBanners() {
        const { device: { isDesktop } } = this.props;

        if (!isDesktop) {
            return null;
        }

        // TODO: render banners on desktop
        return (
            <div block="Menu" elem="Banners">
                { __('Banners go here') }
            </div>
        );
    }

    /**
     * Overridden to remove unnecessary elements
     */
    renderAdditionalInformation(checkMobile = false) {
        const { device: { isDesktop } } = this.props;

        if (checkMobile && isDesktop) {
            return null;
        }

        // TODO: render header icons on mobile
        return null;
    }

    /**
     * Overridden to add icon param
     */
    renderFirstLevel(item, i, arr) {
        const { item_id } = item;

        if (i === arr.length - 1) {
            // eslint-disable-next-line no-param-reassign
            item.icon = <FireIcon />;
        }

        return (
            <li
              block="Menu"
              elem="Item"
              key={ item_id }
            >
                { this.renderFirstLevelItems.call(this, item) }
            </li>
        );
    }

    /**
     * Overridden to add arrow icon and render icon on desktop
     */
    renderFirstLevelItems(item) {
        const {
            activeMenuItemsStack,
            handleSubcategoryClick,
            onCategoryHover,
            closeMenu,
            device: { isDesktop },
        } = this.props;

        const { children, item_id, icon = null } = item;
        const childrenArray = Object.values(children);
        const itemMods = { type: 'main' };

        if (childrenArray.length && !isDesktop) {
            return (
                <div
                  onClick={ (e) => handleSubcategoryClick(e, item) }
                  tabIndex={ 0 }
                  block="Menu"
                  elem="SubCatLink"
                  role="button"
                >
                    <MenuItem
                      activeMenuItemsStack={ activeMenuItemsStack }
                      item={ item }
                      itemMods={ { ...itemMods, isExpanded: activeMenuItemsStack.includes(item_id) } }
                      onCategoryHover={ onCategoryHover }
                      closeMenu={ closeMenu }
                      icon={ icon }
                      isExpandable
                    />
                    { this.renderSubLevel(item, true) }
                </div>
            );
        }

        return (
            <MenuItem
              activeMenuItemsStack={ activeMenuItemsStack }
              item={ item }
              itemMods={ { ...itemMods, isExpanded: activeMenuItemsStack.includes(item_id) } }
              onClick={ () => onCategoryHover(item, true) }
              closeMenu={ closeMenu }
              icon={ icon }
              isExpandable={ !!childrenArray.length }
              isLink={ !childrenArray.length }
            />
        );
    }

    /**
     * Overridden to remove desktop sub level
     */
    renderSubLevelItems(item, isSecondLevel) {
        const {
            onSubCategoryHover,
            handleSubcategoryClick,
            activeMenuItemsStack,
            activeSubCategory,
            onCategoryHover,
            closeMenu,
            device: { isDesktop },
        } = this.props;

        const { item_id: activeSubCategoryId } = activeSubCategory || {};

        const {
            item_id,
            children,
            icon = null,
            onClick,
        } = item;

        const childrenArray = Object.values(children);
        const subcategoryMods = { type: 'subcategory', isSecondLevel };

        if (childrenArray.length && !isDesktop) {
            return (
                <div
                  key={ item_id }
                  onClick={ (e) => handleSubcategoryClick(e, item) }
                  tabIndex={ 0 }
                  role="button"
                >
                    <MenuItem
                      activeMenuItemsStack={ activeMenuItemsStack }
                      item={ item }
                      itemMods={ { ...subcategoryMods, isExpanded: activeMenuItemsStack.includes(item_id) } }
                      onCategoryHover={ onCategoryHover }
                      closeMenu={ closeMenu }
                      icon={ icon }
                      onClick={ onClick }
                      isExpandable
                    />
                    { this.renderSubLevel(item) }
                </div>
            );
        }

        return (
            <div
              block="Menu"
              elem="SubItemWrapper"
              key={ item_id }
              onClick={ this.stopPropagation }
              role="button"
              tabIndex={ -1 }
            >
                <MenuItem
                  activeMenuItemsStack={ activeMenuItemsStack }
                  item={ item }
                  itemMods={ { ...subcategoryMods, isExpanded: activeSubCategoryId === item_id } }
                  closeMenu={ closeMenu }
                  onCategoryHover={ () => onSubCategoryHover(item, true) }
                  isLink
                  icon={ icon }
                  onClick={ onClick }
                  isExpandable={ !!childrenArray.length }
                />
            </div>
        );
    }

    /**
     * Overridden to refactor the logic
     */
    renderDesktopSubLevel() {
        const { device: { isDesktop }, activeSubCategory } = this.props;

        if (!isDesktop || !activeSubCategory) {
            return null;
        }

        const { children, item_id } = activeSubCategory;
        const childrenArray = getSortedItems(Object.values(children));

        if (!childrenArray.length) {
            return null;
        }

        return (
            <div
              block="Menu"
              elem="SubLevelDesktop"
              key={ item_id }
            >
                <div
                  block="Menu"
                  elem="ItemList"
                >
                    { childrenArray.map((item) => this.renderDesktopSubLevelItems(item)) }
                </div>
            </div>
        );
    }

    /**
     * Overridden to add desktop sub level
     */
    renderSubLevel(category, isSecondLevel = false) {
        const { activeMenuItemsStack, device: { isDesktop }, closeMenu } = this.props;
        const {
            item_id, children, title, url,
        } = category;
        const childrenArray = getSortedItems(Object.values(children));
        const isVisible = activeMenuItemsStack.includes(item_id);
        const subcategoryMods = { type: 'subcategory' };

        return (
            <div
              block="Menu"
              elem="SubMenu"
              mods={ { isVisible } }
              key={ item_id }
            >
                <div
                  block="Menu"
                  elem="ItemList"
                  mods={ { ...subcategoryMods } }
                >
                    { (!isDesktop && url) && (
                        <MenuItem
                          activeMenuItemsStack={ activeMenuItemsStack }
                          item={ { ...category, title: __('All %s', title) } }
                          itemMods={ { ...subcategoryMods, isSecondLevel } }
                          closeMenu={ closeMenu }
                          isLink
                        />
                    ) }
                    { childrenArray.map((item) => this.renderSubLevelItems(item, isSecondLevel)) }
                </div>
                { this.renderDesktopSubLevel() }
                { this.renderBanners() }
            </div>
        );
    }

    /**
     * Overridden to add ContentWrapper
     */
    renderSubMenuDesktopItems(item) {
        const { item_id, children } = item;

        if (!Object.keys(children).length) {
            return null;
        }

        const { activeMenuItemsStack } = this.props;
        const isVisible = activeMenuItemsStack.includes(item_id);

        if (!isVisible) {
            return null;
        }

        return (
            <div
              block="Menu"
              elem="SubCategoriesWrapper"
              mods={ { isVisible } }
              key={ item_id }
            >
                <ContentWrapper>
                    <div
                      block="Menu"
                      elem="SubCategoriesWrapperInner"
                      mods={ { isVisible } }
                    >
                        <div
                          block="Menu"
                          elem="SubCategories"
                        >
                            { this.renderSubLevel(item) }
                        </div>
                        { this.renderAdditionalInformation() }
                    </div>
                </ContentWrapper>
            </div>
        );
    }

    /**
     * Overridden to replace isMobile with !isDesktop
     */
    renderSubMenuDesktop(itemList) {
        const { device: { isDesktop } } = this.props;

        if (!isDesktop) {
            return null;
        }

        const childrenArray = getSortedItems(Object.values(itemList));

        return childrenArray.map(this.renderSubMenuDesktopItems.bind(this));
    }

    /**
     * Overridden to add ContentWrapper
     */
    renderTopLevel() {
        const {
            menu,
            closeMenu,
            staticItems,
            activeMenuItemsStack,
        } = this.props;
        const categoryArray = Object.values(menu);
        const isVisible = !!activeMenuItemsStack.length;

        if (!categoryArray.length) {
            return <div block="Menu" elem="MainCategoriesPlaceholder" />;
        }

        const [{ children, title: mainCategoriesTitle }] = categoryArray;
        const childrenArray = getSortedItems(Object.values(children));

        childrenArray.unshift(...staticItems.filter(({ is_active }) => is_active));

        return (
            <>
                <div block="Menu" elem="MainCategories">
                    { this.renderAdditionalInformation(true) }
                    <ContentWrapper>
                        <ul
                          block="Menu"
                          elem="ItemList"
                          mods={ { type: 'main' } }
                          aria-label={ mainCategoriesTitle }
                        >
                            { childrenArray.map(this.renderFirstLevel.bind(this)) }
                        </ul>
                    </ContentWrapper>
                </div>
                { this.renderSubMenuDesktop(children) }
                <div
                  block="Menu"
                  elem="Overlay"
                  role="button"
                  tabIndex={ 0 }
                  aria-label={ __('Close menu') }
                  mods={ { isVisible } }
                  onClick={ closeMenu }
                  onKeyDown={ closeMenu }
                />
            </>
        );
    }

    /**
     * Overridden to remove onMouseLeave
     */
    render() {
        return (
            <div
              block="Menu"
              elem="MenuWrapper"
            >
                { this.renderTopLevel() }
            </div>
        );
    }
}

export default MenuComponent;
