import React, { FC } from 'react';
import './ContactsModal.scss';
import Button from '../../components/Button/Button';

interface ContactsModal {
  contact: any;
  onClose?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const ContactsModal: FC<ContactsModal> = ({ contact, onClose }) => {
  return (
    <div className="contacts-modal">
      <div>
        <div>
          <img
            className="contacts-modal--img"
            src={contact?.image_url}
            alt="contact"
          />
        </div>
        <div>
          <b>Тип контакта</b>
          <p>{contact?.location_type_rus}</p>
        </div>
        <div>
          <b>Название</b>
          <p>{contact?.Location?.title}</p>
        </div>
        <div>
          <b>Адрес</b>
          <p>{contact?.Location?.address}</p>
        </div>
        <div>
          <b>Email</b>
          <p>{contact?.Location?.email}</p>
        </div>
      </div>
      <Button>Записаться на сервис</Button>
      <button onClick={onClose} className="contacts-modal--close">
        x
      </button>
    </div>
  );
};

export default ContactsModal;
