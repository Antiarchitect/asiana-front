import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import './LeftMenu.scss';

interface IExternalProps {}

interface IProps extends IExternalProps {}

const LeftMenu: FC<IProps> = () => {
  return (
    <div>
      <Menu>
        <div className="LeftMenu-div">
          <p className="LeftMenu-title-P">О компании</p>
        </div>
        <div className="LeftMenu-div">
          <Link to="/vacancies">
            {' '}
            <p className="LeftMenu-title">Вакансии</p>{' '}
          </Link>
        </div>
        <div className="LeftMenu-div">
          <Link to="/actions">
            <p className="LeftMenu-title">Акции</p>
          </Link>
        </div>
        <div className="LeftMenu-div">
          <Link to="/news">
            <p className="LeftMenu-title">Новости</p>
          </Link>
        </div>
        <div className="LeftMenu-div">
          <Link to="/">
            <p className="LeftMenu-title">Производители запчастей</p>
          </Link>
        </div>
      </Menu>
    </div>
  );
};

export default LeftMenu;
