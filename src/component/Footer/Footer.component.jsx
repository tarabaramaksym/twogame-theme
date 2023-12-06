import PropTypes from 'prop-types';

import ChevronIcon from 'Component/ChevronIcon';
import { Directions } from 'Component/ChevronIcon/ChevronIcon.config';
import CmsBlock from 'Component/CmsBlock';
import ContentWrapper from 'Component/ContentWrapper';
import Link from 'Component/Link';
import Logo from 'Component/Logo';
import RenderWhenVisible from 'Component/RenderWhenVisible';
import StoreSwitcher from 'Component/StoreSwitcher';
import {
    FooterComponent as SourceFooterComponent,
} from 'SourceComponent/Footer/Footer.component';
import media from 'Util/Media';
import { LOGO_MEDIA } from 'Util/Media/Media';

import { PAYMENTS_BLOCK } from './Footer.config';

import './Footer.override.style';

/** @namespace Scandipwa/Component/Footer/Component */
export class FooterComponent extends SourceFooterComponent {
    static propTypes = {
        header_logo_src: PropTypes.string.isRequired,
        logo_alt: PropTypes.string.isRequired,
        copyright_text: PropTypes.string.isRequired,
        smoothScrollToTop: PropTypes.func.isRequired,
        isHidden: PropTypes.bool.isRequired,
    };

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    shouldComponentUpdate(nextProps) {
        const {
            isHidden,
        } = this.props;

        const {
            isHidden: nextIsHidden,
        } = nextProps;

        return super.shouldComponentUpdate(nextProps) || isHidden !== nextIsHidden;
    }

    /**
     * New function to render the logo and language switcher
     */
    renderFooterHeader() {
        const { header_logo_src, logo_alt, device: { isMobile } } = this.props;

        const logoSrc = header_logo_src ? media(header_logo_src, LOGO_MEDIA) : null;

        if (isMobile) {
            return (
                <div block="Footer" elem="Header">
                    <Link to="/">
                        <Logo
                          src={ logoSrc }
                          alt={ logo_alt }
                        />
                    </Link>
                    <StoreSwitcher />
                </div>
            );
        }

        return (
            <div block="Footer" elem="Header">
                <Logo
                  src={ logoSrc }
                  alt={ logo_alt }
                />
                <StoreSwitcher />
            </div>
        );
    }

    /**
     * New function to render a button to smoothly scroll to the top of the page
     */
    renderScrollButton() {
        const { smoothScrollToTop } = this.props;

        return (
            <button
              onClick={ smoothScrollToTop }
              block="Footer"
              elem="ScrollButton"
              mix={ { block: 'Button' } }
            >
                <ChevronIcon direction={ Directions.TOP } />
            </button>
        );
    }

    /**
     * Overriden to remove the scandiweb part of the copyright
     * To use copyright_text prop coming from store
     */
    renderCopyrightContent() {
        const { copyright_text } = this.props;

        return (
            <ContentWrapper
              mix={ { block: 'Footer', elem: 'CopyrightContentWrapper' } }
              wrapperMix={ { block: 'Footer', elem: 'CopyrightContent' } }
              label=""
            >
                <span block="Footer" elem="Copyright">
                    { copyright_text }
                </span>
            </ContentWrapper>
        );
    }

    /**
     * Created to render payments method
     */
    renderPaymentsBlock() {
        return (
            <div block="Footer" elem="PaymentsWrapper">
                <ContentWrapper>
                    <p block="Footer" elem="PaymentsText">{ __('We accept:') }</p>
                </ContentWrapper>
                <CmsBlock identifier={ PAYMENTS_BLOCK } />
            </div>
        );
    }

    /**
     * Overriden to invoke renderFooterHeader function
     * To render regardless of mobile or desktop view
     * And to not render on pages where it should be hidden
     */
    render() {
        const {
            isHidden,
        } = this.props;

        if (isHidden) {
            return null;
        }

        return (
            <RenderWhenVisible>
                <footer block="Footer" aria-label="Footer">
                    { this.renderPaymentsBlock() }
                    { this.renderFooterHeader() }
                    { this.renderContent() }
                    { this.renderScrollButton() }
                    { this.renderCopyrightContent() }
                </footer>
            </RenderWhenVisible>
        );
    }
}

export default FooterComponent;
