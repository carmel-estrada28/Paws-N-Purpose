

import "../../styles/ButtonThemes.css"
import { Loader2 } from "lucide-react";
import { useRef } from "react";

export default function Button({
  type="submit", text, loadingText,
  vPadding=0, hPadding=0, height, width, 
  theme, onClick, isLoading=false, disabled
}) {

  return (
    <button 
      className={`${theme} ripple-container`}
      style={{
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
    >
        {isLoading && 
          <Loader2 
            style={{ 
              animation: "spin 1s linear infinite",
              width: "1.2rem"
            }}
          />
        }
        {isLoading ? loadingText : text}
    </button>
  );
}
