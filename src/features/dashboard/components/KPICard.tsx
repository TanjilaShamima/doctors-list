interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  tone?: "blue" | "red" | "pink";
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
}: KPICardProps) {
  return (
    <div
      className={`flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm`}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div
            className={`h-12 w-12 flex items-center justify-center rounded-full ring-4 ${toneMap[tone]}`}
          >
            {icon}
          </div>
        )}
        <div className="ml-auto text-right"></div>
      </div>
      <div className="mt-4 text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
      {subtitle && <div className="mt-1 text-xs text-gray-500">{subtitle}</div>}
    </div>
  );
}
