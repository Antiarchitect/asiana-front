import { FC, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
import './AboutCompany.scss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import LeftMenu from '../../components/LeftMenu/LeftMenu';
import Button from '../../components/Button/Button';
import { COLORS } from '../../constants';
import image from '../../assets/leninskiy.png';
import imgicon from '../../assets/imgicon.png';
import van from '../../assets/van.jpg';
import service from '../../assets/service.jpg';
import auto_master from '../../assets/auto_master.jpg';
import reception from '../../assets/reception.jpg';
import internet_magazin from '../../assets/internet_magazin.png';
// @ts-ignore
import WOW from 'wowjs';

interface IExternalProps {}

interface IProps extends IExternalProps {}

const AboutCompany: FC<IProps> = () => {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <div className="page-with-header">
      <div className="AboutCompany-container">
        <div>
          <div className="AboutCompany-breadcrumbs-title">
            <div className="AboutCompany-block">
              <Breadcrumbs />
            </div>
            <h1 className="AboutCompany-title">О компании Кореана</h1>
          </div>
          <div className="AboutCompany-leftSidebar-button-title">
            <div className="AboutCompany-leftSidebar-button">
              <LeftMenu />
              <div className="AboutCompany-button-block">
                <Button className="AboutCompany-button wow fadeInUp">
                  ЖАЛОБЫ И ПРЕДЛОЖЕНИЯ
                </Button>
              </div>
            </div>

            <div className="AboutCompany-title-block">
              <h2 className="AboutCompany-title-h2">
                ЧТО ПРЕДСТАВЛЯЕТ СОБОЙ КОМПАНИЯ "КОРЕАНА"?
              </h2>
              <div className="mb-1">
                Компания «Кореана» поставляет автозапчасти и оказывает услуги в
                области ремонта и обслуживания автомобилей корейского
                производства: Hyundai, Kia, Daewoo, Ssang Yong и Chevrolet.
                <p className="AboutCompany-p"></p>
                История развития компании "Кореана", одной из ярких
                представителей автобизнеса, началась в 1999 году. С самого
                начала главной целью нашей компании было предложить нашим
                клиентам самый широкий спектр услуг и автомобильных запасных
                частей. Компания быстро росла, и сегодня занимает одну из
                ведущих позиций на этом рынке.
              </div>
              <h3 className="AboutCompany-title-h3">
                НА СЕГОДНЯШНИЙ ДЕНЬ КОМПАНИЯ «КОРЕАНА» - ЭТО:
              </h3>
              <p>
                •{' '}
                <a className="AboutCompany-link" href="/">
                  Разветвленная сеть розничных магазинов
                </a>{' '}
                в Санкт-Петербурге, Москве и других городах России. Общее
                количество магазинов на данный момент превысило число 70 и
                продолжает расти. Наши магазины объединены технологией продаж
                «Кореаны», стандартами обслуживания клиентов и единой
                информационной базой. Продуманные логистические схемы позволяют
                осуществлять поставку товара в кратчайшие сроки.
              </p>

              <div>
                <img
                  className="AboutCompany-leninskiy wow fadeInRight"
                  src={image}
                  alt=""
                />
              </div>

              <div className="AboutCompany-title-block-p wow fadeIn">
                <div className="mb-1">
                  <div>
                    {' '}
                    <p
                      style={{
                        color: COLORS.red,
                        marginBottom: 0,
                        fontWeight: 700,
                      }}>
                      {' '}
                      • Сеть станций постгарантийного технического обслуживания
                      корейских автомобилей в{' '}
                    </p>{' '}
                  </div>{' '}
                  <a className="AboutCompany-link" href="/">
                    Санкт-Петербурге
                  </a>{' '}
                  и{' '}
                  <a className="AboutCompany-link" href="/">
                    Москве
                  </a>
                  Наши техцентры готовы к ремонтам любой сложности. Кроме того,
                  что они оборудованы самыми современными диагностическими
                  стендами для бензиновых и дизельных моторов, подъемниками,
                  3D-стендами для регулировки развал-схождения, тут работают
                  настоящие профессионалы, специализирующиеся исключительно на
                  корейских машинах. Мы стараемся максимально повысить качество
                  обслуживания и стремимся к тому, чтобы автовладельцы получали
                  комплексное решение проблемы: от поиска запчасти до ее
                  установки. Так, все станции нашей сети имеют единый формат,
                  который включает в себя ремонтную зону, розничный магазин
                  запчастей и зону отдыха клиентов. <p></p>
                  Станции Кореана специализируются на послегарантийном
                  обслуживании автомобилей. Мы не конкурируем с дилерами. Мы
                  знаем, у клиента всегда есть выбор, где обслуживаться. И если
                  он выбрал нас, то это является высшей оценкой нашей работы.
                  Ежегодное расширение сети СТО Кореана убеждает нас в
                  правильности выбранного пути.{' '}
                  <p className="AboutCompany-p"></p>•{' '}
                  <a className="AboutCompany-link" href="/">
                    {' '}
                    Департамент оптовых продаж
                  </a>
                  . <p></p>
                  Отдел оптовых продаж осуществляет поставку автозапчастей не
                  только по Санкт – Петербургу, но и по всей России. Отдел
                  представляют высококвалифицированные сотрудники, которые
                  всегда готовы предоставить клиенту информацию о наличии товара
                  на складе и условиях поставки. <p></p>
                  Для всех оптовых клиентов разработана гибкая система скидок.
                  Отправка осуществляется различными видами транспорта и на
                  самых выгодных условиях. Клиентам, расположенным на территории
                  Российской Федерации, при единовременном заказе автозапчастей
                  более чем на 10 000 рублей оплачивается нами доставка груза до
                  нужного представительства транспортной компании, расположенной
                  в вашем городе.
                </div>
              </div>

              <div className="AboutCompany-block-icon">
                <img
                  className="AboutCompany-image wow zoomIn"
                  src={imgicon}
                  alt=""
                />
                <img
                  className="AboutCompany-image wow zoomIn"
                  src={van}
                  alt=""
                />
              </div>

              <div className="AboutCompany-block-icon-two">
                <img
                  className="AboutCompany-image wow zoomIn"
                  src={service}
                  alt=""
                />
                <img
                  className="AboutCompany-image wow zoomIn"
                  src={auto_master}
                  alt=""
                />
                <img
                  className="AboutCompany-image wow zoomIn"
                  src={reception}
                  alt=""
                />
              </div>

              <div className="wow fadeIn">
                <div className="mb-1">
                  •{' '}
                  <a className="AboutCompany-link" href="/">
                    Интернет-магазин автозапчастей
                  </a>{' '}
                  . <p></p>
                  Целью создания интернет-магазина «Кореана» стало максимально
                  упростить и ускорить процесс покупки необходимых запчастей, а
                  также возможность совершить данную покупку, находясь в любой
                  точке Российской Федерации. Поэтому структура и интерфейс
                  Интернет-магазина разработаны таким образом, чтобы совершив
                  всего несколько манипуляций компьютерной мышью, автовладелец
                  сможет найти и купить необходимую запчасть, выбрать удобную
                  форму оплаты и доставки, сэкономив при этом свое время, силы и
                  деньги. Организованны пункты выдачи товаров более чем в 100
                  городах России. <p></p>
                  Для наших клиентов, предпочитающих осуществлять покупку
                  запчастей в наших розничных магазинах, реализована возможность
                  в режиме реального времени посмотреть наличие и цену в
                  магазине по интересующему адресу и , позвонив по телефону
                  зарезервировать необходимую автозапчасть.
                </div>
              </div>

              <div>
                <img
                  className="AboutCompany-leninskiy wow fadeInLeft"
                  src={internet_magazin}
                  alt=""
                />
              </div>

              <div className="AboutCompany-title-block-p wow fadeIn">
                <div className="mb-1">
                  Основным принципом компании Кореана является сохранение
                  доброго имени за счет максимального удовлетворения
                  потребностей наших клиентов, выраженном в качестве
                  обслуживания, удобстве, максимальном наличии автозапчастей на
                  наших складах и ценовой политики компании. <p></p>
                  Любая компания, которая хочет стабильно и успешно развиваться,
                  должна думать о будущем, как в краткосрочной, так и в
                  долгосрочной перспективе. Конечно, трудно предвидеть, что
                  будет через 10-15 лет, в каких условиях будет существовать
                  российский бизнес, однако без стратегии развития, амбициозных
                  целей работать нельзя. Необходимо намечать ближние и дальние
                  цели и выстраивать соответствующую тактику и стратегию.
                  «Кореана» старается действовать именно так. Мы практически
                  завершили формирование сети розничных магазинов в Петербурге и
                  пригородах. Наша цель – возможность из любой точки города
                  доехать до магазина «Кореана» за 10-15 минут, даже с учетом
                  сложной транспортной ситуации в городе, достигнута. Теперь в
                  планах вывести на серьезный уровень сеть филиалов на
                  Северо-Западе. А также в Москве и Московской области.
                  Рассчитываем мы и существенно увеличить оптовые поставки в
                  дальние регионы. Опыт работы наших автомобильных сервисов
                  показал, что имеется очень большой потенциал развития, поэтому
                  планируем увеличить количество Станций технического
                  обслуживания. Есть, безусловно, и другие проекты, рассчитанные
                  на долгосрочную перспективу, но о них говорить пока
                  преждевременно. <p className="AboutCompany-p"></p>
                  Компания «Кореана» является официальным дистрибьютором на
                  территории России таких производителей автозапчастей <p></p>{' '}
                  как Mando, BESF1TS, Parts-Mall, Luzar и KRAFTTECH.{' '}
                  <p className="AboutCompany-p"></p>
                  Работая с нами, вы всегда можете быть уверены в грамотном и
                  вежливом обслуживании, быстроте и точности исполнения заказов.{' '}
                  <p></p>
                  Мы будем рады видеть Вас в качестве клиентов!
                  <p className="AboutCompany-p"></p>
                  <p className="AboutCompany-p"></p>
                  <a className="AboutCompany-link" href="/">
                    Товарный знак "Кореана"
                  </a>{' '}
                  официально зарегистрирован на территории РФ и принадлежит ООО
                  «Альянс ЛТД»: 197350, г. Санкт-Петербург, ул. Парашютная, дом
                  43 стр.3, пом.2-Н Офис 18, ИНН 7811543040, ОГРН 1137847057370.
                  Подробнее о розничных магазинах и станциях технического
                  обслуживания Вы можете узнать в разделе{' '}
                  <a className="AboutCompany-link" href="/">
                    {' '}
                    "Контакты"
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FloatingFooter />
    </div>
  );
};

export default AboutCompany;
