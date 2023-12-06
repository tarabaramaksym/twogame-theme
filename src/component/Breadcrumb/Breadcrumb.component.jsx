import { PropTypes } from 'prop-types';

import { HOME_NAME_BREADCRUMB } from 'Component/Breadcrumbs/Breadcrumbs.config';
import G2Icon from 'Component/G2Icon';
import Link from 'Component/Link';
import TextPlaceholder from 'Component/TextPlaceholder';
import {
    BreadcrumbComponent as SourceBreadcrumbComponent,
} from 'SourceComponent/Breadcrumb/Breadcrumb.component';

import './Breadcrumb.override.style';

/** @namespace Scandiweb/TwogameTheme/Component/Breadcrumb/Component */
export class BreadcrumbComponent extends SourceBreadcrumbComponent {
    static containerProps = {
        isBlank: PropTypes.bool,
    };

    static defaultProps = {
        isBlank: false,
    };

    /**
     * New method to render icon for the home breadcrumb and handle case when string equals to 'undefined' string
     */
    renderBreadcrumbName() {
        const { name } = this.props;
        const nameToString = String(name);

        if (nameToString === HOME_NAME_BREADCRUMB) {
            return <G2Icon />;
        }

        return <TextPlaceholder content={ nameToString === 'undefined' ? null : nameToString } />;
    }

    /**
     * Overridden to remove ChevronIcon, add rendering for blank breadcrumbs and change name into separate method to render icon for home
     */
    renderLink() {
        const {
            index,
            isDisabled,
            isBlank,
        } = this.props;

        if (isBlank) {
            return (
                <p
                  block="Breadcrumb"
                  elem="Link"
                  mods={ { isBlank: true } }
                >
                    <TextPlaceholder content="..." />
                </p>
            );
        }

        const url = this.getLinkUrl();

        return (
            <Link
              block="Breadcrumb"
              elem="Link"
              to={ url }
              tabIndex={ isDisabled ? -1 : 0 }
            >
                <meta
                  itemProp="item"
                  content={ window.location.origin + url }
                />
                <span block="Breadcrumb" elem="Link-Name" itemProp="name">
                    { this.renderBreadcrumbName() }
                </span>
                <meta itemProp="position" content={ String(index) } />
            </Link>
        );
    }
}

export default BreadcrumbComponent;
