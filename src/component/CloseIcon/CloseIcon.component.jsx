import {
    CloseIconComponent as SourceCloseIconComponent,
} from 'SourceComponent/CloseIcon/CloseIcon.component';

/** @namespace Scandipwa/Component/CloseIcon/Component */
export class CloseIconComponent extends SourceCloseIconComponent {
    render() {
        return (
            <svg block="CloseIcon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.53 13.47C14.823 13.763 14.823 14.238 14.53 14.531C14.384 14.677 14.192 14.751
                14 14.751C13.808 14.751 13.616 14.678 13.47 14.531L7.99999 9.061L2.52999 14.531C2.38399
                14.677 2.19199 14.751 1.99999 14.751C1.80799 14.751 1.61599 14.678 1.46999 14.531C1.17699
                14.238 1.17699 13.763 1.46999 13.47L6.94 8.00002L1.46999 2.53005C1.17699 2.23705 1.17699
                1.76202 1.46999 1.46902C1.76299 1.17602 2.238 1.17602 2.531 1.46902L8.001 6.93905L13.471 1.46902C13.764
                1.17602 14.239 1.17602 14.532 1.46902C14.825 1.76202 14.825 2.23705 14.532 2.53005L9.06199
                8.00002L14.53 13.47Z"
                />
            </svg>

        );
    }
}

export default CloseIconComponent;
