import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import {
    FooterContainer as SourceFooterContainer,
    mapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
} from 'SourceComponent/Footer/Footer.container';
import { scrollToTop } from 'Util/Browser';
import history from 'Util/History';

export {
    mapDispatchToProps,
};

/** @namespace Scandipwa/Component/Footer/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    header_logo_src: state.ConfigReducer.header_logo_src,
    logo_alt: state.ConfigReducer.logo_alt,
    copyright_text: state.ConfigReducer.copyright,
});

/** @namespace Scandipwa/Component/Footer/Container */
export class FooterContainer extends SourceFooterContainer {
    static propTypes = {
        header_logo_src: PropTypes.string.isRequired,
        logo_alt: PropTypes.string.isRequired,
        copyright_text: PropTypes.string.isRequired,
        smoothScrollToTop: PropTypes.func.isRequired,
    };

    containerFunctions = {
        ...this.containerFunctions,
        smoothScrollToTop: this.smoothScrollToTop.bind(this),
    };

    __construct(props) {
        super.__construct(props);

        this.hiddenOnPages = {
            [AccountPageUrl.LOGIN_URL]: AccountPageUrl.LOGIN_URL,
            [AccountPageUrl.REGISTRATION_URL]: AccountPageUrl.REGISTRATION_URL,
        };

        this.state = {
            ...this.state,
            isHidden: this.getIsHidden(),
        };
    }

    /**
     * New function to react to url changes
     */
    componentDidMount() {
        this.unlisten = history.listen(() => {
            this.setState({ isHidden: this.getIsHidden() });
        });
    }

    /**
     * New function to remove listener
     */
    componentWillUnmount() {
        if (this.unlisten) {
            this.unlisten();
        }
    }

    /**
     * New function to smoothly scroll to the top of the page
     */
    smoothScrollToTop() {
        scrollToTop({ behavior: 'smooth' });
    }

    /**
     * New function to get if footer should be hidden or not based on page
     */
    getIsHidden() {
        const {
            location: {
                pathname,
            },
        } = history;

        return Object.hasOwn(this.hiddenOnPages, pathname);
    }

    containerProps() {
        const { isHidden } = this.state;
        const {
            header_logo_src,
            logo_alt,
            copyright_text,
        } = this.props;

        return {
            ...super.containerProps(),
            isHidden,
            header_logo_src,
            logo_alt,
            copyright_text,
        };
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer);
