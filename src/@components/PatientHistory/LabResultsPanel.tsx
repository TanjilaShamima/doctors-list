import { usePatientStore } from "@/@stores/patientStore";
import { Download } from "lucide-react";
import { useMemo } from "react";

export function LabResultsPanel() {
  const { selected } = usePatientStore();

  const labs = useMemo(
    () => selected?.lab_results || [],
    [selected?.lab_results]
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 pb-2 font-semibold text-gray-800 text-sm">
        <h2 className="text-base md:text-2xl font-semibold tracking-tight text-brand-deep">
          Lab Results
        </h2>
      </div>
      {(!selected || !labs.length) && (
        <div className="px-4 py-6 text-xs text-brand-deep">
          No lab results available.
        </div>
      )}
      {labs.length > 0 && (
        <ul className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {labs.map((lab, index) => (
            <li
              key={index}
              className="flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50"
            >
              <span className="truncate text-brand-deep flex items-center gap-2">
                {lab}
              </span>

              <button
                className="text-gray-400 hover:text-gray-600 text-xs flex items-center"
                title="Download"
              >
                <Download className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
