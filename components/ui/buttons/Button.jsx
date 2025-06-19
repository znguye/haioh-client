export function Button({ children, onClick, className = "", ...props }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md border text-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
