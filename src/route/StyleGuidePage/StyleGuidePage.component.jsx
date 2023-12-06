/* eslint-disable max-lines */
/* eslint-disable react/forbid-elements */

import AddIcon from 'Component/AddIcon';
import ContentWrapper from 'Component/ContentWrapper';
import FilterSearchField from 'Component/FilterSearchField';
import Pagination from 'Component/Pagination';
import SearchField from 'Component/SearchField';
import {
    StyleGuidePageComponent as SourceStyleGuidePage,
} from 'SourceRoute/StyleGuidePage/StyleGuidePage.component';

import { COLORS_INFO, PAGINATION, SEARCH_FIELD } from './StyleGuidePage.config';

import './StyleGuidePage.override.style';

/** @namespace Scandipwa/Route/StyleGuidePage/Component */
export class StyleGuidePageComponent extends SourceStyleGuidePage {
    /**
     * Overriden to add an extra element for Pagination
     */
    renderMap = {
        ...this.renderMap,
        [PAGINATION]: this.renderPagination,
        [SEARCH_FIELD]: this.renderSearchField,
    };

    /**
     * Overridden to add tablet view and update text
     */
    renderContentWrapper() {
        return (
            <>
                <ContentWrapper wrapperMix={ { block: 'StyleGuidePage', elem: 'DesktopContentWrapper' } }>
                    <h3>{ __('Desktop Content Wrapper Max Width: 1440px') }</h3>
                    <h4>{ __('Padding Right: 120px') }</h4>
                    <h4>{ __('Padding Left: 120px') }</h4>
                </ContentWrapper>
                <div block="StyleGuidePage" elem="Mt70" />
                <ContentWrapper wrapperMix={ { block: 'StyleGuidePage', elem: 'TabletContentWrapper' } }>
                    <h3>{ __('Tablet Content Wrapper Max Width: 1024px') }</h3>
                    <h4>{ __('Padding Right: 20px') }</h4>
                    <h4>{ __('Padding Left: 20px') }</h4>
                </ContentWrapper>
                <div block="StyleGuidePage" elem="Mt70" />
                <ContentWrapper wrapperMix={ { block: 'StyleGuidePage', elem: 'MobileContentWrapper' } }>
                    <h3>{ __('Mobile Content Wrapper Max Width: 810px') }</h3>
                    <h4>{ __('Padding Right: 15px') }</h4>
                    <h4>{ __('Padding Left: 15px') }</h4>
                </ContentWrapper>
            </>
        );
    }

    /**
     * Created to render different font weights
     */
    renderTextSection(title, mode) {
        return (
            <div block="StyleGuidePage" elem="Section" mods={ { [mode]: true } }>
                <h5 block="StyleGuidePage" elem="SubHeading">{ title }</h5>
                <div block="Display">{ __('Display 1') }</div>
                <div block="Display" elem="2">{ __('Display 2') }</div>
                <h1 id="h1">{ __('Heading 1') }</h1>
                <h2 id="h2">{ __('Heading 2') }</h2>
                <h3 id="h3">{ __('Heading 3') }</h3>
                <h4 id="h4">{ __('Heading 4') }</h4>
                <h5 id="h5">{ __('Heading 5') }</h5>
                <h6 id="h6">{ __('Heading 6') }</h6>
                <div block="Subheading">{ __('Subheading') }</div>
                <p block="Paragraph" elem="3">{ __('paragraph 3') }</p>
                <p block="Paragraph" elem="2">{ __('paragraph 2') }</p>
                <p id="paragraph">
                    { __('The ') }
                    <a block="Link" href="/">{ __('website') }</a>
                    { __(' aims to achieve') }
                    <strong>{ __(' following ') }</strong>
                    { __('business goals:') }
                </p>
                <p id="paragraph">
                    { __('The ') }
                    <a block="StyleGuidePage" href="/" elem="ActiveLink">{ __('website') }</a>
                    { __(' aims to achieve') }
                    <strong>{ __(' following ') }</strong>
                    { __('business goals:') }
                </p>
                <p block="caption" id="caption">
                    { __('The ') }
                    <a block="Link" href="/">{ __('website') }</a>
                    { __(' aims to achieve') }
                    <strong>{ __(' following ') }</strong>
                    { __('business goals:') }
                </p>
                <p block="caption" id="caption">
                    { __('The ') }
                    <a block="StyleGuidePage" elem="ActiveLink" href="/">{ __('website') }</a>
                    { __(' aims to achieve') }
                    <strong>{ __(' following ') }</strong>
                    { __('business goals:') }
                </p>
                <div block="Footer" elem="Text">{ __('Footer text') }</div>
            </div>
        );
    }

    /**
     * Created to render mobile and desktop views
     */
    renderTextView(isMobile = false) {
        const elem = isMobile ? 'MobileTextStyles' : 'DesktopTextStyles';
        const title = isMobile ? __('Mobile') : __('Desktop');

        return (
            <div block="StyleGuidePage" elem={ elem }>
                <h4 block="StyleGuidePage" elem="SubHeading">{ title }</h4>
                <div block="StyleGuidePage" elem="Container">
                    { this.renderTextSection(__('Default'), 'isDefault') }
                    { this.renderTextSection(__('Semi-Bold'), 'isSemiBold') }
                    { this.renderTextSection(__('Extra Bold'), 'isExtraBold') }
                </div>
            </div>
        );
    }

    /**
     * Overridden to add new typography elements
     */
    renderTextStyles() {
        return (
            <>
                { this.renderTextView() }
                { this.renderTextView(true) }
            </>
        );
    }

    /**
     * Created to render colors for each type (Primary, secondary...etc)
     */
    renderColorType(color) {
        const colorsCountArr = Array.from(Array(color.count));

        return (
            <div block="StyleGuidePage" elem="ColorsContainer">
                <h4 block="StyleGuidePage" elem="ColorsHeader">{ color.text }</h4>
                <div block="StyleGuidePage" elem="ColorsList">
                    { colorsCountArr.map((el, i) => (
                        <div
                          key={ `${color.text}-${i + 1}` }
                          block="StyleGuidePage"
                          elem={ `${color.text}-Color-${i + 1}` }
                        />
                    )) }
                </div>
            </div>
        );
    }

    /**
     * Overridden to remove unused colors and add newer ones through a newly created function.
     */
    renderColors() {
        return (
            <div block="StyleGuidePage" elem="Colors">
                <h4 block="StyleGuidePage" elem="SubHeading">{ __('Color scheme') }</h4>
                { this.renderColorType(COLORS_INFO.PRIMARY) }
                { this.renderColorType(COLORS_INFO.SECONDARY) }
                { this.renderColorType(COLORS_INFO.DARK) }
                { this.renderColorType(COLORS_INFO.LIGHT) }
            </div>
        );
    }

    /**
     * Overridden to add search field
     */
    renderInputs() {
        return (
            <>
                { super.renderInputs() }
                <h4 block="StyleGuidePage" elem="SubHeading">{ __('Search') }</h4>
                <div block="StyleGuidePage" elem="Search">
                    <FilterSearchField
                      attr={ {
                          placeholder: __('Find your category here'),
                      } }
                    />
                    <FilterSearchField
                      attr={ {
                          placeholder: __('Find your category here'),
                          mods: { isFocused: true },
                      } }
                    />
                </div>
            </>
        );
    }

    /*
     * New function to render different buttons based on parameters
     */
    renderButtonType(type = '', withIcon = false) {
        return (
            <div block="StyleGuidePage" elem="ButtonsContainer">
                <button block="Button" id="buttons" mods={ { [type]: true } }>
                    { withIcon && <AddIcon /> }
                    { __('Add to Cart') }
                </button>
                <button block="Button" id="hoverButtons" mods={ { isHovered: true, [type]: true } }>
                    { withIcon && <AddIcon /> }
                    { __('Add to Cart') }
                </button>
                <button block="Button" id="disabledButtons" disabled mods={ { [type]: true } }>
                    { withIcon && <AddIcon /> }
                    { __('Add to Cart') }
                </button>
            </div>
        );
    }

    /**
     * Overriden to render different buttons based on size as well as states
     * To remove secondary buttons as there is no design for them on Figma
     */
    renderButtons() {
        return (
            <div block="StyleGuidePage" elem="Buttons">
                <h4 block="StyleGuidePage" elem="SubHeading">{ __('Default, Hover and Disabled states') }</h4>
                { this.renderButtonType('Large') }
                { this.renderButtonType('Medium') }
                { this.renderButtonType() }
                <h4 block="StyleGuidePage" elem="SubHeading">
                    { __('Default, Hover and Disabled states (with icons)') }
                </h4>
                { this.renderButtonType('Large', true) }
                { this.renderButtonType('Medium', true) }
                { this.renderButtonType('', true) }
                <h4 block="StyleGuidePage" elem="SubHeading">
                    { __('Other buttons') }
                </h4>
                <button block="Button" mods={ { isHollow: true } }>{ __('View All') }</button>
                <button block="Button" mods={ { likeLink: true } }>{ __('Read More') }</button>
            </div>
        );
    }

    /**
     * New function created to render Pagination for testing purposes
     */
    renderPagination() {
        return (
            <Pagination
              totalPages={ 5 }
            />
        );
    }

    /**
     * New function to render the SearchField component
     */
    renderSearchField() {
        return <SearchField />;
    }
}

export default StyleGuidePageComponent;
