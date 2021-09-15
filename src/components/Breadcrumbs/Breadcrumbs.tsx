import { Breadcrumb } from 'antd';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import './Breadcrumbs.scss';

const BreadcrumbsComponent = () => {
  const match = useRouteMatch();
  const routes = match.url.split('/').filter(Boolean);

  if (!routes.length) {
    return null;
  }

  const navs = routes.map((item) => {
    let itemLabel = item;

    if (itemLabel.includes('-')) {
      itemLabel = itemLabel.replace(/\-/g, ' '); // eslint-disable-line
    }

    return itemLabel
      .split('')
      .map((c, i) => (i === 0 ? c.toUpperCase() : c))
      .join('');
  });

  console.log(navs);
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/">Главная</Link>
      </Breadcrumb.Item>
      {navs.map((route, index) => {
        if (index + 1 === navs.length) {
          return <Breadcrumb.Item key={index}>{route}</Breadcrumb.Item>;
        }

        return (
          <Breadcrumb.Item key={index}>
            <Link to={`/${route.replace(/\s/g, '-').toLowerCase()}`}>
              {route}
            </Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbsComponent;
