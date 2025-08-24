import { cn } from "@/@utils/utils";


interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  sticky?: boolean;
}

export function Header({ children, sticky = true, className, ...props }: HeaderProps) {
  return (
    <header 
      className={cn(
        "bg-white border border-gray-200 rounded-full shadow-sm",
        sticky && "sticky top-3 z-20",
        className
      )}
      {...props}
    >
      <div className="px-4 lg:px-6 h-20 flex items-center">
        {children}
      </div>
    </header>
  );
}