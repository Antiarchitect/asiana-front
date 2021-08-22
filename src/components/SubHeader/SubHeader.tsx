import React, { FC, useCallback, useEffect, useState } from 'react';
import { BiMap, BiPhone } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { DownOutlined } from '@ant-design/icons';
import { COLORS } from '../../constants';
import './SubHeader.scss';
import Button from '../Button/Button';
import { Spin, Tooltip } from 'antd';
import RegionSelectionModal from '../RegionSelectionModal/RegionSelectionModal';
import { getCookie } from '../../services/cookie';
import { connect } from 'react-redux';
import { setCity, startRequest, stopRequest } from '../../actions';

interface IExternalProps {}

interface IProps extends IExternalProps {
  setCity?: any;
  city: any;
  startRequest: () => any;
  stopRequest: () => any;
}

export interface CityType {
  name: string;
  id: string;
}

export interface CityRequestType {
  api: string;
  data: Array<{ City: CityType }>;
  server_time: string;
  platform: string;
  status: string;
  version_api: string;
}

const SubHeader: FC<IProps> = ({
  setCity,
  city: region,
  startRequest,
  stopRequest,
}) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [data, setData] = useState<CityRequestType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // const [region, setRegion] = useState<CityType | null>(null);

  const updateRegion = useCallback(() => {
    startRequest();
    const regJson = getCookie('region');
    // setRegion(regJson ? JSON.parse(regJson) : null);
    setCity(regJson ? JSON.parse(regJson) : null);
    setTimeout(stopRequest, 2000);
  }, [setCity, stopRequest, startRequest]);

  useEffect(() => {
    updateRegion();
  }, [updateRegion]);

  useEffect(() => {
    setLoading(true);
    fetch(
      'https://test-rest-api.site/api/1/mobile/location/cities/?token=b4831f21df6202f5bacade4b7bbc3e5c',
    )
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(JSON.stringify(error)))
      .finally(() => setLoading(false));
  }, []);

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, [setOpenModal]);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    updateRegion();
  }, [setOpenModal, updateRegion]);

  return (
    <Spin spinning={loading}>
      <div className="SubHeader">
        <RegionSelectionModal
          regions={data?.data || []}
          visible={isOpenModal}
          error={Boolean(error)}
          onClose={handleCloseModal}
        />
        <div className="container page-container--full">
          <div className="SubHeader-container">
            <div className="SubHeader-block">
              <Button
                onClick={handleOpenModal}
                color={COLORS.red}
                bgColor={COLORS.transparent}>
                <BiMap className="mr-2" color={COLORS.red} size={24} />
                {region?.name || 'Санкт-Петербург'}
                <DownOutlined />
              </Button>
            </div>
            <div className="SubHeader-content">
              <Button
                className="mr-4"
                color={COLORS.red}
                bgColor={COLORS.transparent}>
                <BiPhone className="mr-2" color={COLORS.red} size={24} />
                <a href="tel:+79602837775">8 (960)283 77 75</a>
              </Button>
              <Button
                className="d-flex align-items-center"
                bgColor={COLORS.transparent}
                color={COLORS.red}>
                <Tooltip title="Личный кабинет">
                  <FaUserCircle color={COLORS.red} size={25} />
                </Tooltip>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

const mapStateToProps = (state: any) => ({
  city: state.city,
});

export default connect(mapStateToProps, { setCity, startRequest, stopRequest })(
  SubHeader,
);
