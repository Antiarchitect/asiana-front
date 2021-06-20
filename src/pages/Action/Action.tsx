import { Card, Col, Empty, Row, Spin } from 'antd';
import { FC, useEffect, useState } from 'react';
import './Action.scss';
// @ts-ignore
import WOW from 'wowjs';
import { RouteComponentProps } from 'react-router-dom';
import { CityType } from '../../components/SubHeader/SubHeader';
import { connect } from 'react-redux';

interface IExternalProps {}

interface IProps extends IExternalProps, RouteComponentProps<{ id: string }> {
  city: CityType | null;
}

const Action: FC<IProps> = ({ match, city }) => {
  const { id } = match.params;
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://test-rest-api.site/api/1/site/action/${id}/get/?token=b4831f21df6202f5bacade4b7bbc3e5c`,
    )
      .then((response) => response.json())
      .then((data) => {
        setAction(
          data.data.cities?.length
            ? data.data.cities.includes(city?.id)
            : data.data,
        );
        setLoading(false);
      });
  }, [setLoading, setAction, id, city]);

  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <Spin spinning={false}>
      <div className="bg-white">
        <div className="container page-with-header">
          <div className="pt-5">
            <h1 className="Action-title">Акция №{id}</h1>
            {!action ? (
              <Empty />
            ) : (
              <Card loading={loading}>
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
                      <p>{action?.content?.replace(/<\/?[a-zA-Z]+>/gi, '')}</p>
                    </Card>
                  </Col>
                </Row>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Spin>
  );
};

const mapStateToProps = (state: any) => ({
  city: state.city,
});

export default connect(mapStateToProps)(Action);
