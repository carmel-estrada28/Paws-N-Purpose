
import "../../styles/ButtonThemes.css"

export default function Button({type="submit", text, vPadding=0, hPadding=0, theme}) {
  return (
    <button 
    className={theme}
    style={{
      padding: `${vPadding}rem ${hPadding}rem`
    }}
    type={type}>
        {text}
    </button>
  );
}