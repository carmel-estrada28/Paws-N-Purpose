

import "./FormInput.css";



export default function FormInput({placeholder, type}) {
  return (
    <input 
    className="input"
    type={ type }
    placeholder={ placeholder }
    />
  );
}