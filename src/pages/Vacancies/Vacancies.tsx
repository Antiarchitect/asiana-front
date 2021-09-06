import { FC, useEffect, useState } from 'react';
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
import { Table } from 'antd';
import axios from 'axios';

interface IExternalProps {}

interface IProps extends IExternalProps {}

const Vacancies: FC<IProps> = () => {
  const { TextArea } = Input;
  const [vacancies, setVacancies] = useState<any>([]);

  // const authHHru = () => {
  //   axios.get(`/employers/4651161/vacancies/active`, {
  //       headers: {
  //         "Authorization": 'Bearer ' + "L5EBPCDDR2KN93EH1AT8DMFKKIHOEBQBP5HEKGLAPJ0KABVQE4E34F91K2C6LHR1"
  //       },
  //     })
  //       .then(data => {
  //         console.log(data);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });

  // Ключи для авторизации приложения в hh-api

  // Запрос авторизации приложения в hh-api

  const authHHru = async () => {
    // const local = window.location;

    const code =
      'SUPLG27KI3AJUNS73LJ6CR29AGIUQNQTG5F2KJ2PCT52O2M0U6V4AAC3Q8RCDI2O';

    // step 1, auth for hh.ru
    // window.location.replace(`https://hh.ru/oauth/authorize?response_type=code&client_id=SAV2FKJST8FV0O3DNOKAV836EVCPRB3RP3KGVAN4K7I5905V56B2F6M4AFH9R8F3`)

    // step 2, get access token
    // const formData = new FormData();
    // formData.append('client_id','SAV2FKJST8FV0O3DNOKAV836EVCPRB3RP3KGVAN4K7I5905V56B2F6M4AFH9R8F3');
    // formData.append('client_secret', 'IUFQP01O9QSKMNAVNM3J78RJV5EGN2JALGHD5LBHG14UPG61DLQQL3JM0M52U4QO');
    // formData.append('grant_type', 'authorization_code');
    // formData.append('code', code);

    // axios.post('/oauth/token', formData)
    //   .then(data => {
    //     console.log(data.status);
    //     alert(1)
    //   })
    //   .catch(err => {
    //     console.log('err', err);
    //     setTimeout(authHHru, 10000)
    //   });

    // step 3, get vacancies with access token

    // access_token: "NJSVS8SJJ03U425PGO11ARSKAN0IQBCL1MRR3A4FGB2OBFP7QI8ODUDF72O3VS10"
    // expires_in: 1209599
    // refresh_token: "MRARQPO6CHS6NUGSO3JI3DL3U0OVRPP4LSLQAR3VNE0HBV0PH0ADF2KMSINNMLIQ"
    // token_type: "bearer"

    // "proxy": "https://api.hh.ru"
    // /employers/4651161/vacancies/active?manager_id=7019987
    // https://api.hh.ru/employers/4651161/vacancies/active?manager_id=7019987

    const refresh_token =
      localStorage.getItem('refresh_token_asiana') ||
      'MRARQPO6CHS6NUGSO3JI3DL3U0OVRPP4LSLQAR3VNE0HBV0PH0ADF2KMSINNMLIQ';
    let access_token =
      localStorage.getItem('access_token_asiana') ||
      'NJSVS8SJJ03U425PGO11ARSKAN0IQBCL1MRR3A4FGB2OBFP7QI8ODUDF72O3VS10';

    // step for update access token
    const formData = new FormData();
    formData.append(
      'client_id',
      'SAV2FKJST8FV0O3DNOKAV836EVCPRB3RP3KGVAN4K7I5905V56B2F6M4AFH9R8F3',
    );
    formData.append(
      'client_secret',
      'IUFQP01O9QSKMNAVNM3J78RJV5EGN2JALGHD5LBHG14UPG61DLQQL3JM0M52U4QO',
    );
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', refresh_token);
    formData.append('code', code);

    try {
      const response: any = await axios.post('/oauth/token', formData);

      localStorage.setItem('access_token_asiana', response.access_token);
      localStorage.setItem('refresh_token_asiana', response.refresh_token);

      fetch(
        `https://api.hh.ru/employers/4651161/vacancies/active?manager_id=7019987`,
        {
          headers: {
            Authorization: `Bearer ${response.access_token || access_token}`,
          },
        },
      )
        .then((response) => {
          console.log('response');
          return response.json();
        })
        .then((data) => setVacancies(data.items))
        .catch((err) => console.log(err));
    } catch (err) {
      fetch(
        `https://api.hh.ru/employers/4651161/vacancies/active?manager_id=7019987`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
        .then((response) => {
          console.log('response');
          return response.json();
        })
        .then((data) => setVacancies(data.items))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    new WOW.WOW().init();
    authHHru();
  }, []);

  const columns = [
    {
      title: <b>Название</b>,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <b>Адрес</b>,
      dataIndex: 'address',
      key: 'address',
      render(adr: any) {
        return adr?.city || 'Не указан адрес';
      },
    },
    {
      title: <b>Работодатель</b>,
      dataIndex: 'employer',
      key: 'employer',
      render(em: any) {
        return em.name;
      },
    },
    {
      title: <b>Зарплата</b>,
      dataIndex: 'salary',
      key: 'salary',
      render(salary: any) {
        return salary?.from + salary?.currency;
      },
    },
    {
      title: '',
      key: 'button',
      render(v: any) {
        return (
          <a href={v.alternate_url}>
            <Button className="Vacancies-Button">Откликнуться</Button>
          </a>
        );
      },
    },
  ];

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
        {!Array.isArray(vacancies) ? (
          'Не удалось получить список вакансий'
        ) : (
          <Table
            dataSource={vacancies.map((item: any) => ({
              ...item,
              button: true,
            }))}
            pagination={{ pageSize: 5 }}
            loading={!vacancies.length}
            columns={columns}
          />
        )}

        {/* {vacancies.map((v: any) => (
          <div key={v.id} className="Vacancies-Block">
            <p className="Vacancies-Parapraht" style={{ width: '40%' }}>
              {v.name}
            </p>
            <p className="Vacancies-Parapraht2" style={{ width: '20%' }}>
              {v.address?.city || v.area.name || 'Не указан регион'}
            </p>
            <p className="Vacancies-Parapraht2" style={{ width: '10%' }}>
              {v.employer.name}
            </p>
            <p
              className="Vacancies-Parapraht3"
              style={{ width: '20%', textAlign: 'center' }}>
              {(v.salary?.from || '') + (v.salary?.currency || '')}
            </p>
            <a href={v.alternate_url}>
              <Button className="Vacancies-Button">Откликнуться</Button>
            </a>
          </div>
        ))} */}

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
                <Link className="Vacancies-Link" to="/data-processing">
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
