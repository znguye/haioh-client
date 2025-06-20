export function Button({ children, onClick, className = "", ...props }) {
  return (
    <button
      onClick={onClick}
      className={`p-1 rounded-full border text-xs ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
