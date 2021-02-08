import React, { FC, useCallback, useState } from 'react';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import SubHeader from '../../components/SubHeader/SubHeader';
import FloatingButton from '../../components/FloatingButton/FloatingButton';
import DropdownMenu from '../../components/DropdownMenu/DropdownMenu';
import Modal from '../../components/Modal/Modal';
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import RegionSelectionModal from '../../components/RegionSelectionModal/RegionSelectionModal';
import { COLORS } from '../../constants';

interface IExternalProps {}

interface IProps extends IExternalProps {}

const navs = [
  {
    id: 1,
    label: 'Label',
    link: '/',
  },
  {
    id: 2,
    label: 'Label',
    link: '/',
  },
];

const Components: FC<IProps> = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenModalRegion, setOpenModalRegion] = useState(false);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleCloseModalRegion = useCallback(() => {
    setOpenModalRegion(false);
  }, []);

  const handleOpenModalRegion = useCallback(() => {
    setOpenModalRegion(true);
  }, []);

  return (
    <div>
      <Header />
      <SubHeader />
      <Button>ОСТАВИТЬ ОТЗЫВ</Button>
      <Button bgColor={COLORS.orange} onClick={handleOpenModal}>
        Открыть модалку
      </Button>
      <Button bgColor={COLORS.red} onClick={handleOpenModalRegion}>
        Открыть модалку region
      </Button>
      <FloatingButton />
      <br />
      <DropdownMenu label="Главная" navs={navs} />
      <Modal visible={isOpenModal} onClose={handleCloseModal}>
        КОнтент
      </Modal>
      <LeftSideBar />
      <RegionSelectionModal
        visible={isOpenModalRegion}
        onClose={handleCloseModalRegion}
      />
    </div>
  );
};

export default Components;
