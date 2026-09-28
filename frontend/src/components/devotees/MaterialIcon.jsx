/** Google Material Symbols (loaded in public/index.html) */
export default function MaterialIcon({ name, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`.trim()} aria-hidden="true">
      {name}
    </span>
  );
}
