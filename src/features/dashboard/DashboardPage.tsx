"use client";
import Heart from "@/@assets/HeartBPM.png";
import Respiratory from "@/@assets/respiratoryRate.png";
import Temperature from "@/@assets/temperature.png";
import { DASHBOARD_TEXT } from "@/@contents/dashboardText";
import { DiagnosisHistoryPoint } from "@/@services/api/patientService";
import { usePatientStore } from "@/@stores/patientStore";
import {
  deriveVitalStatuses,
  latestValue,
  parseDiagnosisHistory,
  summarizeBloodPressure,
} from "@/@utils/vitals";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { PatientChart } from "../../@components/PatientHistory/PatientChart";
import { DiagnosticList } from "./components/DiagnosticList";
import { KPICard } from "./components/KPICard";
import { LabResultsPanel } from "./components/LabResultsPanel";
import { PatientProfilePanel } from "./components/PatientProfilePanel";
import { SidebarPatientList } from "./components/SidebarPatientList";
import BloodPressureHistory from "@/@components/PatientHistory/BloodPressureHistory";

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
  const parsed = useMemo(() => parseDiagnosisHistory(history), [history]);
  const latestResp = useMemo(
    () => latestValue(parsed, (p) => p.respiratory),
    [parsed]
  );
  const latestTemp = useMemo(
    () => latestValue(parsed, (p) => p.temperature),
    [parsed]
  );
  const latestHeart = useMemo(
    () => latestValue(parsed, (p) => p.heart),
    [parsed]
  );
  const { respiratoryStatus, tempStatus, heartStatus } = useMemo(
    () => deriveVitalStatuses(latestResp, latestTemp, latestHeart),
    [latestResp, latestTemp, latestHeart]
  );

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
                {DASHBOARD_TEXT.diagnosisHistoryTitle}
              </h2>
              <p className="text-[12px] text-slate-500 max-w-md">
                {DASHBOARD_TEXT.diagnosisHistoryDescription}
              </p>
            </div>
            <button className="text-[11px] inline-flex items-center gap-1 rounded-full bg-slate-100 hover:bg-slate-200 px-3 py-1 font-medium text-slate-600">
              {DASHBOARD_TEXT.lastMonthsLabel}{" "}
              <span className="text-[10px]">▼</span>
            </button>
          </header>
         <BloodPressureHistory parsed={parsed} />
          <div className="grid md:grid-cols-3 gap-5">
            <KPICard
              title={DASHBOARD_TEXT.metrics.respiratory}
              value={latestResp != null ? `${latestResp} bpm` : "—"}
              subtitle={respiratoryStatus}
              tone="blue"
              media={<Image src={Respiratory} alt="Respiratory Rate" />}
              className="bg-[#E0F3FA]"
            />
            <KPICard
              title={DASHBOARD_TEXT.metrics.temperature}
              value={latestTemp != null ? `${latestTemp.toFixed(1)}°F` : "—"}
              subtitle={tempStatus}
              tone="red"
              className="bg-[#FFE6E9]"
              media={<Image src={Temperature} alt="Temperature" />}
            />
            <KPICard
              title={DASHBOARD_TEXT.metrics.heart}
              value={latestHeart != null ? `${latestHeart} bpm` : "—"}
              subtitle={heartStatus}
              media={<Image src={Heart} alt="Heart Rate" />}
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
