import React from 'react';
import './ContactsModal.scss';

interface ContactsModal {
  contact: any;
  onClose?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const ContactsModal = ({ contact }: ContactsModal) => {
  return `
    <div>
      <div>
        <div class="d-flex">
          <div>
            <img
              class="contacts-modal--img"
              src="${contact?.image_url}"
              alt="contact"
            />
          </div>
          <div>
            <div>
              <b>Название</b>
              <p>${contact?.Location?.title}</p>
            </div>
            <div>
              <b>Координаты для автонавигатора</b>
              <div>Широта: ${contact?.Location.lat}</div>
              <div>Долгота: ${contact?.Location.lon}</div>
            </div>
          </div>
        </div>
        <div>
          <b>Тип контакта</b>
          <p>${contact?.location_type_rus}</p>
        </div>
        <div>
          <b>Адрес</b>
          <p>${contact?.Location?.address}</p>
        </div>
        <div>
          <b>Email</b>
          <p>${contact?.Location?.email}</p>
        </div>
      </div>
      <button>Записаться на сервис</button>
    </div>
  `;
};

export default ContactsModal;
