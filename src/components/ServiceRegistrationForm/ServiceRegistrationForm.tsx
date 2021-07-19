import Modal from '../Modal/Modal';
import './ServiceRegistrationForm.scss';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from 'antd';
import { Space } from 'antd';
import { Input, DatePicker } from 'antd';
import { FaExclamation } from 'react-icons/fa';
import { COLORS } from '../../constants';

interface IExternalProps {
  onClose?: () => void;
  visible: boolean;
  contact: any;
}

const { TextArea } = Input;

interface IProps extends IExternalProps {}

const ServiceRegistrationForm: FC<IProps> = ({ visible, contact, onClose }) => {
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    fetch(
      'https://test-rest-api.site/api/1/site/location/list/?token=b4831f21df6202f5bacade4b7bbc3e5c',
    )
      .then((response) => response.json())
      .then((data) =>
        setCities(
          data.data.map(({ Location: item }: any) => ({
            id: item?.id,
            label: item?.address,
            ...item,
          })),
        ),
      );
  }, []);

  return (
    <Modal
      width={1000}
      className="ServiceRegistrationModal"
      okText="Отправить"
      visible={visible}
      onClose={onClose}>
      <div>
        <div className="ServiceRegistrationForm-border-block mb-4 ">
          <div className="ServiceRegistrationForm-border ml-5 mr-5">
            <FaExclamation color={COLORS.white} size={30} />
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
            <select className="textField-select mr-4">
              <option>- Выберите сервис -</option>
              {cities.map((item) => (
                <option
                  selected={contact?.Location.id === item.id}
                  key={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            <p>
              или{' '}
              <a href="/contacts" className="ServiceRegistrationForm-Link">
                на карте
              </a>{' '}
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

            <DatePicker
              showTime
              placeholder="Введите дату"
              format="YYYY-MM-DD HH:mm"
              minuteStep={15}
            />
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
