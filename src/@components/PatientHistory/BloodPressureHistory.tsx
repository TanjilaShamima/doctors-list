import { DASHBOARD_TEXT } from "@/@contents/dashboardText";
import { ParsedPoint } from "@/@types/vitals";
import { summarizeBloodPressure } from "@/@utils/vitals";
import { ChevronDown } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { PatientChart } from "./PatientChart";

interface Props {
  parsed: ParsedPoint[];
}

const BloodPressureHistory = ({ parsed }: Props) => {
  // Range dropdown state
  const [range, setRange] = useState<"2m" | "6m" | "1y">("6m");
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => setOpen((o) => !o), []);
  const selectRange = useCallback((r: "2m" | "6m" | "1y") => {
    setRange(r);
    setOpen(false);
  }, []);

  const filtered = useMemo(() => {
    if (!parsed.length) return parsed;
    const sorted = [...parsed].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    if (range === "2m") return sorted.slice(-2);
    if (range === "6m") return sorted.slice(-6);
    return sorted.slice(-12); // 1 year
  }, [parsed, range]);

  const { labels, systolic, diastolic, datasets } = useMemo(
    () => summarizeBloodPressure(filtered),
    [filtered]
  );
  const rangeLabel =
    range === "2m"
      ? "Last 2 months"
      : range === "6m"
      ? "Last 6 months"
      : "Last 1 year";
  return (
    <div className="rounded-xl bg-violet-50/70 p-4 md:p-5 border border-violet-100 flex flex-col gap-4">
      <div className="relative flex items-center text-base font-medium text-slate-700 min-h-[28px]">
        <span className="inline-flex items-center gap-2 text-lg text-brand-deep font-bold">
          {DASHBOARD_TEXT.bloodPressureLabel}
        </span>
        <button
          type="button"
          onClick={toggleOpen}
          className="absolute left-1/2 -translate-x-1/2 text-sm font-normal text-brand-deep inline-flex items-center gap-2 pb-0.5 hover:text-slate-900 focus:outline-none"
        >
          {rangeLabel}{" "}
          <span className="cursor-pointer">
            <ChevronDown />
          </span>
        </button>
        {open && (
          <ul className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-40 rounded-md border border-violet-100 bg-white shadow-md text-sm font-medium text-slate-700 z-10 overflow-hidden">
            <li>
              <button
                onClick={() => selectRange("2m")}
                className={`w-full text-left px-3 py-2 hover:bg-violet-50 ${
                  range === "2m" ? "text-violet-600" : ""
                }`}
              >
                Last 2 months
              </button>
            </li>
            <li>
              <button
                onClick={() => selectRange("6m")}
                className={`w-full text-left px-3 py-2 hover:bg-violet-50 ${
                  range === "6m" ? "text-violet-600" : ""
                }`}
              >
                Last 6 months
              </button>
            </li>
            <li>
              <button
                onClick={() => selectRange("1y")}
                className={`w-full text-left px-3 py-2 hover:bg-violet-50 ${
                  range === "1y" ? "text-violet-600" : ""
                }`}
              >
                Last 1 year
              </button>
            </li>
          </ul>
        )}
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
        <div className="w-full md:w-42 flex flex-col text-sm">
          <div className="space-y-1 pb-5">
            <div className="flex items-center gap-2 text-sm font-bold text-brand-deep">
              <span className="h-3 w-3 rounded-full bg-bp-systolic"></span>
              {DASHBOARD_TEXT.systolicLabel}
            </div>
            <div className="my-2 text-2xl leading-none font-semibold text-brand-deep">
              {systolic.at(-1) ?? "—"}
            </div>
            <div className=" text-sm text-brand-deep flex items-center gap-1 font-normal">
              ▲ Higher than Average
            </div>
          </div>
          <hr className="border-t border-slate-200 mb-5" />
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-bold text-brand-deep">
              <span className="h-3 w-3 rounded-full bg-bp-diastolic"></span>
              {DASHBOARD_TEXT.diastolicLabel}
            </div>
            <div className="my-2 text-[26px] leading-none font-semibold text-slate-900">
              {diastolic.at(-1) ?? "—"}
            </div>
            <div className="text-sm text-brand-deep flex items-center gap-1 font-normal">
              ▼ Lower than Average
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodPressureHistory;
