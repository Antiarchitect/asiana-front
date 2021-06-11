import { FC, useEffect, useState } from 'react';
import { Button, List, Spin, Tooltip } from 'antd';
import './NewCard.scss';
import { Link } from 'react-router-dom';

interface IExternalProps {}

interface IProps extends IExternalProps {}

const RenderItem = ({ item }: any) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <List.Item
      className="NewCard wow fadeInRight"
      key={item.title}
      // actions={[<div>Ваша выгода 15%</div>]}
      extra={<img width={272} alt="logo" src={item.image} />}>
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

const NewsCards: FC<IProps> = () => {
  const [news, setNews] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      'http://test-rest-api.site/api/1/site/new/list/?token=b4831f21df6202f5bacade4b7bbc3e5c',
    )
      .then((response) => response.json())
      .then((data) => {
        setNews(data.data);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ News: item }: any) => {
    return <RenderItem item={item} />;
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

export default NewsCards;
