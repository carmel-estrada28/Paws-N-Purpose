

import "../../styles/ButtonThemes.css"
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";

export default function Button({
  type="submit", text, loadingText,
  vPadding=0, hPadding=0, height, width, 
  theme, onClick, isLoading=false, disabled, 
  hasRippleEffect=false, rippleEffectTheme
}) {

  // useStates
  const [isPressed, setIsPressed] = useState(false);
  
  // useRefs
  const rippleRef = useRef(null);

  // functions

  return (
    <button 
      className={`${theme} ripple-container`}
      style={{
        position: "relative",
        padding: `${vPadding}rem ${hPadding}rem`,
        width: `${width}`,
        height: `${height}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem"
      }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
        {isLoading && 
          <Loader2 
            style={{ 
              animation: "spin 1s linear infinite",
              width: "1.2rem"
            }}
          />
        }
        
        {hasRippleEffect && 
          <span 
            ref={rippleRef}
            className={`ripple-effect ${rippleEffectTheme} ${isPressed ? "active" : "fade"}`}
          />
        }

        {isLoading ? loadingText : text}
        
    </button>
  );
}
