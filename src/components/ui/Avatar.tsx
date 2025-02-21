export function Avatar({ size = "md", className = "" } : Readonly<{ size?: "sm" | "md" | "lg"; className?: string; }>) {

  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div
      className={`rounded-full bg-gray-600 flex items-center justify-center text-white ${sizes[size]} ${className}`}
    >
      👤
    </div>
  );
}
