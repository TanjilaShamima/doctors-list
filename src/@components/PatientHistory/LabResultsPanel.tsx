import { LAB_CATEGORIES } from "@/@contents/labs";
import { Download } from "lucide-react";

export function LabResultsPanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 pb-2 font-semibold text-gray-800 text-sm">
        Lab Results
      </div>
      <ul className="flex-1 overflow-y-auto divide-y divide-gray-100">
        {LAB_CATEGORIES.map((l) => (
          <li
            key={l.name}
            className="flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50"
          >
            <span className="truncate text-gray-700 flex items-center gap-2">
              <span className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                {l.Icon ? <l.Icon className="h-4 w-4" /> : null}
              </span>
              {l.name}
            </span>
            {l.downloadable && (
              <button
                className="text-gray-400 hover:text-gray-600 text-xs flex items-center"
                title="Download"
              >
                <Download className="h-4 w-4" />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
