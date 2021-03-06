import { FC } from 'react';
import './ContactCard.scss';

interface IExternalProps {
  title?: string;
  phone: string;
  date: string;
  onClick?: (item: any) => void;
  item: any;
  work_time: any;
}

interface IProps extends IExternalProps {}

const ContactCard: FC<IProps> = ({
  title,
  phone,
  onClick,
  item,
  work_time,
}) => {
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

      {phone &&
        phone
          .split(' +7')
          .filter(Boolean)

          .map((item, idx) =>
            idx === 0 ? (
              <a
                key={idx}
                href={`tel: +7${item}`}
                className="ContactCard-phone">
                +7{item.replace('Техцентр', '')}
              </a>
            ) : null,
          )}
      <b>
        {'пн-вс:    ' +
          (work_time?.vs?.start_time
            ? work_time?.vs?.start_time + ':00 -  '
            : 'Нет данных')}
        {work_time?.vs?.end_time ? work_time?.vs?.end_time + ':00' : ''}
      </b>
      {/* {date && <span>{date}</span>} */}
    </div>
  );
};

export default ContactCard;
