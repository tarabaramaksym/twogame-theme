/* eslint-disable max-len */
import { ChevronIconComponent as SourceChevronIconComponent } from 'SourceComponent/ChevronIcon/ChevronIcon.component';
import { ReactElement } from 'Type/Common.type';

import './ChevronIcon.override.style';

/** @namespace Scandipwa/Component/ChevronIcon/Component */
export class ChevronIconComponent extends SourceChevronIconComponent {
    /**
     * Overridden to update the icon
     */
    render(): ReactElement {
        const { direction } = this.props;

        return (
            <svg
              block="ChevronIcon"
              mods={ { direction } }
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M11.9998 14.75C11.8078 14.75 11.6157 14.6771 11.4697 14.5301L7.46975 10.5301C7.17675 10.2371 7.17675 9.76202 7.46975 9.46902C7.76275 9.17602 8.23779 9.17602 8.53079 9.46902L12.0008 12.939L15.4707 9.46902C15.7637 9.17602 16.2388 9.17602 16.5318 9.46902C16.8248 9.76202 16.8248 10.2371 16.5318 10.5301L12.5318 14.5301C12.3838 14.6771 12.1918 14.75 11.9998 14.75Z" />
            </svg>
        );
    }
}

export default ChevronIconComponent;
