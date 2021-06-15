import { Component } from 'react';
import './Slider.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image from '../../assets/Poprobui370x370.jpg';
import Promotions from '../Promotions/Promotions';
import { Spin } from 'antd';

export default class SimpleSlider extends Component {
  state = {
    loading: false,
    data: [],
  };

  componentDidMount() {
    this.setState({ loading: true });
    fetch(
      'http://test-rest-api.site/api/1/site/action/list/?token=b4831f21df6202f5bacade4b7bbc3e5c',
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ loading: false, data: data.data });
      });
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 3000,
      autoplaySpeed: 6000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    };

    return (
      <Spin spinning={this.state.loading}>
        <div className="sliderBlock">
          <div className="Promotions-contener">
            <Promotions title="ознакомьтесь с акциями" />
          </div>
          <Slider {...settings}>
            {this.state.data.map((item: any) => (
              <div key={item.Action.id} className="Slider-slide">
                <a target="_blank" href="/actions">
                  <img
                    className="slider1"
                    src={
                      item.image_url?.includes('http://')
                        ? item.image_url
                        : `http://${item.image_url}`
                    }
                    alt=""
                  />
                </a>
              </div>
            ))}
          </Slider>
        </div>
      </Spin>
    );
  }
}
