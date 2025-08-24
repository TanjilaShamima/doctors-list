import { usePatientStore } from "@/@stores/patientStore";
import { Activity, AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { useMemo } from "react";

export function DiagnosticList() {
  const { selected } = usePatientStore();

  const diagnosticList = useMemo(
    () => selected?.diagnostic_list || [],
    [selected?.diagnostic_list]
  );
  return (
    <div className="flex flex-col h-full">
      <div className="text-sm font-semibold text-gray-800 p-4 pb-2">
        Diagnostic List
      </div>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-white shadow-sm">
            <tr className="text-left text-[13px] text-gray-500">
              <th className="px-4 py-2 font-medium">Problem/Diagnosis</th>
              <th className="px-4 py-2 font-medium">Description</th>
              <th className="px-4 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {diagnosticList.map((item) => {
              const statusIcon =
                item.status === "Cured" ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                ) : item.status === "Under Observation" ? (
                  <Activity className="h-3.5 w-3.5 text-amber-500" />
                ) : item.status === "Inactive" ? (
                  <ShieldCheck className="h-3.5 w-3.5 text-gray-400" />
                ) : (
                  <AlertCircle className="h-3.5 w-3.5 text-gray-400" />
                );
              return (
                <tr
                  key={item.name}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-2 font-medium text-gray-800 flex items-center gap-2">
                    {statusIcon}
                    {item.name}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {item.description}
                  </td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">
                      {item.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
