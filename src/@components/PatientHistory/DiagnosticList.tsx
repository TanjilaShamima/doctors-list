import { usePatientStore } from "@/@stores/patientStore";
import { useMemo } from "react";

export function DiagnosticList() {
  const { selected } = usePatientStore();

  const diagnosticList = useMemo(
    () => selected?.diagnostic_list || [],
    [selected?.diagnostic_list]
  );
  return (
    <div className="flex flex-col h-full px-5">
      <div className="text-2xl font-semibold text-brand-deep pt-5 pb-8">
        Diagnostic List
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="ring-1 ring-gray-200 bg-white text-sm">
          {/* Header bar with rounded corners */}
          <div className="sticky top-0 z-10 bg-gray-100 rounded-3xl px-4 py-4 font-semibold text-brand-deep grid grid-cols-[30%_50%_20%]">
            <div>Problem/Diagnosis</div>
            <div>Description</div>
            <div>Status</div>
          </div>
          {/* Data rows aligned via same grid template */}
          <div className="divide-y divide-gray-100">
            {diagnosticList.map((item) => (
              <div
                key={item.name}
                className="grid grid-cols-[30%_50%_20%] px-4 py-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-2 font-normal text-brand-deep">
                  {item.name}
                </div>
                <div className="text-brand-deep">{item.description}</div>
                <div className="flex items-center">
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-sm font-medium text-brand-deep">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
