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

interface IExternalProps {}

interface IProps extends IExternalProps {}

const Vacancies: FC<IProps> = () => {
  const { TextArea } = Input;
  const [vacancies, setVacancies] = useState([]);

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

  const authHHru = () => {
    // const local = window.location;

    // const code =
    //   'NR8D7SD5A586KH6I7ORPFL4R293F16KI93QLJGE1PDB3VT28MD1IRO8CDTPP62NU';

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

    // access_token: "H49PB1QHDOF0OKEO3V80PKS057LL7UA7F5269BFDLNMUOVPOV4STV908JR8UV0FI"
    // expires_in: 1209599
    // refresh_token: "VMUEVVP040CLLQ4HDDK35E7O8UP9K1IVC67PBKL7AQAJ9E7405HGIJ3NKCPG3JJ1"
    // token_type: "bearer"

    fetch(`/employers/4651161/vacancies/active?manager_id=7019987`, {
      headers: {
        Authorization:
          'Bearer H49PB1QHDOF0OKEO3V80PKS057LL7UA7F5269BFDLNMUOVPOV4STV908JR8UV0FI',
      },
    })
      .then((response) => {
        console.log('response');
        return response.json();
      })
      .then((data) => setVacancies(data.items))
      .catch((err) => console.log(err));

    // axios.get(`/employers/4651161/vacancies/active`, {
    //   withCredentials: false,
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Authorization': 'Bearer H49PB1QHDOF0OKEO3V80PKS057LL7UA7F5269BFDLNMUOVPOV4STV908JR8UV0FI'
    //   }
    // })
    //   .then(response => console.log(response))
    //   .catch(err => console.log(err))

    // const authHHru = () => {
    // const formData = new FormData();
    // formData.append('grant_type', 'client_credentials');
    // formData.append('client_id','SAV2FKJST8FV0O3DNOKAV836EVCPRB3RP3KGVAN4K7I5905V56B2F6M4AFH9R8F3');
    // formData.append('client_secret', 'IUFQP01O9QSKMNAVNM3J78RJV5EGN2JALGHD5LBHG14UPG61DLQQL3JM0M52U4QO');

    // axios.post('/oauth/token', formData)
    //   .then(data => {
    //     console.log(data.status);
    //     alert(1)
    //   })
    //   .catch(err => {
    //     console.log('err', err);
    //     setTimeout(authHHru, 10000)
    //   });

    //   fetch('https://hh.ru/oauth/token', {
    //     method: 'POST',
    //     mode: 'no-cors',
    //     cache: 'no-cache',
    //     headers: {
    //         "Content-Type": 'multipart/form-data',
    //     },
    //     body: formData,
    //   })
    //     .then(data => {
    //       console.log(data);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });

    // первый запрос

    // fetch('/oauth/token?grant_type=client_credentials&client_id=SAV2FKJST8FV0O3DNOKAV836EVCPRB3RP3KGVAN4K7I5905V56B2F6M4AFH9R8F3&client_secret=IUFQP01O9QSKMNAVNM3J78RJV5EGN2JALGHD5LBHG14UPG61DLQQL3JM0M52U4QO', {
    //   method: 'POST',
    //   // mode: 'no-cors',
    //   cache: 'no-cache',
    //   // body: formData,
    // })
    //   .then(data => {
    //     console.log(data.status);
    //     if (data.status === 403) {
    //       setTimeout(authHHru, 120000)
    //     }
    //   })
    //   .catch(err => {
    //     console.log('err', err);
    //   });
  };

  useEffect(() => {
    new WOW.WOW().init();
    authHHru();
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
        {vacancies.map((v: any) => (
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
        ))}

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
