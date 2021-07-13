import { FC, useEffect } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Footer from '../../components/Footer/Footer';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
import './CarService.scss';
import Button from '../../components/Button/Button';
import Map from '../../components/Map/Map';
import { BiPhone } from 'react-icons/bi';
import SliderCarService from '../../components/SliderCarService/SliderCarService';
import { Table } from 'antd';
import { COLORS } from '../../constants';
// @ts-ignore
import WOW from 'wowjs';

interface IExternalProps {}

interface IProps extends IExternalProps {}

const dataSource = [
  {
    key: '1',
    modeWork: 'пн-вс: 09:00-21:00',
    address: 'Народного Ополчения пр., д.201',
    phone: '+7(812) 640-77-99',
  },
  {
    key: '2',
    modeWork: 'пн-вс: 09:00-21:00',
    address: 'Народного Ополчения пр., д.201',
    phone: '+7(812) 640-77-99',
  },
];

const columns = [
  {
    title: 'Подразделение / Адрес',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Режим работы',
    dataIndex: 'modeWork',
    key: 'modeWork',
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
    key: 'phone',
    render() {
      return (
        <Button bgColor={COLORS.transparent} className="CarService-button-td">
          {' '}
          <BiPhone className="CarService-biphone mr-1" size={20} />{' '}
          <span className="CarService-number">
            {' '}
            <b>
              {' '}
              <b>
                {' '}
                <a href="tel:++78126407799">+7(812) 640-77-99</a>{' '}
              </b>{' '}
            </b>{' '}
          </span>{' '}
        </Button>
      );
    },
  },
];

const CarService: FC<IProps> = () => {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <div className="page-with-header">
      <div className="container">
        <div className="CarService-container">
          <div>
            <div className="CarService-breadcrumbs-title">
              <div className="CarService-block">
                <Breadcrumbs />
              </div>
              <h1 className="CarService-title">
                Автосервис для корейских автомобилей | Санкт-Петербург
              </h1>
            </div>
          </div>
        </div>

        <div className="CarService-border-block">
          <input
            placeholder="Введите название СТО"
            className="CarService-search--input"
          />
          <Button className="CarService-search--button">Поиск</Button>
        </div>

        <h2 className="CarService-title-h2">АДРЕСА СЕРВИСОВ</h2>

        <div>
          <Map className="CarService-map"></Map>
        </div>

        <div>
          <h3 className="CarService-title-h2">МАЛЯРНО-КУЗОВНОЙ ЦЕНТР</h3>
        </div>
        <Table
          className="wow fadeIn "
          dataSource={dataSource}
          columns={columns}
        />

        <h4 className="CarService-title-h2">
          {' '}
          СТАНЦИИ ТЕХНИЧЕСКОГО ОБСЛУЖИВАНИЯ
        </h4>

        <Table
          className="wow fadeIn "
          dataSource={dataSource}
          columns={columns}
        />
        <h5 className="CarService-title-h2">ГАЛЕРЕЯ НАШИХ СТО</h5>
      </div>

      <SliderCarService />

      <Footer />
      <FloatingFooter />
    </div>
  );
};

export default CarService;
