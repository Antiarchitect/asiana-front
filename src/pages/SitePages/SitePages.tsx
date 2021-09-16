import { FC, useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import './SitePages.scss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Footer from '../../components/Footer/Footer';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
import Button from '../../components/Button/Button';
import { Spin } from 'antd';

interface IExternalProps {}

interface IProps extends IExternalProps, RouteComponentProps {}

const Tab: FC<any> = ({ name, id }) => {
  return (
    <>
      <div className="SitePages-div">
        <p>
          <Link
            to={`/sitepages/subcategories/${id}`}
            className="SitePages-title">
            {name}
          </Link>
        </p>
      </div>
    </>
  );
};

const SitePages: FC<IProps> = ({ match, history }) => {
  const [pages, setPages] = useState<any>(null);
  const [categories, setCategories] = useState<any>([]);
  const { name, id }: any = match.params;

  useEffect(() => {
    fetch(
      `https://test-rest-api.site/api/1/mobile/static/get_categories/?token=b4831f21df6202f5bacade4b7bbc3e5c`,
    )
      .then((response) => {
        console.log('response');
        return response.json();
      })
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  const [subTitels, setSubTitles] = useState<any[]>([]);
  const [loadTites, setLoadTitels] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    setLoadTitels(true);

    fetch(
      `https://test-rest-api.site/api/1/mobile/static/${id}/get_subcategory?token=b4831f21df6202f5bacade4b7bbc3e5c`,
    )
      .then((response) => response.json())
      .then(({ data }: any) => {
        if (data) {
          if (Array.isArray(data)) {
            setSubTitles(data);
          } else {
            setSubTitles(Object.values(data));
          }
        } else {
          setSubTitles([]);
        }

        setLoadTitels(false);
      });
  }, [id]);

  useEffect(() => {
    if (!name) {
      return;
    }

    const find = subTitels.find(
      (c: any) => c.name === name.replace(/\-/g, ' '), // eslint-disable-line
    );

    if (!find) {
      return;
    }

    const { id } = find;

    fetch(
      `https://test-rest-api.site/api/1/mobile/static/${id}/get_category_pages?token=b4831f21df6202f5bacade4b7bbc3e5c`,
    )
      .then((response) => {
        console.log('response');
        return response.json();
      })
      .then((data) => {
        setPages(data.data);
        document.title = data.data.page.title;
      })
      .catch((err) => console.log(err));
  }, [name, categories, subTitels]);

  return (
    <div className="page-with-header site-page">
      <div className="container pt-4 site-page">
        <Breadcrumbs />
        <h1 className="mt-5">Страницы сайта</h1>
        {name || id ? (
          <Button
            onClick={() => history.goBack()}
            className=" SitePages-mb SitePages-div-button SitePages-title"
            customStyles={{ fontWeight: '40', fontSize: 35 }}>
            &larr;
          </Button>
        ) : null}

        {id ? (
          <Spin spinning={loadTites}>
            {subTitels.length && id ? (
              subTitels.map((item) => (
                <div key={item.id} className="SitePages-div">
                  <p>
                    <Link
                      className="SitePages-title"
                      to={`/sitepages/${item.name.replace(/\s/g, '-')}`}>
                      {item.name}
                    </Link>
                  </p>
                </div>
              ))
            ) : (
              <h3>Не найдены сабкатегории</h3>
            )}
          </Spin>
        ) : (
          <>
            {name ? (
              pages?.page ? (
                <div
                  dangerouslySetInnerHTML={{ __html: pages?.page.content }}
                />
              ) : (
                <h3>Страница не найдена</h3>
              )
            ) : (
              categories.map((item: any, key: number) => (
                <Tab key={key} {...item} />
              ))
            )}
          </>
        )}

        <Footer />
        <FloatingFooter />
      </div>
    </div>
  );
};

export default SitePages;
