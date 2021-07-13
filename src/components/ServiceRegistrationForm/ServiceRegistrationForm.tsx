import Modal from '../Modal/Modal';
import './ServiceRegistrationForm.scss';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from 'antd';
import { DatePicker, Space } from 'antd';
import { Input } from 'antd';

interface IExternalProps {
  onClose?: () => void;
  visible: boolean;
}

const { TextArea } = Input;

interface IProps extends IExternalProps {}

const ServiceRegistrationForm: FC<IProps> = ({ visible, onClose }) => {
  return (
    <Modal width={1000} okText="Отправить" visible={visible} onClose={onClose}>
      <div>
        <div className="ServiceRegistrationForm-border-block mb-4 mr-3">
          <div className="ServiceRegistrationForm-border ml-5 mr-5">
            <p className="ServiceRegistrationForm-Exclamatory">!</p>
          </div>

          <div>
            <p className="mt-2 ServiceRegistrationForm-mb">
              <b>Внимание!</b>
            </p>
            <p className="ServiceRegistrationForm-mb">
              В случае отправки формы записи на сервис после <b>20:00,</b>{' '}
              автомобиль может быть принят на обслуживание не
            </p>
            <p>
              раньше <b>10:00</b> следующего дня.
            </p>
          </div>
        </div>

        <div className="ServiceRegistrationForm-contener">
          <div className="ServiceRegistrationForm-block">
            <p className="ServiceRegistrationForm-paragraph">
              Выберите автосервис из списка{' '}
            </p>
            <p className="ServiceRegistrationForm-star">*</p>
          </div>

          <div className="ServiceRegistrationForm-Select">
            <select
              defaultValue="-Выберите сервис-"
              className="textField-select mr-4">
              <option>- Выберите сервис -</option>
            </select>
            <p>
              или{' '}
              <Link to="/" className="ServiceRegistrationForm-Link">
                на карте
              </Link>{' '}
            </p>
          </div>
        </div>

        <div className="ServiceRegistrationForm-contener">
          <div className="ServiceRegistrationForm-block">
            <p className="ServiceRegistrationForm-paragraph">Имя </p>
            <p className="ServiceRegistrationForm-star">*</p>
          </div>

          <div className="ServiceRegistrationForm-Select">
            <input className="textField-input mr-4"></input>
          </div>

          <div className="ServiceRegistrationForm-block">
            <p className="ServiceRegistrationForm-paragraph">
              Ваш телефон для связи{' '}
            </p>
            <p className="ServiceRegistrationForm-star">*</p>
          </div>

          <div className="ServiceRegistrationForm-Select">
            <input className="textField-input mr-4"></input>
          </div>
        </div>

        <div className="ServiceRegistrationForm-contener">
          <Checkbox>Запчасти свои</Checkbox>
          <p className="ServiceRegistrationForm-paragraph2">
            Отметьте поле при визите на сервис со своими запчастями. Или не
            отмечайте, если требуется подбор и заказ.
          </p>
        </div>

        <div className="ServiceRegistrationForm-contener">
          <Space direction="vertical" size={12}>
            <p className="ServiceRegistrationForm-paragraph">
              Удобные для Вас дата и время посещения СТО:
            </p>
            <DatePicker showTime />
          </Space>
        </div>

        <div className="ServiceRegistrationForm-contener">
          <p className="ServiceRegistrationForm-paragraph">Вид работ</p>
          <TextArea rows={4} />
          <p className="ServiceRegistrationForm-paragraph">Комментарий</p>
          <TextArea rows={4} />
        </div>
      </div>

      <p>
        Нажимая на кнопку «Отправить», вы даете{' '}
        <Link to="/data-processing" className="ServiceRegistrationForm-Link">
          согласие на обработку своих персональных данных.
        </Link>{' '}
      </p>
    </Modal>
  );
};

export default ServiceRegistrationForm;
