import { DASHBOARD_TEXT } from "@/@contents/dashboardText";
import { cn } from "@/@utils/utils";


interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  year?: number;
}

export function Footer({ year = new Date().getFullYear(), className, ...props }: FooterProps) {
  return (
    <footer 
      className={cn("p-4 text-center text-xs text-gray-500", className)}
      {...props}
    >
      {DASHBOARD_TEXT.footer.replace('{year}', year.toString())}
    </footer>
  );
}