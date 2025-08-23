import {
  Download,
  FileImage,
  FileText,
  FlaskConical,
  ScanLine,
  TestTube,
} from "lucide-react";

interface LabCategory {
  name: string;
  downloadable?: boolean;
  icon?: React.ReactNode;
}

const labs: LabCategory[] = [
  {
    name: "Blood Tests",
    downloadable: true,
    icon: <FlaskConical className="h-4 w-4" />,
  },
  {
    name: "CT Scans",
    downloadable: true,
    icon: <ScanLine className="h-4 w-4" />,
  },
  {
    name: "Radiology Reports",
    downloadable: true,
    icon: <FileText className="h-4 w-4" />,
  },
  {
    name: "X-Rays",
    downloadable: true,
    icon: <FileImage className="h-4 w-4" />,
  },
  {
    name: "Urine Test",
    downloadable: true,
    icon: <TestTube className="h-4 w-4" />,
  },
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
            <span className="truncate text-gray-700 flex items-center gap-2">
              <span className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                {l.icon}
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
