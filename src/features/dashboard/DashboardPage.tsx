import {
  DiagnosisHistoryPoint,
  fetchJessica,
} from "@/@services/api/patientService";
import { DiagnosticList } from "./components/DiagnosticList";
import { KPICard } from "./components/KPICard";
import { LabResultsPanel } from "./components/LabResultsPanel";
import { PatientProfilePanel } from "./components/PatientProfilePanel";
import { SidebarPatientList } from "./components/SidebarPatientList";
import { PatientChart } from "./PatientChart";

// Layout modeling the provided dashboard screenshot
export default async function DashboardPage({
  patientId,
}: {
  patientId?: string;
}) {
  // TODO: Derive these labels and datasets from real patient vitals history when API clarified
  const jessica = await fetchJessica();
  const history: DiagnosisHistoryPoint[] =
    (jessica?.diagnosis_history as DiagnosisHistoryPoint[]) || [];
  const labels = history.map((h) => h.month).filter((m): m is string => !!m);
  const systolic = history
    .map((h) => h.systolic)
    .filter((n): n is number => typeof n === "number");
  const diastolic = history
    .map((h) => h.diastolic)
    .filter((n): n is number => typeof n === "number");
  const datasets = [
    { label: "Systolic", data: systolic, color: "#7E6CAB" },
    { label: "Diastolic", data: diastolic, color: "#5B8DEF" },
  ];

  return (
    <div
      className="grid gap-6 xl:gap-8 w-full 2xl:gap-10"
      style={{ gridTemplateColumns: "280px 1fr 300px" }}
    >
      {/* Left Sidebar */}
      <aside className="hidden lg:flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm h-[calc(100vh-160px)] sticky top-28 overflow-hidden">
        <SidebarPatientList activeId={patientId} />
      </aside>

      {/* Main Content */}
      <main className="flex flex-col gap-6 xl:gap-8">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4 md:p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base md:text-lg font-semibold tracking-tight text-gray-800">
              Diagnosis History
            </h2>
            <div className="text-xs text-gray-500">Last 6 months</div>
          </div>
          <div className="rounded-xl bg-violet-50 p-4">
            <PatientChart
              labels={labels}
              datasets={datasets}
              heightClass="h-56"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <KPICard
              title="Respiratory Rate"
              value="20 bpm"
              subtitle="Normal"
              tone="blue"
            />
            <KPICard
              title="Temperature"
              value="98.6°F"
              subtitle="Normal"
              tone="red"
            />
            <KPICard
              title="Heart Rate"
              value="78 bpm"
              subtitle="Lower than Average"
              tone="pink"
            />
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm h-[420px] flex flex-col">
          <DiagnosticList />
        </div>
      </main>

      {/* Right Column */}
      <aside className="hidden xl:flex flex-col gap-6 xl:gap-8">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm h-[520px] overflow-hidden">
          <PatientProfilePanel id={patientId} />
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm h-[360px] overflow-hidden">
          <LabResultsPanel />
        </div>
      </aside>
    </div>
  );
}
