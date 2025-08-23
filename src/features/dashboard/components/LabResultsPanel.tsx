interface LabCategory {
  name: string;
  downloadable?: boolean;
}

const labs: LabCategory[] = [
  { name: "Blood Tests", downloadable: true },
  { name: "CT Scans", downloadable: true },
  { name: "Radiology Reports", downloadable: true },
  { name: "X-Rays", downloadable: true },
  { name: "Urine Test", downloadable: true },
];

export function LabResultsPanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 pb-2 font-semibold text-gray-800 text-sm">
        Lab Results
      </div>
      <ul className="flex-1 overflow-y-auto divide-y divide-gray-100">
        {labs.map((l) => (
          <li
            key={l.name}
            className="flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50"
          >
            <span className="truncate text-gray-700">{l.name}</span>
            {l.downloadable && (
              <button
                className="text-gray-400 hover:text-gray-600 text-xs"
                title="Download"
              >
                ⇩
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
