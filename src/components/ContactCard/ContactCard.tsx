import { FC } from 'react';
import './ContactCard.scss';

interface IExternalProps {
  title?: string;
  phone: string;
  date: string;
  onClick?: (item: any) => void;
  item: any;
}

interface IProps extends IExternalProps {}

const ContactCard: FC<IProps> = ({ title, phone, date, onClick, item }) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    onClick && onClick(item);
  };

  return (
    <div className="ContactCard">
      {title && (
        <a href="/" onClick={handleClick} className="ContactCard-title">
          {title}
        </a>
      )}
      {phone && (
        <a href={`tel: ${phone}`} className="ContactCard-phone">
          {phone}
        </a>
      )}
      {date && <span>{date}</span>}
    </div>
  );
};

export default ContactCard;
