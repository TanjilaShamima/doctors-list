interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  tone?: "blue" | "red" | "pink";
  className?: string;
  media?: React.ReactNode; // image or custom visual in circle
}

const toneMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-900 ring-blue-100",
  red: "bg-rose-50 text-rose-900 ring-rose-100",
  pink: "bg-pink-50 text-pink-900 ring-pink-100",
};

export function KPICard({
  title,
  value,
  subtitle,
  icon,
  tone = "blue",
  className,
  media,
}: KPICardProps) {
  return (
    <div
      className={`flex flex-col rounded-xl border border-gray-200 p-5 shadow-sm ${className}`}
    >
      <div className="flex items-center mb-4">
        {(icon || media) && (
          <div
            className={`h-24 w-24 flex items-center justify-center rounded-full ring-4 ${toneMap[tone]}`}
          >
            {media || icon}
          </div>
        )}
      </div>
      <div className="text-base font-normal text-brand-deep">{title}</div>
      <div className="text-3xl leading-tight font-extrabold tracking-tight text-brand-deep">
        {value}
      </div>
      {subtitle && (
        <div className="mt-4 text-sm text-brand-deep">{subtitle}</div>
      )}
    </div>
  );
}
