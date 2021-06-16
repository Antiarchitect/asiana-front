import { Avatar, Card, Col, Row, Spin } from 'antd';
import { FC, useEffect, useState } from 'react';
import './Action.scss';
// @ts-ignore
import WOW from 'wowjs';
import { RouteComponentProps } from 'react-router-dom';
import Meta from 'antd/lib/card/Meta';

interface IExternalProps {}

interface IProps extends IExternalProps, RouteComponentProps<{ id: string }> {}

const Action: FC<IProps> = ({ match }) => {
  const { id } = match.params;
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      `http://test-rest-api.site/api/1/site/action/${id}/get/?token=b4831f21df6202f5bacade4b7bbc3e5c`,
    )
      .then((response) => response.json())
      .then((data) => {
        setAction(data.data);
        setLoading(false);
      });
  }, [setLoading, setAction, id]);

  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <Spin spinning={false}>
      <div className="bg-white">
        <div className="container page-with-header">
          <div className="pt-5">
            <h1 className="Action-title">Акция №{id}</h1>
            {loading || !action ? (
              <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            ) : (
              <Row justify="space-between">
                {/* <div dangerouslySetInnerHTML={{ __html: action?.content }}></div> */}
                <Col className="Action-column--left pr-2" span={8}>
                  <img
                    className="Action-image wow zoomIn"
                    src={action.image_url}
                    alt="action"
                  />
                </Col>
                <Col className="Action-column--right wow fadeIn" span={16}>
                  <Card style={{ height: '100%' }} title={action?.title}>
                    <p>{action?.content_text}</p>
                  </Card>
                </Col>
              </Row>
            )}
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Action;
