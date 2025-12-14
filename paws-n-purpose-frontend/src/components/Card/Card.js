
import './Card.css';


export default function Card({children, card_width, padding="2.313rem 2rem", borderRadius="1.25rem"}) {
  return (
    <div 
    style={{
      width: `${card_width}`,
      padding: `${padding}`,
      borderRadius: `${borderRadius}`
    }}
    className='card_card'>
      {children}
    </div>
  );
}