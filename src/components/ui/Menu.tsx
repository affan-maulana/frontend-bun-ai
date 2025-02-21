import { useState, useRef } from "react";

export function Menu({ children } : Readonly<{ children: React.ReactNode[] }>) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{children[0]}</div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
          <div className="py-1">{children.slice(1)}</div>
        </div>
      )}
    </div>
  );
}

export function MenuItem({ children, onClick }  : Readonly<{ children: React.ReactNode; onClick: () => void }>) {
  return (
    <button
      onClick={onClick}
      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
    >
      {children}
    </button>
  );
}

export function MenuButton({ as: Component = "button", className = "", children, ...props } : Readonly<{ as: React.ElementType; className?: string; children: React.ReactNode }>) {
  return (
    <Component className={`px-4 py-2 flex items-center gap-2 text-white cursor-pointer ${className}`} {...props}>
      {children}
    </Component>
  );
}
