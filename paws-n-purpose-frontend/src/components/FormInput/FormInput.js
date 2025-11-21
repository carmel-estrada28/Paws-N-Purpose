

import "./FormInput.css";



export default function FormInput({placeholder, type}) {
  return (
    <input 
    className="formInput_input"
    type={ type }
    placeholder={ placeholder }
    />
  );
}