import { DASHBOARD_TEXT } from "@/@contents/dashboardText";
import { ParsedPoint } from "@/@types/vitals";
import { summarizeBloodPressure } from "@/@utils/vitals";
import { useMemo } from "react";
import { PatientChart } from "./PatientChart";

interface Props {
  parsed: ParsedPoint[];
}

const BloodPressureHistory = ({ parsed }: Props) => {
  // Use only real parsed data from API (no static fallback)
  // Show only the last 6 chronological points (months)
  const lastSix = useMemo(() => {
    if (!parsed.length) return parsed;
    const sorted = [...parsed].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    return sorted.slice(-6);
  }, [parsed]);

  const { labels, systolic, diastolic, datasets } = useMemo(
    () => summarizeBloodPressure(lastSix),
    [lastSix]
  );
  return (
    <div className="rounded-xl bg-violet-50/70 p-4 md:p-5 border border-violet-100 flex flex-col gap-4">
      <div className="relative flex items-center text-[13px] font-medium text-slate-700 min-h-[24px]">
        <span className="inline-flex items-center gap-2 pr-4">
          {DASHBOARD_TEXT.bloodPressureLabel}
        </span>
        <span className="absolute left-1/2 -translate-x-1/2 text-[12px] font-medium text-slate-700 inline-flex items-center gap-1">
          {DASHBOARD_TEXT.lastMonthsLabel}{" "}
          <span className="text-[10px]">▼</span>
        </span>
      </div>
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="flex-1">
          <PatientChart
            labels={labels}
            datasets={datasets}
            heightClass="h-56 md:h-60"
            yMin={40}
            yMax={220}
          />
        </div>
        <div className="w-full md:w-32 flex flex-col gap-5 text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[12px] font-medium text-slate-700">
              <span className="h-2.5 w-2.5 rounded-full bg-[#7E6CAB]"></span>
              {DASHBOARD_TEXT.systolicLabel}
            </div>
            <div className="mt-0.5 text-[26px] leading-none font-semibold text-slate-900">
              {systolic.at(-1) ?? "—"}
            </div>
            <div className="mt-1 text-[11px] text-pink-600 flex items-center gap-1 font-medium">
              ▲ Higher than Average
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[12px] font-medium text-slate-700">
              <span className="h-2.5 w-2.5 rounded-full bg-[#5B8DEF]"></span>
              {DASHBOARD_TEXT.diastolicLabel}
            </div>
            <div className="mt-0.5 text-[26px] leading-none font-semibold text-slate-900">
              {diastolic.at(-1) ?? "—"}
            </div>
            <div className="mt-1 text-[11px] text-emerald-600 flex items-center gap-1 font-medium">
              ▼ Lower than Average
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodPressureHistory;
