import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dropdown, Menu, Spin, Tabs } from 'antd';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Footer from '../../components/Footer/Footer';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
import './Contacts.scss';
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import { AiFillCar, AiFillSetting } from 'react-icons/ai';
import { FcSupport } from 'react-icons/fc';
import { GiShoppingCart } from 'react-icons/gi';
import { RiBuilding4Line } from 'react-icons/ri';
import ContactCard from '../../components/ContactCard/ContactCard';
import Button from '../../components/Button/Button';
import { COLORS } from '../../constants';
import { setCity } from '../../actions';

import { setCookie } from '../../services/cookie';
// @ts-ignore
import WOW from 'wowjs';
import { Placemark, YMaps, Map } from 'react-yandex-maps';
import ContactsModal from '../../components/ContactsModal/ContactsModal';
import shopIcon from '../../assets/autoshop.png';
import stoIcon from '../../assets/autoservice.png';
import dealerIcon from '../../assets/autoshow.png';
import { setTimeout } from 'timers';
import ServiceRegistrationForm from '../../components/ServiceRegistrationForm/ServiceRegistrationForm';
import { connect } from 'react-redux';

const { TabPane } = Tabs;

interface IExternalProps {
  contact: any;
}

interface IProps extends IExternalProps {
  setCity: any;
  city: any;
  loading: boolean;
}

const tabs = [
  {
    id: 1,
    label: 'Магазины',
    icon: <GiShoppingCart className="mr-2 Contacts-GiShoppingCart" />,
  },
  {
    id: 2,
    label: 'Автосервисы',
    icon: <FcSupport className="mr-2 Contacts-FcSupport" />,
  },
  {
    id: 3,
    label: 'Автосалоны',
    icon: <AiFillCar className="mr-2 Contacts-AiFillCar" />,
  },
  {
    id: 4,
    label: 'Отделы компании',
    icon: <RiBuilding4Line className="mr-2 Contacts-RiBuilding4Line" />,
  },
  {
    id: 5,
    label: 'Показать все',
  },
];

const Contacts: FC<IProps> = ({
  city: activeCity,
  setCity,
  loading: loadStore,
}) => {
  const [contacts, setContacts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [contactsTab, setContactsTab] = useState<any>([]);
  const [loadingTabs, setLoadingTabs] = useState(false);
  const [activeContact, setContact] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<any>('1');
  const [cities, setCities] = useState<any[]>([]);
  const [isOpenModal, setOpenModal] = useState(false);
  const refBalloons: any = useRef<any>({});

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
  // const tabsObj: any = {
  //   '1': 'shop',
  //   '2': 'sto',
  //   '3': 'dealer',
  //   '4': 'shop',
  // };

  const tabsObj = useMemo(
    () => ({
      '1': 'shop',
      '2': 'sto',
      '3': 'dealer',
      '4': 'shop',
    }),
    [],
  );

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
    console.log(loadStore, activeCity, 'activeCity');
    if (loadStore) {
      return;
    }
    setLoading(true);

    fetch(
      `https://test-rest-api.site/api/1/mobile/location/list/?token=b4831f21df6202f5bacade4b7bbc3e5c${
        activeCity ? `&city_id=${activeCity.id}` : ''
      }`,
    )
      .then((response) => response.json())
      .then((data) => setContacts(data.data))
      .finally(() => setLoading(false));
  }, [activeCity, loadStore]);

  useEffect(() => {
    if (loadStore) {
      return;
    }
    setLoadingTabs(true);
    fetch(
      `https://test-rest-api.site/api/1/mobile/location/list/?token=b4831f21df6202f5bacade4b7bbc3e5c${
        // @ts-ignore
        tabsObj[activeTab] ? `&location_type=${tabsObj[activeTab]}` : ''
      }${activeCity ? `&city_id=${activeCity.id}` : ''}`,
    )
      .then((response) => response.json())
      .then((data) => setContactsTab(Array.isArray(data.data) ? data.data : []))
      .finally(() => setLoadingTabs(false));
  }, [activeTab, activeCity, tabsObj, loadStore]);

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

  const handleSelectContact = useCallback((contact: any, current: any) => {
    setContact(contact);

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (activeContact && refBalloons.current[activeContact.Location.id]) {
      refBalloons.current[activeContact.Location.id]?.ref.balloon?.open
        ? refBalloons.current[activeContact.Location.id].ref.balloon?.open()
        : void 0;
    }
  }, [activeContact]);

  useEffect(() => {
    if (activeContact) {
      setTimeout(() => {
        const id = activeContact.Location.id;
        const button = document.getElementById(id);
        const buttonClose = document.querySelector(
          '.ymaps-2-1-78-balloon__close-button',
        );

        if (button) {
          button.removeEventListener('click', () => {});
          button.addEventListener('click', (e: any) => {
            setOpenModal(true);
          });
        }

        if (buttonClose) {
          buttonClose.removeEventListener('click', () => {});
          buttonClose.addEventListener('click', () => {
            setContact(null);
          });
        }
      }, 500);
    }
  }, [activeContact, isOpenModal]);

  const ref = useCallback(
    (Location: any, activeContact: any) => (ref: any) => {
      if (!ref?.balloon || !ref?.events) {
        return;
      }

      refBalloons.current = {
        ...refBalloons.current,
        [Location.id]: {
          ref: ref,
          click: ref.events?.types?.click[0],
          open: ref.balloon?.open,
        },
      };
    },
    [],
  );

  // useEffect(() => {
  //   if (
  //     activeContact &&
  //     refBalloons.current[activeContact.Location.id]
  //   ) {
  //     refBalloons.current[activeContact.Location.id]?.ref.events?.types
  //       ?.click[0]
  //       ? refBalloons.current[
  //           activeContact.Location.id
  //         ].ref.events?.types?.click[0](selectedAddress)
  //       : void 0;
  //       refBalloons.current[activeContact.Location.id]?.ref.balloon?.open
  //       ? refBalloons.current[activeContact.Location.id].ref.balloon?.open()
  //       : void 0;
  //   }
  // }, [activeContact, selectedAddress]);

  return (
    <div className="page-with-header">
      <div className="container">
        <div className="Contacts-map-container">
          <div>
            <div className="Contacts-block">
              <Breadcrumbs />
            </div>
            <h1 className="Contacts-h1">
              Магазины автозапчастей в городе {activeCity?.name}
            </h1>
            <section className="section-leftSideBar-map">
              <LeftSideBar
                defaultSelected={{
                  ...activeCity,
                  label: { type: 'title', value: activeCity?.name },
                }}
                onSelect={(item) => {
                  setCity({ ...item, name: item.label.value });
                  setCookie(
                    'region',
                    JSON.stringify({ ...item, name: item.label.value }),
                  );
                }}
              />
              <div>
                <Spin spinning={loading || loadStore}>
                  <YMaps ref={map}>
                    <Map
                      key={JSON.stringify(contacts)}
                      defaultState={{
                        center: activeContact
                          ? [
                              Number(activeContact?.Location.lat),
                              Number(activeContact?.Location.lon),
                            ]
                          : contacts?.length
                          ? [
                              Number(contacts[0].Location.lat),
                              Number(contacts[0].Location.lon),
                            ]
                          : [55.751574, 37.573856],
                        zoom: contacts?.length >= 2 ? 8 : 8 + contacts?.length,
                      }}
                      center={
                        activeContact
                          ? [
                              Number(activeContact?.Location.lat),
                              Number(activeContact?.Location.lon),
                            ]
                          : contacts?.length
                          ? [
                              Number(contacts[0].Location.lat),
                              Number(contacts[0].Location.lon),
                            ]
                          : [55.751574, 37.573856]
                      }
                      className="Contacts-map">
                      {contacts
                        ?.filter(
                          (item: any) =>
                            String(activeTab) === '5' ||
                            // @ts-ignore
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
                              onClick={() => {
                                setContact(null);

                                setTimeout(() => setContact(item), 100);
                                // open(item)
                                // if (selectedAddress) {
                                //   open(item)
                                // }
                              }}
                              onClose={() => {
                                setContact(null);
                              }}
                              properties={{
                                // @ts-ignore
                                balloonContent: ContactsModal({
                                  contact: { ...item, city },
                                  onClose: () => {
                                    setContact(null);
                                  },
                                }),
                              }}
                              instanceRef={ref(Location, activeContact)}
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
                      <Tabs
                        onChange={(tab: any) => {
                          setActiveTab(tab);
                          setContact(null);
                        }}
                        activeKey={activeTab}>
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
                                    onClick={(...r) =>
                                      handleSelectContact(
                                        ...r,
                                        refBalloons?.current,
                                      )
                                    }
                                    work_time={item.work_time}
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
      <ServiceRegistrationForm
        contact={activeContact}
        visible={isOpenModal}
        onClose={() => setOpenModal(false)}
      />
      <Footer />
      <FloatingFooter />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  city: state.city,
  loading: state.loading,
});

export default connect(mapStateToProps, { setCity })(Contacts);
