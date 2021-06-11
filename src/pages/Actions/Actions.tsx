import { Col, Row, Spin, Tooltip } from 'antd';
import { FC, useEffect, useState } from 'react';
import './Actions.scss';
// @ts-ignore
import WOW from 'wowjs';
import { splitValue } from '../../services/sptilValue';

interface IExternalProps {}

interface IProps extends IExternalProps {}

const Actions: FC<IProps> = () => {
  const [actions, setActions] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      'http://test-rest-api.site/api/1/site/action/list/?token=b4831f21df6202f5bacade4b7bbc3e5c',
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
            <Row>
              {actions.map(({ Action: action }: any) => {
                return (
                  <Col
                    key={action.id}
                    className="Actions-column wow fadeInLeft"
                    span={8}>
                    <div className="Actions-card">
                      <a target="_blank" href="/action/1">
                        <img
                          className="Actions-image mb-3"
                          src={action.image}
                          alt="action"
                        />
                        <Tooltip title={action.content} placement="bottom">
                          <div
                            style={{ fontWeight: 'bold' }}
                            dangerouslySetInnerHTML={{
                              __html: action.preview,
                            }}></div>
                        </Tooltip>
                        <Row justify="end">
                          <div>{action.modified}</div>
                        </Row>
                      </a>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Actions;
