import { FC, useEffect, useState } from 'react';
import { Menu } from 'antd';
import './LeftSideBar.scss';
import { Link } from 'react-router-dom';
import SubMenu from 'antd/lib/menu/SubMenu';

interface IMenuItem {
  id: number;
  label: {
    type?: 'title' | 'label'; // по нему будет определяться отмечать лейбл или нет
    value: string;
    link: string; // ссылку куда ввести
  };
  submenu?: Array<IMenuItem>;
}

interface IExternalProps {
  menu?: Array<IMenuItem>;
}

interface IProps extends IExternalProps {
  onSelect?: (item: any) => void;
}

const LeftSideBar: FC<IProps> = ({ onSelect }) => {
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
            label: {
              type: 'title',
              value: item.name,
            },
          })),
        ),
      );
  }, []);

  const renderSubmenu = (item: IMenuItem) => {
    return item.submenu?.map(renderMenu);
  };

  const renderMenu = (item: any, key: number) => {
    const className =
      item.label.type === 'title'
        ? 'LeftSideBar-title LeftSideBar-item'
        : 'LeftSideBar-item';

    if (!item.submenu) {
      return (
        <Menu.Item onClick={() => (onSelect ? onSelect(item) : null)} key={key}>
          <span className={className}>{item.label.value}</span>
        </Menu.Item>
      );
    }

    return (
      <SubMenu className={className} key={key} title={item.label.value}>
        {renderSubmenu(item)}
      </SubMenu>
    );
  };

  return (
    <Menu className="LeftSideBar" mode="inline">
      {cities.map(renderMenu)}
    </Menu>
  );
};

export default LeftSideBar;
