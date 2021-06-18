import { FC, useCallback } from 'react';
import './RegionSelectionModal.scss';
import Modal from '../Modal/Modal';
import { Empty, Select } from 'antd';
import Button from '../Button/Button';
import { COLORS } from '../../constants';
import { setCookie } from '../../services/cookie';
import { CityRequestType } from '../SubHeader/SubHeader';

const { Option } = Select;

interface IExternalProps {
  onClose?: any;
  visible: boolean;
  regions?: CityRequestType['data'];
  error?: boolean;
}

interface IProps extends IExternalProps {}

// function filter(data?: any[], id?: number, id2?: number) {
//   if (!data) return [];
//   return data.filter(
//     (item: any) => item.blockId === id || item.blockId === id2,
//   );
// }

const RegionSelectionModal: FC<IProps> = ({
  visible,
  onClose,
  regions,
  error,
}) => {
  // const region_block_id_1 = useMemo(() => {
  //   return filter(regions, 1);
  // }, [regions]);

  // const region_block_id_2 = useMemo(() => {
  //   return filter(regions, 2);
  // }, [regions]);

  // const region_block_id_3 = useMemo(() => {
  //   return filter(regions, 3);
  // }, [regions]);

  const handleSelectRegion = useCallback(
    (region) => {
      return () => {
        setCookie('region', JSON.stringify(region));
        if (onClose) onClose();
      };
    },
    [onClose],
  );

  const onChangeSearch = useCallback(
    (_, regionItem) => {
      const region = regions?.find(
        (item) => String(item.City.id) === regionItem.key,
      );

      if (region) {
        setCookie('region', JSON.stringify(region.City));
      }
    },
    [regions],
  );

  return (
    <Modal
      className="RegionSelectionModal"
      visible={visible}
      onOk={onClose}
      onClose={onClose}>
      <div>
        {error ? (
          <Empty />
        ) : (
          <>
            <p className="RegionSelectionModal-item pt-2">
              Выберите свой город или область.
            </p>
            <Select
              showSearch
              style={{ width: '100%' }}
              className="mb-4"
              placeholder="Выбери город"
              optionFilterProp="children"
              onChange={onChangeSearch}
              filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }>
              {regions?.map((item) => (
                <Option key={item.City.id} value={item.City.name}>
                  {item.City.name}
                </Option>
              ))}
            </Select>
            <div className="RegionSelectionModal-border">
              <p className="font-weight mb-0">Розничные магазины Кореана</p>
              <div className="RegionSelectionModal-Сontainer mb-3">
                <div className="d-flex flex-wrap">
                  {regions?.map(({ City: item }) => (
                    <Button
                      // className={item.blockId === 1 ? 'font-weight' : ''}
                      onClick={handleSelectRegion(item)}
                      color={COLORS.black}
                      bgColor={COLORS.transparent}
                      key={item.id}>
                      {item.name}
                    </Button>
                  ))}
                </div>
              </div>
              {/* <p className="font-weight mb-0">
                {region_block_id_3?.length} городов
              </p>
              <div className="scroll-list RegionSelectionModal-Block">
                {region_block_id_3?.map((item) => (
                  <Button
                    onClick={handleSelectRegion(item)}
                    color={COLORS.black}
                    bgColor={COLORS.transparent}
                    key={item.id}>
                    {item.name}
                  </Button>
                ))}
              </div> */}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default RegionSelectionModal;
