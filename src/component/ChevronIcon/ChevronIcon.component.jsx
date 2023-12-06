import {
    ChevronIconComponent as SourceChevronIconComponent,
} from 'SourceComponent/ChevronIcon/ChevronIcon.component';

/** @namespace Scandipwa/Component/ChevronIcon/Component */
export class ChevronIconComponent extends SourceChevronIconComponent {
    /**
     * Overriden to render a different ChevronIcon
     */
    render() {
        const { direction } = this.props;

        return (
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              block="ChevronIcon"
              mods={ { direction } }
            >
                <path d="M13.0002 10.2497C13.1922 10.2497 13.3843 10.3227 13.5303
                    10.4697L17.5303 14.4697C17.8233 14.7627 17.8233 15.2377
                    17.5303 15.5307L13.5303 19.5307C13.2372 19.8237
                    12.7622 19.8237 12.4692 19.5307C12.1762 19.2377 12.1762
                    18.7627 12.4692 18.4697L15.9392 14.9997L12.4692
                    11.5298C12.1762 11.2368 12.1762 10.7617 12.4692
                    10.4687C12.6162 10.3227 12.8082 10.2497 13.0002 10.2497Z"
                />
            </svg>
        );
    }
}

export default ChevronIconComponent;
