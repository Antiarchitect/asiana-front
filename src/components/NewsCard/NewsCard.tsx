import { FC, useEffect, useState } from 'react';
import { Button, List, Spin, Tooltip } from 'antd';
import './NewCard.scss';
import { Link } from 'react-router-dom';
import { CityType } from '../SubHeader/SubHeader';
import { InitialStateType } from '../../redusers';
import { connect } from 'react-redux';

interface IExternalProps {}

interface IProps extends IExternalProps {
  city: CityType | null;
}

const RenderItem = ({ item, news }: any) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <List.Item
      className="NewCard wow fadeInRight"
      key={item.title}
      // actions={[<div>Ваша выгода 15%</div>]}
      extra={
        <img
          width={272}
          alt="logo"
          src={
            news.image_url?.includes('https://')
              ? news.image_url
              : `https://${news.image_url}`
          }
        />
      }>
      <List.Item.Meta
        title={
          <Link className="NewCard-title" to={`/news/${item.id}`}>
            {item.title}
          </Link>
        }
        description={item.description}
      />
      {showAll ? (
        <div dangerouslySetInnerHTML={{ __html: item.preview }}></div>
      ) : (
        <Tooltip
          overlayStyle={{ minWidth: 1000 }}
          title={item.content}
          placement="bottom">
          <div dangerouslySetInnerHTML={{ __html: item.preview }}></div>
        </Tooltip>
      )}
      <Button className="mt-2" onClick={() => setShowAll(!showAll)}>
        {showAll ? 'Скрыть' : 'Показать'}
      </Button>
    </List.Item>
  );
};

const NewsCards: FC<IProps> = ({ city }) => {
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

  const renderItem = (item: any) => {
    return <RenderItem item={item.News} news={item} />;
  };

  return (
    <Spin spinning={loading}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={news}
        renderItem={renderItem}
      />
    </Spin>
  );
};

const mapStateToProps = (state: InitialStateType) => ({
  city: state.city,
});

export default connect(mapStateToProps)(NewsCards);
