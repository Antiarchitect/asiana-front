import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dropdown, Menu, Spin, Tabs } from 'antd';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Footer from '../../components/Footer/Footer';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
import './Contacts.scss';
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import {
  AiFillCar,
  AiFillSetting,
  AiFillShop,
  AiTwotoneBank,
  AiTwotoneSetting,
} from 'react-icons/ai';
import ContactCard from '../../components/ContactCard/ContactCard';
import Button from '../../components/Button/Button';
import { COLORS } from '../../constants';
// @ts-ignore
import WOW from 'wowjs';
import { Placemark, YMaps, Map } from 'react-yandex-maps';
import ContactsModal from '../../components/ContactsModal/ContactsModal';
import shopIcon from '../../assets/autoshop.png';
import stoIcon from '../../assets/autoservice.png';
import dealerIcon from '../../assets/autoshow.png';
import { setTimeout } from 'timers';

const { TabPane } = Tabs;

interface IExternalProps {}

interface IProps extends IExternalProps {}

const tabs = [
  {
    id: 1,
    label: 'Магазины',
    icon: <AiFillShop className="mr-2 " />,
  },
  {
    id: 2,
    label: 'Автосервисы',
    icon: <AiTwotoneSetting className="mr-2" />,
  },
  {
    id: 3,
    label: 'Автосалоны',
    icon: <AiFillCar className="mr-2" />,
  },
  {
    id: 4,
    label: 'Отделы компании',
    icon: <AiTwotoneBank className="mr-2" />,
  },
  {
    id: 5,
    label: 'Показать все',
  },
];

const Contacts: FC<IProps> = () => {
  const [contacts, setContacts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [contactsTab, setContactsTab] = useState<any>([]);
  const [loadingTabs, setLoadingTabs] = useState(false);
  const [activeContact, setContact] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<any>('1');
  const [activeCity, setCity] = useState<any>(null);
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    fetch(
      'https://test-rest-api.site/api/1/site/location/cities/?token=b4831f21df6202f5bacade4b7bbc3e5c',
    )
      .then((response) => response.json())
      .then((data) =>
        setCities(
          data.data.map(({ City: item }: any) => ({
            id: item.id,
            label: item.name,
            ...item,
          })),
        ),
      );
  }, []);

  const map = useRef(null);
  const tabsObj: any = {
    '1': 'shop',
    '2': 'sto',
    '3': 'dealer',
    '4': 'shop',
  };

  // const coordinates = useMemo(() => {
  //   return contacts.map(({ Location }: any) => ([
  //     Number(Location.lat), Number(Location.lon)
  //   ]))
  // }, [contacts])

  // const clearContact = () => {
  //   setContact(null);
  // }

  // useEffect(() => {
  //   const closeButton = document.querySelector('.contacts-modal--close');
  //   if (!closeButton) {
  //     return;
  //   }
  //   if (activeContact) {
  //     closeButton.addEventListener('click', clearContact);
  //   } else {
  //     closeButton.removeEventListener('click', clearContact);
  //   }
  // }, [activeContact]);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://test-rest-api.site/api/1/mobile/location/list/?token=b4831f21df6202f5bacade4b7bbc3e5c${
        activeCity ? `&city_id=${activeCity.id}` : ''
      }`,
    )
      .then((response) => response.json())
      .then((data) => setContacts(data.data))
      .finally(() => setLoading(false));
  }, [activeCity]);

  useEffect(() => {
    setLoadingTabs(true);
    fetch(
      `https://test-rest-api.site/api/1/mobile/location/list/?token=b4831f21df6202f5bacade4b7bbc3e5c${
        tabsObj[activeTab] ? `&location_type=${tabsObj[activeTab]}` : ''
      }${activeCity ? `&city_id=${activeCity.id}` : ''}`,
    )
      .then((response) => response.json())
      .then((data) => setContactsTab(Array.isArray(data.data) ? data.data : []))
      .finally(() => setLoadingTabs(false));
  }, [activeTab, activeCity, tabsObj]);

  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  const handleClickMenu = useCallback(
    (item) => {
      setActiveTab(item.key);
    },
    [setActiveTab],
  );

  const activeTabMenu = useMemo(() => {
    const activeTabMenu = tabs.find((tab: any) => tab.id === Number(activeTab));
    return activeTabMenu;
  }, [activeTab]);

  const menu = (
    <Menu activeKey={activeTab}>
      {tabs.map((item: any) => (
        <Menu.Item onClick={handleClickMenu} key={item.id}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  const icons = {
    shop: {
      icon: shopIcon,
      style: [60, 42],
    },
    sto: {
      icon: stoIcon,
      style: [48, 55],
    },
    dealer: {
      icon: dealerIcon,
      style: [50, 50],
    },
  };

  const handleSelectContact = (item: any) => {
    setContact(item);
  };

  const ref = (Location: any) => (ref: any) => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      if (
        activeContact?.Location.lat === Location.lat &&
        activeContact?.Location.lon === Location.lon &&
        ref?.events?.types?.click?.length
      ) {
        ref.events?.types?.click[0]();
        ref.balloon?.open();
        // setLoading(false);
      }
    }, 10);
  };

  return (
    <div className="page-with-header">
      <div className="container">
        <div className="Contacts-map-container">
          <div>
            <div className="Contacts-block">
              <Breadcrumbs />
            </div>
            <h1 className="Contacts-h1">
              Магазины автозапчастей в городе Санкт-Петербург
            </h1>
            <section className="section-leftSideBar-map">
              <LeftSideBar onSelect={setCity} />
              <div>
                <Spin spinning={loading}>
                  <YMaps ref={map}>
                    {console.log(activeContact)}
                    <Map
                      defaultState={{
                        center: activeContact
                          ? [
                              Number(activeContact?.Location.lat),
                              Number(activeContact?.Location.lon),
                            ]
                          : [55.751574, 37.573856],
                        zoom: 5,
                      }}
                      center={
                        activeContact
                          ? [
                              Number(activeContact?.Location.lat),
                              Number(activeContact?.Location.lon),
                            ]
                          : [55.751574, 37.573856]
                      }
                      className="Contacts-map">
                      {contacts
                        ?.filter(
                          (item: any) =>
                            String(activeTab) === '5' ||
                            item.Location_Type.type === tabsObj[activeTab],
                        )
                        .map((item: any, index: number) => {
                          const { Location, Location_Type } = item;
                          // @ts-ignore
                          const icon = icons[Location_Type.type];
                          const city = cities.find(
                            (c) => c.id === Location.city_id,
                          );
                          return (
                            <Placemark
                              key={index}
                              onClick={() => setContact(item)}
                              properties={{
                                // @ts-ignore
                                balloonContent: ContactsModal({
                                  contact: { ...item, city },
                                  onClose: () => setContact(null),
                                }),
                              }}
                              instanceRef={ref(Location)}
                              modules={['geoObject.addon.balloon']}
                              options={{
                                hasBalloon: Boolean(activeContact),
                                openEmptyBalloon: true,
                                iconLayout: 'default#image',
                                balloonPanelMaxMapArea: 1,
                                // Custom image for the placemark icon.
                                iconImageHref: icon?.icon || icons.shop.icon,
                                // The size of the placemark.
                                iconImageSize: icon?.style || [60, 42],
                                // The offset of the upper left corner of the icon relative
                                // to its "tail" (the anchor point).
                                iconImageOffset: [-3, -42],
                              }}
                              geometry={[
                                Number(Location.lat),
                                Number(Location.lon),
                              ]}
                            />
                          );
                        })}
                    </Map>
                  </YMaps>
                </Spin>
                <div className="Contacts-item-div">
                  <div>
                    <div className="Contacts-item-block">
                      <Dropdown
                        className="Contacts-dropdown--settings"
                        overlay={menu}
                        trigger={['click']}>
                        <Button
                          className="d-flex align-items-center"
                          color={COLORS.orange}
                          bgColor={COLORS.transparent}>
                          {activeTabMenu?.label}{' '}
                          <AiFillSetting className="ml-1" />
                        </Button>
                      </Dropdown>
                      <Tabs onChange={setActiveTab} activeKey={activeTab}>
                        {tabs.map((item: any) => (
                          <TabPane
                            tab={
                              <span className="d-flex align-items-center">
                                {item.icon}
                                {item.label}
                              </span>
                            }
                            key={item.id}>
                            <Spin spinning={loadingTabs}>
                              <div
                                style={{
                                  minHeight: 50,
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                }}>
                                {contactsTab.map((item: any) => (
                                  <ContactCard
                                    key={item.Location.id}
                                    title={item.Location.address}
                                    phone={item.Location.phones}
                                    date="пн-вс: 09:00-21:00"
                                    item={item}
                                    onClick={handleSelectContact}
                                  />
                                ))}
                              </div>
                            </Spin>
                          </TabPane>
                        ))}
                      </Tabs>
                      <h2 className="Contacts-h2 mt-5">
                        КОМПАНИЯ "КОРЕАНА" В САНКТ-ПЕТЕРБУРГЕ
                      </h2>
                      <p className="Contacts-item">
                        Практически одновременно с тем, как на российскую
                        автомобильную арену вышли машины корейского
                        производства, такие как: Hyundai, KIA, Chevrolet,
                        Daewoo, Ssang Yong – начала свою работу и компания
                        «Кореана». Заметив интерес российских автовладельцев к
                        недорогим функциональным маркам из Кореи, мы поняли, что
                        наш сервис поставки запчастей для корейских машин –
                        будет востребован, и не ошиблись! За долгие годы работы
                        и совершенствования мы добились того, что:{' '}
                        <span className="Contacts-item--content">
                          • Можем предложить своим покупателям выгодные
                          демократичные цены на приобретение запчастей, как
                          выпущенных заводом-изготовителем бренда, так и
                          аналогичных, но не менее качественных;
                        </span>
                        <span className="Contacts-item--content">
                          • Филиалы нашего концерна функционируют по всей
                          России, несмотря на то, что изначально компания была
                          основана в Санкт-Петербурге;{' '}
                        </span>
                        <span className="Contacts-item--content">
                          • Крупные оптовые заказы запчастей мы всегда реализуем
                          с хорошими скидками, что позволяет развивать Вам свой
                          собственный бизнес еще более эффективно; • Помимо
                          продажи запчастей для{' '}
                        </span>
                        <a className="Contacts-a" href="/">
                          Hyundai
                        </a>{' '}
                        ,{' '}
                        <a className="Contacts-a" href="/">
                          Chevrolet
                        </a>{' '}
                        ,{' '}
                        <a className="Contacts-a" href="/">
                          Daewoo
                        </a>{' '}
                        ,{' '}
                        <a className="Contacts-a" href="/">
                          KIA
                        </a>{' '}
                        ,{' '}
                        <a className="Contacts-a" href="/">
                          Ssang Yong
                        </a>{' '}
                        , мы предлагаем также сервисное обслуживание автомобилей
                        этих марок, и обеспечиваем высококлассный ремонт
                        автомобиля в любом сервисном центре «Кореана».
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
      <FloatingFooter />
    </div>
  );
};

export default Contacts;
