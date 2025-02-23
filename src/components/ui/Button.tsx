export function Button({ children, onClick, className = "", variant = "default", ...props }: Readonly<{
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: "default" | "ghost";
}>
) {
  const variants = {
    default: "text-white",
    ghost: "bg-transparent hover:bg-gray-700 text-white",
  };
  
  const handleClick = () => {
    onClick();
  }

  return (
    <button
      className={`px-4 py-2 rounded-md transition ${variants[variant]} ${className}`}
      {...props} onClick={handleClick}
    >
      {children}
    </button>
  );
}
