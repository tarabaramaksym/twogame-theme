import {
    FilterIconComponent as SourceFilterIconComponent,
} from 'SourceComponent/FilterIcon/FilterIcon.component';

import './FilterIcon.style';

/** @namespace Scandipwa/Component/FilterIcon/Component */
export class FilterIconComponent extends SourceFilterIconComponent {
    render() {
        return (
            <svg block="FilterIcon" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.5 5.25L20.5 5.25C20.914 5.25 21.25 5.586
                    21.25 6C21.25 6.414 20.914 6.75 20.5 6.75L4.5 6.75C4.086
                    6.75 3.75 6.414 3.75 6C3.75 5.586 4.086 5.25 4.5 5.25ZM6.75
                    12C6.75 12.414 7.086 12.75 7.5 12.75L17.5 12.75C17.914 12.75
                    18.25 12.414 18.25 12C18.25 11.586 17.914 11.25 17.5 11.25L7.5 11.25C7.086
                    11.25 6.75 11.586 6.75 12ZM9.75 18C9.75 18.414 10.086 18.75 10.5 18.75L14.5
                    18.75C14.914 18.75 15.25 18.414 15.25 18C15.25 17.586 14.914 17.25
                    14.5 17.25L10.5 17.25C10.086 17.25 9.75 17.586 9.75 18Z"
                />
            </svg>
        );
    }
}

export default FilterIconComponent;
