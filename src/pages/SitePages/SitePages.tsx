import { FC, useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import './SitePages.scss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Footer from '../../components/Footer/Footer';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
import Button from '../../components/Button/Button';

interface IExternalProps {}

interface IProps extends IExternalProps, RouteComponentProps {}

const SitePages: FC<IProps> = ({ match }) => {
  const [pages, setPages] = useState<any>(null);
  const [allPages, setAllPages] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const { name }: any = match.params;

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

  useEffect(() => {
    if (!name || !allPages?.length) {
      return;
    }

    const find = allPages.find((c: any) => c.page.title === name);

    if (!find) {
      return;
    }

    const { page } = find;

    fetch(
      `https://test-rest-api.site/api/1/mobile/static/${page.id}/get_page/?token=b4831f21df6202f5bacade4b7bbc3e5c`,
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
  }, [name, categories, allPages]);

  useEffect(() => {
    fetch(
      `https://test-rest-api.site/api/1/mobile/static/get_pages/?token=b4831f21df6202f5bacade4b7bbc3e5c`,
    )
      .then((response) => {
        console.log('response');
        return response.json();
      })
      .then((data) => setAllPages(data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page-with-header site-page">
      <div className="container pt-4 site-page">
        <Breadcrumbs />
        <h1 className="mt-5">Страницы сайта</h1>
        {name ? (
          <Link to="/sitepages">
            <Button
              className=" SitePages-mb SitePages-div-button SitePages-title"
              customStyles={{ fontWeight: '40', fontSize: 35 }}>
              &larr;
            </Button>
          </Link>
        ) : null}

        {name ? (
          pages?.page ? (
            <div dangerouslySetInnerHTML={{ __html: pages?.page.content }} />
          ) : (
            <h3>Страница не найдена</h3>
          )
        ) : (
          categories.map((item: any, key: number) => (
            <div className="SitePages-div">
              <p key={key}>
                <Link
                  className="SitePages-title"
                  to={`/sitepages/${item.name}`}>
                  {item.name}
                </Link>
              </p>
            </div>
          ))
        )}

        <b className="mt-3 d-block">Pages: </b>
        {allPages.map(({ page }: any) => (
          <div className="SitePages-div">
            <p key={page.id}>
              <Link className="SitePages-title" to={`/sitepages/${page.title}`}>
                {page.title}
              </Link>
            </p>
          </div>
        ))}

        <Footer />
        <FloatingFooter />
      </div>
    </div>
  );
};

export default SitePages;
