"use client";
import { DiagnosisHistoryPoint } from "@/@services/api/patientService";
import Image from "next/image";
import Heart from '@/@assets/HeartBPM.png';
import Respiratory from '@/@assets/respiratoryRate.png';
import Temperature from '@/@assets/temperature.png';
import { usePatientStore } from "@/@stores/patientStore";
import { useEffect, useMemo } from "react";
import { DiagnosticList } from "./components/DiagnosticList";
import { KPICard } from "./components/KPICard";
import { LabResultsPanel } from "./components/LabResultsPanel";
import { PatientProfilePanel } from "./components/PatientProfilePanel";
import { SidebarPatientList } from "./components/SidebarPatientList";
import { PatientChart } from "./PatientChart";

export default function DashboardPage() {
  const { selected, ensureSelected } = usePatientStore();
  useEffect(() => {
    ensureSelected();
  }, [ensureSelected]);

  const history: DiagnosisHistoryPoint[] = useMemo(
    () =>
      (selected?.diagnosis_history as DiagnosisHistoryPoint[] | undefined) ||
      [],
    [selected?.diagnosis_history]
  );
  // Fixed months per design reference (Oct 2023 - Mar 2024)
  const labels = [
    "Oct 2023",
    "Nov 2023",
    "Dec 2023",
    "Jan 2024",
    "Feb 2024",
    "Mar 2024",
  ];
  // Build a lookup from month label (normalized) to readings
  function normalize(m?: string) {
    return (m || '').replace(/,/g, '').trim().toLowerCase();
  }
  const byMonth = new Map<string, { sys?: number; dia?: number }>();
  history.forEach((pt) => {
    const key = normalize(pt.month);
    if (!key) return;
    const entry = byMonth.get(key) || {};
    if (typeof pt.systolic === 'number') entry.sys = pt.systolic;
    if (typeof pt.diastolic === 'number') entry.dia = pt.diastolic;
    byMonth.set(key, entry);
  });
  const systolic: (number | null)[] = [];
  const diastolic: (number | null)[] = [];
  labels.forEach((label) => {
    const key = normalize(label);
    const entry = byMonth.get(key);
    systolic.push(entry?.sys ?? null);
    diastolic.push(entry?.dia ?? null);
  });
  const datasets = [
    { label: 'Systolic', data: systolic, color: '#7E6CAB' },
    { label: 'Diastolic', data: diastolic, color: '#5B8DEF' },
  ];

  return (
    <div
      className="grid gap-6 xl:gap-8 w-full 2xl:gap-10"
      style={{ gridTemplateColumns: "280px 1fr 300px" }}
    >
      <aside className="hidden lg:flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm h-[calc(100vh-160px)] sticky top-28 overflow-hidden">
        <SidebarPatientList />
      </aside>
      <main className="flex flex-col gap-6 xl:gap-8">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 md:p-7 flex flex-col gap-5">
          <header className="flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="text-[17px] md:text-[18px] font-semibold tracking-tight text-slate-900">
                Diagnosis History
              </h2>
              <p className="text-[12px] text-slate-500 max-w-md">
                Blood pressure trends over the last 6 months. Values outside the normal range are highlighted.
              </p>
            </div>
            <button className="text-[11px] inline-flex items-center gap-1 rounded-full bg-slate-100 hover:bg-slate-200 px-3 py-1 font-medium text-slate-600">
              Last 6 months <span className="text-[10px]">▼</span>
            </button>
          </header>
          <div className="rounded-xl bg-violet-50/70 p-4 md:p-5 border border-violet-100 flex flex-col gap-4">
            <div className="flex items-center justify-between text-[13px] font-medium text-slate-700">
              <span className="inline-flex items-center gap-2">
                Blood Pressure
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex-1">
                <PatientChart
                  labels={labels}
                  datasets={datasets}
                  heightClass="h-56 md:h-60"
                  yMin={60}
                  yMax={180}
                />
              </div>
              <div className="w-full md:w-56 flex flex-col gap-5 text-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[12px] font-medium text-slate-700">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#7E6CAB]"></span>
                    Systolic
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
                    Diastolic
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
          <div className="grid md:grid-cols-3 gap-5">
            <KPICard
              title="Respiratory Rate"
              value="20 bpm"
              subtitle="Normal"
              tone="blue"
              media={<Image src={Heart} alt="Heart Rate" />}
              className="bg-[#E0F3FA]"
            />
            <KPICard
              title="Temperature"
              value="98.6°F"
              subtitle="Normal"
              tone="red"
              className="bg-[#FFE6E9]"
              media={<Image src={Temperature} alt="Temperature" />}
            />
            <KPICard
              title="Heart Rate"
              value="78 bpm"
              subtitle="Lower than Average"
              media={<Image src={Respiratory} alt="Respiratory Rate" />}
              tone="pink"
              className="bg-[#FFE6F1]"
            />
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm h-[420px] flex flex-col">
          <DiagnosticList />
        </div>
      </main>
      <aside className="hidden xl:flex flex-col gap-6 xl:gap-8">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm h-[520px] overflow-hidden">
          <PatientProfilePanel />
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm h-[360px] overflow-hidden">
          <LabResultsPanel />
        </div>
      </aside>
    </div>
  );
}
