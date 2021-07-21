import { FC, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
import './Vacancies.scss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Button from '../../components/Button/Button';
// @ts-ignore
import WOW from 'wowjs';
import { Link } from 'react-router-dom';
import { FaTelegram } from 'react-icons/fa';
import { FaWhatsappSquare } from 'react-icons/fa';
import { Input } from 'antd';
import { Checkbox } from 'antd';
import DemoCarousel from '../../components/DemoCarousel/DemoCarousel';
import InputMask from 'react-input-mask';

interface IExternalProps {}

interface IProps extends IExternalProps {}

const Vacancies: FC<IProps> = () => {
  const { TextArea } = Input;

  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  // function onChange(a: any) {
  //   console.log(a);
  // }

  return (
    <div className="page-with-header">
      <div className="container">
        <div className="Vacancies-container">
          <Breadcrumbs />
        </div>

        <DemoCarousel />

        <h1 className="Vacancies-title">
          <b>Актуальные вакансии</b>
        </h1>
        <div className="Vacancies-Block">
          <p className="Vacancies-Parapraht">названия вакансии</p>
          <p className="Vacancies-Parapraht2">регион</p>
          <p className="Vacancies-Parapraht2">структурного подразделения</p>
          <p className="Vacancies-Parapraht3">зарплата</p>
          <Button className="Vacancies-Button">Откликнуться</Button>
        </div>
        <div className="Vacancies-Block">
          <p className="Vacancies-Parapraht">названия вакансии</p>
          <p className="Vacancies-Parapraht2">регион</p>
          <p className="Vacancies-Parapraht2">структурного подразделения</p>
          <p className="Vacancies-Parapraht3">зарплата</p>
          <Button className="Vacancies-Button">Откликнуться</Button>
        </div>
        <div className="Vacancies-Block">
          <p className="Vacancies-Parapraht">названия вакансии</p>
          <p className="Vacancies-Parapraht2">регион</p>
          <p className="Vacancies-Parapraht2">структурного подразделения</p>
          <p className="Vacancies-Parapraht3">зарплата</p>

          <Button className="Vacancies-Button">Откликнуться</Button>
        </div>
        <div className="Vacancies-Block">
          <p className="Vacancies-Parapraht">названия вакансии</p>
          <p className="Vacancies-Parapraht2">регион</p>
          <p className="Vacancies-Parapraht2">структурного подразделения</p>
          <p className="Vacancies-Parapraht3">зарплата</p>
          <Button className="Vacancies-Button">Откликнуться</Button>
        </div>

        <div className="Vacancies-Contener mt-5">
          <div>
            <h2 className="mt-4">
              <b>Отдел персонала</b>
            </h2>
            <p className="mb-2 p-Font-Wight">Контактные телефоны</p>
            <div className="Vacancies-phone">
              <a className="Vacancies-phone-a" href="tel:+79004700881 ">
                +7 (900) 470-08-81;
              </a>
              <p className="Vacancies-p-mb ml-1">(Санкт-Петербург)</p>
            </div>
            <div className="Vacancies-phone">
              <a className="Vacancies-phone-a" href="tel:+79004700881 ">
                +7 (900) 470-08-81;
              </a>
              <p className="Vacancies-p-mb ml-1">(Москва)</p>
            </div>

            <div className="Vacancies-phone">
              <a className="Vacancies-phone-a" href="tel:+79004700881 ">
                +7 (900) 470-08-81;
              </a>
              <p className="Vacancies-p-mb ml-1">
                (Звонок по России бесплатный)
              </p>
            </div>

            <p className="mb-2 mt-2 p-Font-Wight">
              Профили на сервисах поиска работы
            </p>
            <div>
              <div className="Vacancies-Link-block">
                <Link className="pr-5 Vacancies-Link" to="/">
                  Head Hunter
                </Link>
                <Link className="pr-5 Vacancies-Link" to="/">
                  Rabota.ru
                </Link>
                <Link className="pr-5 Vacancies-Link" to="/">
                  Superjob
                </Link>
                <Link className="pr-5 Vacancies-Link" to="/">
                  Job.ru
                </Link>
              </div>
            </div>
            <div className="d-flex">
              <div>
                <p className="mt-2 p-Font-Wight">E-mail</p>
                <Link className="Vacancies-Link" to="/asianaauto.ru">
                  asianaauto.ru{' '}
                </Link>
                <br></br>
                <Link className="Vacancies-Link" to="/asianaauto.ru">
                  {' '}
                  asianaauto.ru
                </Link>
              </div>
              <div className="Vacancies-ml-div">
                <p className="mt-2 p-Font-Wight">Мессенджеры</p>
                <div className="p-mb-pb">
                  <FaTelegram className="Vacancies-FaTelegram mr-5" />

                  <FaWhatsappSquare className="Vacancies-FaTelegram" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mt-4">
              <b>Заполнить форму</b>
            </h3>
            <div>
              <div className="Vacancies-Input-block">
                <Input className="mr-2" placeholder="Как к Вам обращаться?" />
                <InputMask
                  className="Vacancies-InputMask"
                  mask="+7 (999) 999-99-99"
                  placeholder="Номер телефона"
                />
              </div>
              <TextArea
                rows={4}
                placeholder="Комментарий"
                className="Vacancies-TextArea mt-3 mb-3"
              />
              <div>
                <Checkbox className="mb-3">
                  <b>Механик</b>
                </Checkbox>
              </div>
              <div>
                <Checkbox className="mb-3">
                  <b>Оператор колл_центра</b>
                </Checkbox>
              </div>
              <div>
                <Checkbox className="mb-3">
                  <b>Продавец</b>
                </Checkbox>
              </div>

              <Button className="Vacancies-Button mb-3">Отправить</Button>

              <p className="mb-5">
                «Нажатием «Записаться» подтверждаю свое согласие на обработку{' '}
                <Link className="Vacancies-Link" to="/asianaauto.ru">
                  Персональных данных
                </Link>{' '}
                » .{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FloatingFooter />
    </div>
  );
};

export default Vacancies;
