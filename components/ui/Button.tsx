import Link from 'next/link';
import { cn } from '@/lib/utils'; // We'll need to create this util or just use template literals if simple

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  href, 
  size = 'md', 
  children, 
  className = '',
  icon,
  ...props 
}: ButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40",
    outline: "border border-white/10 bg-white/5 hover:bg-white/10 text-white hover:border-white/20 backdrop-blur-sm",
    ghost: "text-gray-400 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "text-xs px-4 py-2 gap-2",
    md: "text-sm px-6 py-3 gap-2.5",
    lg: "text-base px-8 py-4 gap-3",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
        {icon && <span className="group-hover:translate-x-1 transition-transform">{icon}</span>}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
      {icon && <span className="group-hover:translate-x-1 transition-transform">{icon}</span>}
    </button>
  );
}
