/* eslint-disable max-len */
import { MenuIconComponent as SourceMenuIconComponent } from 'SourceComponent/MenuIcon/MenuIcon.component';

import './MenuIcon.override.style';

/** @namespace Scandipwa/Component/MenuIcon/Component */
export class MenuIconComponent extends SourceMenuIconComponent {
    render() {
        const { isActive } = this.props;

        return (
            <svg
              block="MenuIcon"
              mods={ { isActive } }
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M21 7H8C7.448 7 7 6.552 7 6C7 5.448 7.448 5 8 5H21C21.552 5 22 5.448 22 6C22 6.552 21.552 7 21 7ZM22 12C22 11.448 21.552 11 21 11H3C2.448 11 2 11.448 2 12C2 12.552 2.448 13 3 13H21C21.552 13 22 12.552 22 12ZM22 18C22 17.448 21.552 17 21 17H12C11.448 17 11 17.448 11 18C11 18.552 11.448 19 12 19H21C21.552 19 22 18.552 22 18Z" />
            </svg>
        );
    }
}

export default MenuIconComponent;
