import { Suspense } from "react";
import { PatientChart } from "./PatientChart";
import { PatientList } from "./PatientList";

// Server component wrapper for dashboard sections
export default async function DashboardPage() {
  // Fake chart data until real metrics decided (e.g., patients per month)
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const values = [4, 6, 9, 3, 7, 11, 8, 10];
  return (
    <div className="flex flex-col gap-6 w-full">
      <section className="grid gap-6 md:grid-cols-3">
        <div className="col-span-2 p-4 rounded border bg-white shadow-sm min-h-80 flex flex-col">
          <h2 className="font-semibold mb-2 text-lg">Patients Trend</h2>
          <PatientChart labels={labels} values={values} />
        </div>
        <div className="p-4 rounded border bg-white shadow-sm flex flex-col justify-center">
          <h2 className="font-semibold mb-4 text-lg">Stats</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Total Patients</span>
              <span className="font-semibold">--</span>
            </li>
            <li className="flex justify-between">
              <span>Active</span>
              <span className="font-semibold">--</span>
            </li>
            <li className="flex justify-between">
              <span>New (30d)</span>
              <span className="font-semibold">--</span>
            </li>
          </ul>
        </div>
      </section>
      <section className="p-4 rounded border bg-white shadow-sm">
        <h2 className="font-semibold mb-4 text-lg">Patients</h2>
        <Suspense fallback={<div>Loading patients...</div>}>
          <PatientList />
        </Suspense>
      </section>
    </div>
  );
}
