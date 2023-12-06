import PropTypes from 'prop-types';

import CloseIcon from 'Component/CloseIcon';
import SearchIcon from 'Component/SearchIcon';
import SearchOverlay from 'Component/SearchOverlay';
import {
    SearchFieldComponent as SourceSearchFieldComponent,
} from 'SourceComponent/SearchField/SearchField.component';
import { RefType } from 'Type/Common.type';
import { DeviceType } from 'Type/Device.type';
import { noopFn } from 'Util/Common';

import './SearchField.override.style';

/** @namespace Scandipwa/Component/SearchField/Component */
export class SearchFieldComponent extends SourceSearchFieldComponent {
    static propTypes = {
        device: DeviceType.isRequired,
        isVisible: PropTypes.bool,
        searchCriteria: PropTypes.string,
        hideActiveOverlay: PropTypes.func,
        onClearSearchButtonClick: PropTypes.func,
        onSearchBarChange: PropTypes.func,
        onSearchBarFocus: PropTypes.func,
        onSearchOutsideClick: PropTypes.func,
        toggleActiveState: PropTypes.bool.isRequired,
        openSearch: PropTypes.func.isRequired,
        onBlur: PropTypes.func.isRequired,
        searchBarRef: RefType.isRequired,
        searchWrapperRef: RefType.isRequired,
    };

    static defaultProps = {
        isVisible: true,
        isActive: true,
        searchCriteria: '',
        hideActiveOverlay: noopFn,
        onClearSearchButtonClick: noopFn,
        onSearchBarChange: noopFn,
        onSearchBarFocus: noopFn,
        onSearchOutsideClick: noopFn,
    };

    /**
     * Overriden to only render the SearchIcon, CloseIcon was moved into a new function
     */
    renderSearchIcon() {
        const { openSearch } = this.props;

        return (
            <button
              block="SearchField"
              elem="SearchIcon"
              onClick={ openSearch }
              aria-label={ __('Search') }
              type="button"
            >
                <SearchIcon />
            </button>
        );
    }

    /**
     * New function to render the CloseIcon
     */
    renderCloseIcon() {
        const { onBlur } = this.props;

        return (
            <button
              block="SearchField"
              elem="CloseIcon"
              onClick={ onBlur }
              aria-label={ __('Close') }
              type="button"
            >
                <CloseIcon />
            </button>
        );
    }

    /**
     * Overriden to use the isActiveState instead of isActive
     */
    renderSearch() {
        const {
            searchCriteria,
            toggleActiveState,
            isActiveState,
            onBlur,
            searchBarRef,
            searchWrapperRef,
        } = this.props;

        return (
            <div
              block="SearchField"
              elem="SearchInnerWrapper"
              ref={ searchWrapperRef }
            >
                <input
                  id="search-field"
                  ref={ searchBarRef }
                  block="SearchField"
                  elem="Input"
                  onFocus={ toggleActiveState }
                  onChange={ this.handleChange }
                  onKeyDown={ this.onSearchEnterPress }
                  onBlur={ onBlur }
                  value={ searchCriteria }
                  mods={ { isActive: isActiveState } }
                  placeholder={ __('Find your game here') }
                  autoComplete="off"
                  aria-label={ __('Search') }
                />
                { isActiveState && this.renderCloseIcon() }
                { this.renderSearchIcon() }
                <SearchOverlay
                  isHideOverlay
                  searchCriteria={ searchCriteria }
                  onViewAllPress={ this.onSearchEnterPress }
                  beforeItemClick={ onBlur }
                />
            </div>
        );
    }

    /**
     * New function to render the mobile input field
     */
    renderMobileInput() {
        const {
            searchCriteria,
            isActiveState,
            onBlur,
            searchBarRef,
            searchWrapperRef,
            toggleActiveState,
        } = this.props;

        return (
            <div
              block="SearchField"
              elem="SearchInnerWrapper"
              mods={ { isActive: isActiveState } }
              ref={ searchWrapperRef }
            >
                <input
                  id="search-field"
                  ref={ searchBarRef }
                  block="SearchField"
                  elem="Input"
                  onFocus={ toggleActiveState }
                  onChange={ this.handleChange }
                  onBlur={ onBlur }
                  value={ searchCriteria }
                  mods={ { isActive: isActiveState } }
                  placeholder={ __('Find your game here') }
                  autoComplete="off"
                  aria-label={ __('Search') }
                />
                { isActiveState && this.renderCloseIcon() }
                { this.renderSearchIcon() }
                <SearchOverlay
                  isHideOverlay
                  searchCriteria={ searchCriteria }
                  onViewAllPress={ this.onSearchEnterPress }
                  beforeItemClick={ onBlur }
                />
            </div>
        );
    }

    /**
     * New function to render the mobile search field.
     */
    renderMobileSearch() {
        const { isActiveState, openSearch } = this.props;

        return (
            <div
              block="SearchField"
              elem="MobileSearch"
              mods={ { isActive: isActiveState } }
            >
                <button
                  onClick={ openSearch }
                  block="SearchField"
                  elem="MobileButton"
                  mods={ { isActive: isActiveState } }
                  type="button"
                >
                    <SearchIcon />
                </button>
                { this.renderMobileInput() }
            </div>
        );
    }

    /**
     * Overriden to render a different SearchField on mobile view
     */
    render() {
        const { device: { isMobile } } = this.props;

        if (isMobile) {
            return this.renderMobileSearch();
        }

        return super.render();
    }
}

export default SearchFieldComponent;
