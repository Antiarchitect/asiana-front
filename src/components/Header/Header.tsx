import { FC, useCallback, useState } from 'react';
import './Header.scss';
import logo from '../../assets/logotype.png';
import orangeLogo from '../../assets/orange-logo.png';
import { COLORS } from '../../constants';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Menu, Collapse } from 'antd';
import Button from '../Button/Button';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import SubHeader from '../SubHeader/SubHeader';

const { Panel } = Collapse;

export type Navs = Array<{
  id: number;
  link: string;
  label: string;
}>;

interface IExternalProps {}

interface IProps extends IExternalProps {}

interface Nav {
  navs: Array<{
    id: number;
    label: string;
    link?: string;
    subMenuProps?: {
      navs: Navs;
    };
  }>;
}

const NAVS: Nav['navs'] = [
  {
    id: 1,
    label: 'о компании',
    subMenuProps: {
      navs: [
        {
          id: 1,
          link: '/about-company',
          label: 'о компании',
        },
        {
          id: 2,
          link: '/vacancies',
          label: 'вакансии',
        },
        {
          id: 3,
          label: 'новости',
          link: '/news',
        },
        {
          id: 4,
          label: 'акции',
          link: '/actions',
        },
        {
          id: 5,
          label: 'страницы сайта',
          link: '/sitepages',
        },
      ],
    },
  },
  {
    id: 2,
    label: 'запчасти',
    subMenuProps: {
      navs: [
        {
          id: 1,
          link: '/corea',
          label: 'корея',
        },
        {
          id: 2,
          link: '/chinese',
          label: 'китай',
        },
        {
          id: 3,
          link: '/japan',
          label: 'япония',
        },
      ],
    },
  },
  {
    id: 3,
    label: 'авто с пробегом',
    link: '/car-service',
  },
  {
    id: 4,
    label: 'оптовикам',
    link: '/delivery',
  },

  {
    id: 6,
    label: 'контакты',
    link: '/contacts',
  },
];

const Header: FC<IProps> = () => {
  const [isOpenDrawer, setOpenDrawer] = useState(false);

  const styleHeader = {
    background: COLORS.orangeGradient,
  };

  const renderMenu = useCallback((menu: Navs) => {
    return (
      <Menu className="Header-dropdown-menu">
        {menu.map((item: any) => (
          <Menu.Item className="Header-dropdown-menu--item" key={item.id}>
            <Link className="Header-dropdown-menu--link" to={item.link}>
              {item.label}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    );
  }, []);

  const renderBurgerMenu = useCallback((menu: Nav['navs']) => {
    return menu.map((nav) => {
      if (nav.link) {
        return (
          <div className="Header-burger-menu--item" key={nav.id}>
            <Link className="Header-burger-menu--link" to={nav.link}>
              {nav.label}
            </Link>
          </div>
        );
      }

      if (nav.subMenuProps) {
        return (
          <div className="Header-burger-menu--item" key={nav.id}>
            <Collapse defaultActiveKey={[1]} ghost>
              <Panel
                className="Header-burger-menu--panel"
                header={nav.label}
                key={nav.id}>
                <div>
                  {nav.subMenuProps?.navs.map((item) => (
                    <Link
                      key={item.id}
                      className="Header-burger-menu--link Header-burger-menu--panel-link"
                      to={item.link}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </Panel>
            </Collapse>
          </div>
        );
      }

      return null;
    });
  }, []);

  const handleChangeStatus = useCallback((status: boolean) => {
    return (e: any) => {
      e.stopPropagation();
      setOpenDrawer(status);
    };
  }, []);

  return (
    <>
      <div
        onClick={handleChangeStatus(false)}
        className={`Header-burger--container ${
          !isOpenDrawer && 'Header-burger--container-close'
        }`}>
        <div className="Header-burger--menu">
          <div className="Header-burger--menu-header justify-content-between align-items-start">
            <Button
              onClick={handleChangeStatus(false)}
              className="close-button Header-burger-button"
              bgColor={COLORS.transparent}>
              <AiOutlineClose
                className="Header-burger-button"
                size={25}
                color={COLORS.white}
              />
            </Button>
            <div className="d-flex justify-content-center mb-5">
              <Link to="/">
                <img
                  className="logo-burger"
                  src={orangeLogo}
                  alt="Logo burger"
                />
              </Link>
            </div>
          </div>
          {renderBurgerMenu(NAVS)}
        </div>
      </div>
      <div className="Header-container--fixed">
        <SubHeader />
        <header style={styleHeader} className="header">
          <div className="header-container--size container page-container--full">
            <div className="d-flex">
              <Link to="/">
                <img className="logo" src={logo} alt="Logo" />
              </Link>
              <div className="Header-container">
                {NAVS.map((nav) => {
                  if (nav.link) {
                    return (
                      <div className="Header-nav--item" key={nav.id}>
                        <Link className="Header-nav--link" to={nav.link}>
                          {nav.label}
                        </Link>
                      </div>
                    );
                  }

                  if (nav.subMenuProps?.navs) {
                    return (
                      <div className="Header-nav--item" key={nav.id}>
                        <DropdownMenu
                          label={nav.label}
                          navs={renderMenu(nav.subMenuProps.navs)}
                        />
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            </div>
            <div className="Header-user--block">
              {/* <Button
              className="d-flex align-items-center sign-in--button"
              bgColor={COLORS.transparent}
              color={COLORS.red}>
              <span className="sign-in--label">Войти</span>
              <FaUser color={COLORS.black} size={20} />
            </Button> */}
            </div>
            <div className="Header-burger--button">
              <Button
                className="Header-burger-button"
                onClick={handleChangeStatus(true)}
                bgColor={COLORS.transparent}>
                <AiOutlineMenu
                  className="Header-burger-button"
                  color={COLORS.black}
                  size={25}
                />
              </Button>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
