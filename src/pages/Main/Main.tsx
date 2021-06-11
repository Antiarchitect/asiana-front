import { FC, useEffect } from 'react';
import HeatherPreview from '../../components/HeatherPreview/HeatherPreview';
import BlockWithIcons from '../../components/BlockWithIcons/BlockWithIcons';
import MainNews from '../../components/MainNews/MainNews';
import Button from '../../components/Button/Button';
import './Main.scss';
import { BiChevronRight } from 'react-icons/bi';
import { COLORS } from '../../constants';
import Map from '../../components/Map/Map';
import Footer from '../../components/Footer/Footer';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
// @ts-ignore
import WOW from 'wowjs';
import { Link } from 'react-router-dom';

interface IExternalProps {}

interface IProps extends IExternalProps {}

const Main: FC<IProps> = () => {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <div className="page-with-header">
      <FloatingFooter />
      <HeatherPreview />
      <BlockWithIcons />
      <section className="container page-container--full">
        <MainNews />
        <Link to="/news">
          <Button className="Main-news-button">ПОКАЗАТЬ ВСЕ НОВОСТИ</Button>
        </Link>
      </section>
      <section className="Main-border">
        <section className="Main-video--section">
          <div className="Main-video--container">
            <div className="Main-video--block">
              <h2 className="Main-header">
                «КОРЕАНА» <br /> КОРЕЙСКИЕ ЗАПЧАСТИ <br /> ДЛЯ ВСЕХ РЕГИОНОВ{' '}
                <br /> РОССИИ
              </h2>
              <iframe
                title="main"
                data-wow-duration="2s"
                className="Main-iframe wow slideInLeft"
                src="https://www.youtube.com/embed/Z44wvK2g544"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            </div>
          </div>
          <div className="Main-section align-items-center d-flex justify-content-start">
            <div className="wow fadeIn" data-wow-duration="3s">
              <p className="Main-item">
                Компания «Кореана» предлагает запчасти, аксессуары и сервис для
                автомобилей корейского производства: Hyundai, Kia, Daewoo, Ssang
                Yong и Chevrolet.
              </p>
              <p className="Main-text-item">
                <b className="d-block mb-3">
                  За 20 лет безупречной работы компания «Кореана» набрала
                  огромнейший опыт и стала широко известна потребителям
                  корейских запчастей во всех регионах Российской Федерации.
                </b>{' '}
                Сегодня компании принадлежат десятки розничных магазинов
                автозапчастей в Санкт-Петербурге и Ленинградской области, Москве
                и Московской области, открыты магазины в Брянске, Великом
                Новгороде, Владимире, Калуге, Петрозаводске, Пскове, Рязани,
                Твери, Туле, Ярославле. Мы не останавливаемся на достигнутом и
                идём дальше: развиваем розничную сеть магазинов автозапчастей
                для иномарок, сеть технических центров по ремонту и обслуживанию
                автомобилей, веб-сервисы по реализации деталей к автомобилям,
                предлагаем оптовые поставки оригинальных и неоригинальных
                запчастей для корейских автомобилей крупным компаниям и
                небольшим магазинам, боремся за качество обслуживания наших
                клиентов.
              </p>
            </div>
          </div>
        </section>
      </section>
      <div className="Main-container container page-container--full">
        <section>
          <h3 className="Main-header-h3">
            ПОЧЕМУ ВЛАДЕЛЬЦЫ КОРЕЙСКИХ АВТОМОБИЛЕЙ ВЫБИРАЮТ КОМПАНИЮ «КОРЕАНА»?{' '}
          </h3>
        </section>
        <section className="Main-about-company">
          <div>
            <div className="Main-icon wow slideInLeft" data-wow-duration="2s">
              <div className="Main-block--icon">
                <BiChevronRight color={COLORS.red} size={30} />
              </div>
              <p>
                Прямые поставки автозапчастей и аксессуаров для корейских
                автомобилей на рынок Российской Федерации.
              </p>
            </div>
            <div className="Main-icon wow slideInLeft" data-wow-duration="2s">
              <div className="Main-block--icon">
                <BiChevronRight color={COLORS.red} size={30} />
              </div>
              <p>
                Широкая сеть розничных магазинов, а также интернет-магазин с
                доставкой товаров по всей территории России.
              </p>
            </div>
            <div className="Main-icon wow slideInLeft" data-wow-duration="2s">
              <div className="Main-block--icon">
                <BiChevronRight color={COLORS.red} size={30} />
              </div>
              <p>
                Огромный ассортимент запчастей для корейских автомобилей на
                собственных складах.
              </p>
            </div>
            <div className="Main-icon wow slideInLeft" data-wow-duration="2s">
              <div className="Main-block--icon">
                <BiChevronRight color={COLORS.red} size={30} />
              </div>
              <p>Запчасти с минимальной наценкой.</p>
            </div>
            <div className="Main-icon wow slideInLeft" data-wow-duration="2s">
              <div className="Main-block--icon">
                <BiChevronRight color={COLORS.red} size={30} />
              </div>
              <p>Гарантия на приобретённые запчасти.</p>
            </div>
            <div className="Main-icon wow slideInLeft" data-wow-duration="2s">
              <div className="Main-block--icon">
                <BiChevronRight color={COLORS.red} size={30} />
              </div>
              <p>
                Сеть технических центров по ремонту и обслуживанию корейских
                автомобилей.
              </p>
            </div>
            <div className="Main-icon wow slideInLeft" data-wow-duration="2s">
              <div className="Main-block--icon">
                <BiChevronRight color={COLORS.red} size={30} />
              </div>
              <p>
                В регионах, где присутствуют наши профессиональные технические
                центры, автовладелец имеет возможность получить комплекс услуг
                "запчасти + сервис".
              </p>
            </div>
          </div>
          <div>
            <div className="Main-text-block">
              <div
                className="Main-icon wow slideInRight"
                data-wow-duration="2s">
                <div className="Main-block--icon">
                  <BiChevronRight color={COLORS.red} size={30} />
                </div>
                <p>Наличие автозапчастей отображается в режиме On-line.</p>
              </div>
              <div
                className="Main-icon wow slideInRight"
                data-wow-duration="2s">
                <div className="Main-block--icon">
                  <BiChevronRight color={COLORS.red} size={30} />
                </div>
                <p>Оригинальные каталоги запчастей на нашем сайте.</p>
              </div>
              <div
                className="Main-icon wow slideInRight"
                data-wow-duration="2s">
                <div className="Main-block--icon">
                  <BiChevronRight color={COLORS.red} size={30} />
                </div>
                <p>Наличие службы контроля качества обслуживания клиентов.</p>
              </div>
              <div
                className="Main-icon wow slideInRight"
                data-wow-duration="2s">
                <div className="Main-block--icon">
                  <BiChevronRight color={COLORS.red} size={30} />
                </div>
                <p>
                  Пунктами выдачи заказов являются как розничные магазины
                  компании "Кореана", так и пункты выдачи транспортных компаний
                  СДЭК и DPD.
                </p>
              </div>
              <div
                className="Main-icon wow slideInRight"
                data-wow-duration="2s">
                <div className="Main-block--icon">
                  <BiChevronRight color={COLORS.red} size={30} />
                </div>
                <p>Выгодная дисконтная программа.</p>
              </div>
              <div
                className="Main-icon wow slideInRight"
                data-wow-duration="2s">
                <div className="Main-block--icon">
                  <BiChevronRight color={COLORS.red} size={30} />
                </div>
                <p>
                  Официальный дистрибьютор компаний - производителей: Mando,
                  Parts-Mall, Luzar и KRAFTTECH.
                </p>
              </div>
              <div
                className="Main-icon wow slideInRight"
                data-wow-duration="2s">
                <div className="Main-block--icon">
                  <BiChevronRight color={COLORS.red} size={30} />
                </div>
                <p>
                  Отличные условия для оптовых покупателей, индивидуальный
                  подход к каждому оптовику (мелкий и крупный опт).
                </p>
              </div>
              <div>
                <p className="Main-text-text">
                  Ждём Вас в наших магазинах и сервисах!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section>
        <h4 className="Main-header-h4">
          АДРЕСА МАГАЗИНОВ И АВТОСЕРВИСОВ САНКТ-ПЕТЕРБУРГА
        </h4>
      </section>
      <section>
        <div></div>
      </section>

      <Map className="Main-map" />
      <Footer />
    </div>
  );
};

export default Main;
