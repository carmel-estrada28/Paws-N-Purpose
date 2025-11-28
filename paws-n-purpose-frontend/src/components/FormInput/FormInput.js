

import "./FormInput.css";



export default function FormInput({placeholder, type, name, onChange, value, error, inputRef}) {
  return (
    <div className="formInput_input-container">
      <input 
        className="formInput_input"
        type={ type }
        placeholder={ placeholder }
        ref={ inputRef }
        name={ name }
        value={ value }
        onChange={ onChange }
        style={error ? {boxShadow: "0 0 0 1px #B3261E inset"} : {}}
      />

      {error && 
      <div className="formInput_errors-container">
        <svg style={{ fill: "#B3261E" }} xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="0.8rem" height="0.8rem">
          <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"/>
          <path d="M12,5a1,1,0,0,0-1,1v8a1,1,0,0,0,2,0V6A1,1,0,0,0,12,5Z"/>
          <rect x="11" y="17" width="2" height="2" rx="1"/>
        </svg>
        <p style={{ fontSize: "0.85rem", color: "#B3261E" }}>{error}</p>
      </div>
      }
    </div>
    
  );
}