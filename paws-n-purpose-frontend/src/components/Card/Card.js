
import './Card.css';


export default function Card({children}) {
  return (
    <div 
    className='card_card'>
      {children}
    </div>
  );
}