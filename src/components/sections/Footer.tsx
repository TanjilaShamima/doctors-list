import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  year?: number;
}

export function Footer({ year = new Date().getFullYear(), className, ...props }: FooterProps) {
  return (
    <footer 
      className={cn("p-4 text-center text-xs text-gray-500", className)}
      {...props}
    >
      {t('footer.copyright', 'en', { year })}
    </footer>
  );
}