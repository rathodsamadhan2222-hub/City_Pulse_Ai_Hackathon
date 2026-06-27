export default function MaterialIcon({ icon, filled = false, className = '', style = {} }) {
  return (
    <span
      className={`material-symbols-outlined ${filled ? 'fill-icon' : ''} ${className}`}
      style={{ ...style, ...(filled ? { fontVariationSettings: "'FILL' 1" } : {}) }}
    >
      {icon}
    </span>
  );
}
