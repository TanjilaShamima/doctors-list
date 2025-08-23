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
      <div className="flex items-center mb-3">
        {(icon || media) && (
          <div
            className={`h-14 w-14 flex items-center justify-center rounded-full ring-4 ${toneMap[tone]}`}
          >
            {media || icon}
          </div>
        )}
      </div>
      <div className="text-[13px] font-medium text-gray-600">{title}</div>
      <div className="mt-1 text-[26px] leading-tight font-semibold tracking-tight text-gray-900">
        {value}
      </div>
      {subtitle && (
        <div className="mt-1 text-[11px] text-gray-500">{subtitle}</div>
      )}
    </div>
  );
}
