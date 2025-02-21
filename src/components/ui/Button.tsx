export function Button({ children, className = "", variant = "default", ...props }: Readonly<{
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "ghost";
}>
) {
  const variants = {
    default: "text-white",
    ghost: "bg-transparent hover:bg-gray-700 text-white",
  };

  return (
    <button
      className={`px-4 py-2 rounded-md transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
