
import './SearchBox.css';

export default function SearchBox({ value, onChange, placeholder = "Search campaigns" }) {
  return (
    <div className="search-box">
      <div className="search-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="#053534" strokeOpacity="0.5" strokeWidth="2"/>
          <path d="m21 21-4.35-4.35" stroke="#053534" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
}