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
              <b>${contact?.city?.label}</b>
              <p>${contact?.Location?.address}</p>
            </div>
            <div>
              <b>Координаты для автонавигатора</b>
              <div>Широта: ${contact?.Location.lat}</div>
              <div>Долгота: ${contact?.Location.lon}</div>
            </div>
          </div>
        </div>
        <div class = 'contactsModal-Block'>
        <div class = 'contactsModal-Paragraph-Block'>
          <b class = 'contactsModal-Shop'>Магазин:</b>
           
        </div>
        <div class = 'contactsModal-Paragraph-Block'>
          <b>Телефон:</b>
          <p class = 'contactsModal-Paragraph contactsModal-color'>${contact?.Location?.phones}</p>
        </div>
        <div class = 'contactsModal-Paragraph-Block'>
          <b>Email:</b>
          <p class = 'contactsModal-Paragraph'>${contact?.Location?.email}</p>
        </div>

        <div class = 'contactsModal-Paragraph-Block'>
          <b>График работы</b>
          <p class = 'contactsModal-Paragraph mb-1'>${contact?.Location?.address}</p>
        </div>
         
        </div>
        <div class = 'contactsModal-d-flex'>
        <button class = 'contactsModal-Record-Button'>Записаться на сервис</button> 
        </div>
      </div>
      
    </div>
  `;
};

{
}

export default ContactsModal;
