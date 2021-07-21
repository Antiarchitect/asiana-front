import React from 'react';
import Carousel from 'nuka-carousel';
import './DemoCarousel.scss';
import Science from '../../assets/Science.jpg';
import Industrial from '../../assets/Industrial.jpg';
import Parashutnaya from '../../assets/Parashutnaya.jpg';
import service from '../../assets/service.jpg';
import Simonova from '../../assets/Simonova.jpg';
import Sofiyskaya from '../../assets/Sofiyskaya.jpg';
import { GoArrowSmallLeft } from 'react-icons/go';
import { GoArrowSmallRight } from 'react-icons/go';

class DemoCarousel extends React.Component {
  state = {
    slideIndex: 0,
  };
  render() {
    return (
      <Carousel
        className="Carousel-Block mt-5"
        slideIndex={this.state.slideIndex}
        renderCenterLeftControls={({ previousSlide }) => (
          <button className="Carousel-icon-Block" onClick={previousSlide}>
            <GoArrowSmallLeft className="Carousel-icon" />
          </button>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <button className="Carousel-icon-Block" onClick={nextSlide}>
            <GoArrowSmallRight className="Carousel-icon" />
          </button>
        )}>
        <img className="Carousel-img" src={Science} alt="/" />
        <img className="Carousel-img" src={Industrial} alt="/" />
        <img className="Carousel-img" src={Parashutnaya} alt="/" />
        <img className="Carousel-img" src={service} alt="/" />
        <img className="Carousel-img" src={Simonova} alt="/" />
        <img className="Carousel-img" src={Sofiyskaya} alt="/" />
      </Carousel>
    );
  }
}
export default DemoCarousel;
