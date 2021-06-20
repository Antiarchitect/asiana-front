import { Empty, Spin } from 'antd';
import { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { InitialStateType } from '../../redusers';
import { CityType } from '../SubHeader/SubHeader';
import './MainNews.scss';

interface IExternalProps {}

interface IProps extends IExternalProps {
  city: CityType | null;
}

// interface NewsType {
//   id: number;
//   title: string;
//   date: string;
//   content: string;
// }

// const NewsItem: FC<NewsType> = (news) => {
//   const [isLoaded, setLoaded] = useState(false);

//   useEffect(() => {
//     setTimeout(() => {
//       setLoaded(true);
//     }, news.id * 500);
//   }, [news.id]);

//   const styles: any = {
//     fadeInDown: {
//       animation: 'x 1s',
//       animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
//     }
//   }

//   if (!isLoaded) {
//     return null;
//   }

//   return (
//     <Radium.StyleRoot>
//       <div style={styles.fadeInDown} className="MainNews-block">
//         <a className="MainNews-link" href="/">
//           {news.title}
//         </a>
//         <p className="MainNews-data">{news.date}</p>
//         <p className="MainNews-item">
//           {news.content}
//         </p>
//       </div>
//     </Radium.StyleRoot>
//   )
// }

const MainNews: FC<IProps> = ({ city }) => {
  const [news, setNews] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      'https://test-rest-api.site/api/1/site/new/list/?token=b4831f21df6202f5bacade4b7bbc3e5c',
    )
      .then((response) => response.json())
      .then((data) => {
        setNews(
          data.data.filter((item: any) =>
            city
              ? item.News.cities?.length
                ? item.News.cities.includes(city?.id)
                : true
              : true,
          ),
        );
        setLoading(false);
      });
  }, [city]);

  return (
    <Spin spinning={loading}>
      <div>
        <h1 className="MainNews-heading">НОВОСТИ КОМПАНИИ</h1>
        <div className="MainNews-container">
          {news.length ? (
            news.map(({ News: news }: any) => {
              return (
                <div
                  key={news.id}
                  className="MainNews-block wow slideInLeft"
                  data-wow-duration="2s">
                  <Link className="MainNews-link" to={`/news/${news.id}`}>
                    {news.title}
                  </Link>
                  <div dangerouslySetInnerHTML={{ __html: news.preview }}></div>
                </div>
              );
            })
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </Spin>
  );
};

const mapStateToProps = (state: InitialStateType) => ({
  city: state.city,
});

export default connect(mapStateToProps)(MainNews);
