import { Button, Col, Row, Spin, Tooltip } from 'antd';
import { FC, useEffect, useState } from 'react';
import './Actions.scss';
// @ts-ignore
import WOW from 'wowjs';
import { Link } from 'react-router-dom';

interface IExternalProps {}

interface IProps extends IExternalProps {}

const Actions: FC<IProps> = () => {
  const [actions, setActions] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      'https://test-rest-api.site/api/1/site/action/list/?token=b4831f21df6202f5bacade4b7bbc3e5c',
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setActions(data.data);
      });
  }, []);

  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <Spin spinning={loading}>
      <div className="bg-white">
        <div className="container page-with-header">
          <div className="pt-3">
            <h1 className="Actions-title">Акции</h1>
            <div>
              {actions.map((item: any) => {
                const { Action: action } = item;

                return (
                  <Col
                    key={action.id}
                    className="Actions-column wow fadeInLeft mb-2"
                    span={24}>
                    <div className="Actions-card">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <Link className="d-flex" to={`/action/${action?.id}`}>
                            <img
                              className="Actions-image mr-2"
                              src={item.image_url}
                              alt="action"
                            />
                          </Link>

                          <div className="d-flex flex-column justify-content-between">
                            <div>
                              <Link
                                className="d-flex mb-2 Action-title--link"
                                to={`/action/${action?.id}`}>
                                <h4 style={{ fontWeight: 'bold' }}>
                                  {action?.title}
                                </h4>
                              </Link>
                              <Tooltip
                                title={action.content}
                                placement="bottom">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: action.preview,
                                  }}></div>
                              </Tooltip>
                            </div>
                            <Link
                              className="d-flex"
                              to={`/action/${action?.id}`}>
                              <Button
                                type="dashed"
                                style={{
                                  borderTop: 'none',
                                  borderLeft: 'none',
                                  borderRight: 'none',
                                  padding: 0,
                                }}
                                danger>
                                Подробнее
                              </Button>
                            </Link>
                          </div>
                        </div>
                        <Row justify="end">
                          <div>{action.modified}</div>
                        </Row>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Actions;
