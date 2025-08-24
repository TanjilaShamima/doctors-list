"use client";
import Heart from "@/@assets/HeartBPM.png";
import Respiratory from "@/@assets/respiratoryRate.png";
import Temperature from "@/@assets/temperature.png";
import { KPICard } from "@/@components/common/KPICard";
import { Skeleton } from "@/@components/common/Skeleton";
import BloodPressureHistory from "@/@components/PatientHistory/BloodPressureHistory";
import { DiagnosticList } from "@/@components/PatientHistory/DiagnosticList";
import { LabResultsPanel } from "@/@components/PatientHistory/LabResultsPanel";
import { PatientProfilePanel } from "@/@components/PatientHistory/PatientProfilePanel";
import { SidebarPatientList } from "@/@components/SidebarPatient/SidebarPatientList";
import { DASHBOARD_TEXT } from "@/@contents/dashboardText";
import { usePatientStore } from "@/@stores/patientStore";
import type { DiagnosisHistoryPoint } from "@/@types/patient";
import {
  deriveVitalStatuses,
  latestValue,
  parseDiagnosisHistory,
} from "@/@utils/vitals";
import Image from "next/image";
import { useEffect, useMemo } from "react";

export default function DashboardPage() {
  const { selected, ensureSelected, loading, initialized } = usePatientStore();
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

  console.log("parsed", parsed);

  // (Removed dynamic height adjustment logic to simplify; reintroduce if needed.)

  //   const asideHeightClass = shortH
  //     ? "h-[calc(100vh-120px)]"
  //     : "h-[calc(100vh-160px)]"; // matches left sidebar baseline

  return (
    <div
      className="grid gap-6 xl:gap-8 w-full 2xl:gap-10"
      style={{ gridTemplateColumns: "280px 1fr 300px" }}
    >
      <aside className="hidden lg:flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm h-[calc(100vh-160px)] sticky top-28 overflow-hidden">
        <SidebarPatientList />
      </aside>
      <main className="flex flex-col gap-6 xl:gap-8">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm px-5 pt-5 pb-8 flex flex-col gap-5">
          <header className="flex items-start justify-between">
            <div className="space-y-1">
              {(!initialized || loading) && !selected ? (
                <Skeleton className="h-7 w-56" />
              ) : (
                <h2 className="text-base md:text-2xl font-semibold tracking-tight text-brand-deep">
                  {DASHBOARD_TEXT.diagnosisHistoryTitle}
                </h2>
              )}
            </div>
          </header>
          {(!initialized || loading) && !selected && (
            <div className="space-y-6">
              <Skeleton className="h-64 w-full rounded-xl" />
              <div className="grid md:grid-cols-3 gap-5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-200 p-5 bg-white"
                  >
                    <div className="flex items-center mb-4">
                      <Skeleton className="h-24 w-24 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-8 w-24 mb-4" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            </div>
          )}
          {initialized && !loading && (
            <>
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
                  value={
                    latestTemp != null ? `${latestTemp.toFixed(1)}°F` : "—"
                  }
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
            </>
          )}
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm h-[420px] flex flex-col">
          <DiagnosticList />
        </div>
      </main>
      <aside className={`hidden xl:flex flex-col gap-6 xl:gap-8 sticky top-28`}>
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm flex-none overflow-hidden max-h-auto">
          <PatientProfilePanel />
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm flex-1 h-[450px] overflow-hidden">
          {/* Internal scroll only for lab results list */}
          <div className="h-full flex flex-col">
            <LabResultsPanel />
          </div>
        </div>
      </aside>
    </div>
  );
}
