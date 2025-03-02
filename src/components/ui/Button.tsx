export function Button({ children, onClick, className = "", variant = "default", disabled = false, ...props }: Readonly<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "ghost";
  disabled?: boolean;
}>) {
  const variants = {
    default: "text-white",
    ghost: "bg-transparent hover:bg-gray-700 text-white",
  };

  const handleClick = () => {
    if (!disabled && onClick) onClick();
  }

  return (
    <button
      className={`px-4 py-2 rounded-md transition ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      {...props} onClick={handleClick} disabled={disabled}
    >
      {children}
    </button>
  );
}