import Breadcrumb from 'Component/Breadcrumb';
import {
    BreadcrumbsComponent as SourceBreadcrumbsComponent,
} from 'SourceComponent/Breadcrumbs/Breadcrumbs.component';

import { HOME_NAME_BREADCRUMB, MAX_ALLOWED_BREADCRUMBS } from './Breadcrumbs.config';

import './Breadcrumbs.override.style';

/** @namespace Scandipwa/Component/Breadcrumbs/Component */
export class BreadcrumbsComponent extends SourceBreadcrumbsComponent {
    /**
     * Overridden to not render more breadcrumbs than max allowed
     */
    renderBreadcrumbList(breadcrumbs) {
        const breadcrumbsWithHome = [
            ...breadcrumbs,
            // Looks like a browser bug, temporary fixed with .toString()
            { url: '/', name: HOME_NAME_BREADCRUMB.toString() },
        ];

        // vvv if there is less breadcrumbs than max allowed, just render as usual
        if (breadcrumbsWithHome.length <= MAX_ALLOWED_BREADCRUMBS) {
            return breadcrumbsWithHome
                .map((_, i) => this.renderBreadcrumb(breadcrumbsWithHome[breadcrumbsWithHome.length - 1 - i], i));
        }

        const { length } = breadcrumbsWithHome;

        // vvv if there is more, render last 2 and first n, where n is MAX_ALLOWED_BREADCRUMBS - 1
        return (
            <>
                { this.renderBreadcrumb(breadcrumbsWithHome[length - 1], -1) }
                { this.renderBreadcrumb(breadcrumbsWithHome[length - 2], length - 2) }
                <Breadcrumb isBlank />
                { breadcrumbsWithHome.slice(0, MAX_ALLOWED_BREADCRUMBS - 2)
                    .reverse()
                    .map(
                        (breadcrumb, i) => (breadcrumb.name ? this.renderBreadcrumb(breadcrumb, i) : ''),
                    ) }
            </>
        );
    }
}

export default BreadcrumbsComponent;
