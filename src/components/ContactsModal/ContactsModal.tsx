import './ContactsModal.scss';

interface ContactsModal {
  contact: any;
  onClose?: () => void;
  phone: string;
  item: any;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const ContactsModal = ({ contact, onClose }: ContactsModal) => {
  const number = contact?.Location?.phones
    ?.split(' +7')
    .filter(Boolean)
    .map((item: any, idx: any) =>
      idx === 0
        ? `
      <a href="tel: +7${item}" class="ContactsModal-phone">
        +7${item}
      </a>
    `
        : '',
    )[0];

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
                      <p class = 'contactsMod              <p class = 'contactsModal-paragraph-p'>${
                        contact?.Location?.address
                      }</p>
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
        ${
          contact?.Location_Type.type === 'shop'
            ? `<b class = 'contactsModal-Shop'>Магазин:</b>`
            : ''
        }
        ${
          contact?.Location_Type.type === 'sto'
            ? `<b class = 'contactsModal-Shop'>Технический центр:</b>
       `
            : ''
        }           

             

              
    
  </div>
         

         
        <div class = 'contactsModal-Paragraph-Block'>
        
          <b>Телефон:</b>
          ${number}
        </div>

        <div class = 'contactsModal-Paragraph-Block'>
          <b>Email:</b>
          <p class = 'contactsModal-Paragraph'>${contact?.Location?.email}</p>
        </div>

        <div class = 'contactsModal-Paragraph-Block'>
          <b>График работы</b>
          <p class = 'contactsModal-Paragraph mb-1'>${
            contact?.Location?.address
          }</p>
        </div>  
        
        




        <div class = 'contactsModal-d-flex'>
        </div> 
        </div>
        ${
          contact?.Location_Type.type === 'sto'
            ? `<button id="${contact?.Location.id}" class = 'contactsModal-Record-Button'>Записаться на сервис</button>`
            : ''
        } 
    </div>
  `;
};

export default ContactsModal;
