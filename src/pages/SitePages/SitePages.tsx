import { FC, useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import './SitePages.scss';

interface IExternalProps {}

interface IProps extends IExternalProps, RouteComponentProps {}

const SitePages: FC<IProps> = ({ match }) => {
  const [pages, setPages] = useState<any>(null);
  const [categories, setCategories] = useState([]);
  const [list, setList] = useState([]);

  const { id }: any = match.params;

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
    fetch(
      `https://test-rest-api.site/api/1/mobile/static/${id}/get_page/?token=b4831f21df6202f5bacade4b7bbc3e5c`,
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
  }, [id]);

  useEffect(() => {
    fetch(
      `https://test-rest-api.site/api/1/mobile/static/get_pages/?token=b4831f21df6202f5bacade4b7bbc3e5c`,
    )
      .then((response) => {
        console.log('response');
        return response.json();
      })
      .then((data) => setList(data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page-with-header site-page">
      <div className="container pt-4 site-page">
        {id ? (
          pages?.page ? (
            <div dangerouslySetInnerHTML={{ __html: pages?.page.content }} />
          ) : (
            <h3>Страница не найдена</h3>
          )
        ) : (
          categories.map((item: any, key: number) => (
            <p key={key}>
              <Link to={`/site-pages/${item.id}`}>{item.name}</Link>
            </p>
          ))
        )}
        <Link to={`/site-pages/4`}>Тестовая страница</Link>
      </div>
    </div>
  );
};

export default SitePages;
