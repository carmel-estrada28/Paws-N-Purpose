
import './Card.css';


export default function Card({children, card_width}) {
  return (
    <div 
    style={{
      width: `${card_width}`
    }}
    className='card_card'>
      {children}
    </div>
  );
}