import PropTypes from 'prop-types';
import { createRef, PureComponent } from 'react';
import { connect } from 'react-redux';

import { mapDispatchToProps, mapStateToProps } from 'SourceComponent/SearchField/SearchField.container';
import { DeviceType } from 'Type/Device.type';
import { scrollToTop } from 'Util/Browser';
import { noopFn } from 'Util/Common';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import SearchFieldComponent from './SearchField.component';

/** @namespace Scandipwa/Component/SearchField/Container */
export class SearchFieldContainer extends PureComponent {
    static propTypes = {
        device: DeviceType.isRequired,
        isVisible: PropTypes.bool,
        searchCriteria: PropTypes.string,
        hideActiveOverlay: PropTypes.func,
        onClearSearchButtonClick: PropTypes.func,
        onSearchBarChange: PropTypes.func,
        onSearchBarFocus: PropTypes.func,
        onSearchOutsideClick: PropTypes.func,
        expandSearch: PropTypes.func.isRequired,
        collapseSearch: PropTypes.func.isRequired,
    };

    static defaultProps = {
        isVisible: true,
        searchCriteria: '',
        hideActiveOverlay: noopFn,
        onClearSearchButtonClick: noopFn,
        onSearchBarChange: noopFn,
        onSearchBarFocus: noopFn,
        onSearchOutsideClick: noopFn,
    };

    containerFunctions = {
        toggleActiveState: this.toggleActiveState.bind(this),
        openSearch: this.openSearch.bind(this),
        onBlur: this.onBlur.bind(this),
    };

    searchBarRef = createRef();

    searchWrapperRef = createRef();

    /**
     * Overridden to rebind functions, otherwise overrides for them wont work
     */
    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    __constsuct(props) {
        super.__construct?.(props);
        this.closeSearch = this.closeSearch.bind(this);
        this.onSearchEnterPress = this.onSearchEnterPress.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            isActiveState: false,
        };
    }

    /**
     * Overridden to handle button click from search overlay
     */
    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    onSearchEnterPress(e, isButton = false) {
        const { searchCriteria, hideActiveOverlay, onSearchBarChange } = this.props;
        const search = encodeURIComponent(searchCriteria.trim().replace(/%/g, '%25'));
        const trimmedSearch = searchCriteria.trim();

        if ((e.key === 'Enter' || isButton) && trimmedSearch !== '') {
            history.push(appendWithStoreCode(`/search/${ search }`));
            hideActiveOverlay();
            onSearchBarChange({ target: { value: '' } });
            this.searchBarRef.current?.blur();
            this.closeSearch();
            scrollToTop();
        }
    }

    containerProps() {
        const {
            device,
            isVisible,
            searchCriteria,
            hideActiveOverlay,
            onClearSearchButtonClick,
            onSearchBarChange,
            onSearchBarFocus,
            onSearchOutsideClick,
        } = this.props;
        const { isActiveState } = this.state;

        return {
            device,
            isVisible,
            searchCriteria,
            hideActiveOverlay,
            isActiveState,
            onClearSearchButtonClick,
            onSearchBarChange,
            onSearchBarFocus,
            onSearchOutsideClick,
            searchBarRef: this.searchBarRef,
            searchWrapperRef: this.searchWrapperRef,
        };
    }

    /**
     * New function to handle toggling the active state as well as focusing the search input.
     */
    openSearch() {
        const { expandSearch } = this.props;

        this.toggleActiveState();
        this.searchBarRef.current?.focus();
        expandSearch();
    }

    /**
     * New function to handle toggling the active state as well as resetting the search text.
     */
    onBlur(e) {
        const searchWrapper = this.searchWrapperRef.current;

        if (searchWrapper && e?.relatedTarget && searchWrapper.contains(e?.relatedTarget)) {
            return;
        }

        const { onClearSearchButtonClick, collapseSearch } = this.props;

        this.toggleActiveState();
        onClearSearchButtonClick();
        collapseSearch();
    }

    toggleActiveState() {
        const { isActiveState } = this.state;

        this.setState({ isActiveState: !isActiveState });
    }

    render() {
        return (
            <SearchFieldComponent
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFieldContainer);
