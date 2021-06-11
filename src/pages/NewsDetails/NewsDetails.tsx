import { FC, useEffect, useState } from 'react';
// @ts-ignore
import WOW from 'wowjs';
import { Empty, Row, Spin } from 'antd';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import Footer from '../../components/Footer/Footer';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
import { RouteComponentProps } from 'react-router-dom';
import { Typography, Card } from 'antd';
const { Text } = Typography;

interface IExternalProps {}

interface IProps extends IExternalProps, RouteComponentProps<{ id: string }> {}

const NewsDetails: FC<IProps> = ({ match }) => {
  const { id } = match.params;
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      `http://test-rest-api.site/api/1/site/new/${id}/get/?token=b4831f21df6202f5bacade4b7bbc3e5c`,
    )
      .then((response) => response.json())
      .then((data) => {
        setNews(data.data);
        setLoading(false);
      });
  }, [setLoading, id]);

  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <Spin spinning={loading}>
      <div className="page-with-header">
        <div className="container">
          <div className="News-container">
            <div className="News-breadcrumbs-title">
              <div className="News-block">
                <Breadcrumbs />
              </div>
              <h1 className="News-title">{news?.title || `Новость №${id}`}</h1>
            </div>
            <div className="flex-1">
              <div>
                <div className="News-leftSidebar-button-title">
                  <div className="News-leftSidebar-button">
                    <LeftSideBar />
                  </div>
                  {!news ? (
                    <Empty />
                  ) : (
                    <Card style={{ flex: 1 }}>
                      <Row className="mb-3" justify="space-between">
                        <Text strong>{news.title}</Text>
                        <Text type="secondary">{news.modified}</Text>
                      </Row>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: news.content,
                        }}></div>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <FloatingFooter />
      </div>
    </Spin>
  );
};

export default NewsDetails;
