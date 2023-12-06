/**
 * Adobe page builder compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { PureComponent } from 'react';

import ScandiPwaSlider from 'SourceComponent/Slider';

import { PagebuilderElementType } from '../../type/Elements.type';
import { DEFAULT_AUTOPLAY_DURATION_MS } from './Slider.config';

import './Slider.style';

/** @namespace Scandiweb/AdobePageBuilder/Component/Slider/Component */
export class SliderComponent extends PureComponent {
    static propTypes = {
        elements: PagebuilderElementType.isRequired
    };

    componentDidMount() {
        if (this.sliderProps['data-autoplay'] === 'true') {
            this.startCarousel(
                this.sliderProps['data-autoplay-speed']
                || DEFAULT_AUTOPLAY_DURATION_MS
            );
        }
    }

    componentWillUnmount() {
        clearInterval(this.carouselInterval);
    }

    __construct(props) {
        super.__construct(props);

        const { BaseSlider, Slide } = props.elements;
        this.sliderProps = BaseSlider.propsBag.length > 0 ? BaseSlider.propsBag[0] : {};
        this.slideProps = Slide.propsBag.length > 0 ? Slide.propsBag : [];

        this.state = {
            activeImage: 0,
            carouselDirection: 'right',
            imageToShow: 0
        };
    }

    startCarousel = (interval) => {
        this.carouselInterval = setInterval(() => {
            this.getImageToShow();

            const { imageToShow } = this.state;

            this.onActiveImageChange(imageToShow);
        }, interval);
    };

    getImageToShow() {
        const { activeImage, carouselDirection } = this.state;

        if (activeImage === 0) {
            this.setState({
                carouselDirection: 'right',
                imageToShow: activeImage + 1
            });
        } else if (activeImage === this.slideProps.length - 1) {
            this.setState({
                carouselDirection: 'left',
                imageToShow: activeImage - 1
            });
        } else {
            this.setState({ imageToShow: carouselDirection === 'right' ? activeImage + 1 : activeImage - 1 });
        }
    }

    onActiveImageChange = (activeImage) => {
        this.setState({ activeImage });
    };

    renderSlide = (_, i) => {
        const { elements: { Slide } } = this.props;

        return (
            <div key={ i }>
                <Slide.Ele>
                    { Slide.childEleBag[i] }
                </Slide.Ele>
            </div>
        );
    };

    render() {
        const { activeImage } = this.state;
        const { elements: { Slide } } = this.props;

        return (
            <div block="PageBuilderSlider">
                <ScandiPwaSlider
                  showCrumbs={ this.sliderProps['data-show-dots'] === 'true' }
                  showArrows={ this.sliderProps['data-show-arrows'] === 'true' }
                  activeImage={ activeImage }
                  onActiveImageChange={ this.onActiveImageChange }
                >
                    { Slide.propsBag.map(this.renderSlide) }
                </ScandiPwaSlider>
            </div>
        );
    }
}

export default SliderComponent;
