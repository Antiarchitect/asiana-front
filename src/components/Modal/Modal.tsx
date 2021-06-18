import { FC } from 'react';
import { Modal, ModalProps } from 'antd';
import './Modal.scss';

interface IExternalProps {
  onClose?: any;
  className?: string;
}

interface IProps extends IExternalProps, ModalProps {}

export interface IModalProps extends IProps {}

const ModalComponent: FC<IProps> = ({
  visible,
  onClose,
  children,
  className,
  ...props
}) => {
  return (
    <Modal
      className={className || ''}
      visible={visible || false}
      onCancel={onClose}
      {...props}>
      {children}
    </Modal>
  );
};

export default ModalComponent;
