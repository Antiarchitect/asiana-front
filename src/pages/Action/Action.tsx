import { Row, Spin } from 'antd';
import { FC, useEffect, useState } from 'react';
import './Action.scss';
// @ts-ignore
import WOW from 'wowjs';
import { RouteComponentProps } from 'react-router-dom';

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
    <Spin spinning={loading}>
      <div className="bg-white">
        <div className="container page-with-header">
          <div className="pt-5">
            <h1 className="Action-title">Акция №{id}</h1>
            <Row justify="space-between">
              <div dangerouslySetInnerHTML={{ __html: action?.content }}></div>
              {/* <Col className="Action-column--left" span={8}>
                <img
                  className="Action-image mb-3 wow zoomIn"
                  src={action}
                  alt="action"
                />
              </Col>
              <Col className="Action-column--right wow fadeIn" span={16}>
                <h3 className="mb-3 text-center">Заголовок</h3>
                <p>
                  Lorem Ipsum - это текст-"рыба", часто используемый в печати и
                  вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для
                  текстов на латинице с начала XVI века. В то время некий
                  безымянный печатник создал большую коллекцию размеров и форм
                  шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem
                  Ipsum - это текст-"рыба", часто используемый в печати и
                  вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для
                  текстов на латинице с начала XVI века. В то время некий
                  безымянный печатник создал большую коллекцию размеров и форм
                  шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem
                  Ipsum - это текст-"рыба", часто используемый в печати и
                  вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для
                  текстов на латинице с начала XVI века. В то время некий
                  безымянный печатник создал большую коллекцию размеров и форм
                  шрифтов, используя Lorem Ipsum для распечатки образцов.
                </p>
              </Col> */}
            </Row>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Action;
