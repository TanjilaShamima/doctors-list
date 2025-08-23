export interface DiagnosticItem {
  problem: string;
  description: string;
  status: string;
}

// Placeholder static list until API mapping clarified
const sample: DiagnosticItem[] = [
  {
    problem: "Hypertension",
    description: "Chronic high blood pressure",
    status: "Under Observation",
  },
  {
    problem: "Type 2 Diabetes",
    description: "Insulin resistance and elevated blood sugar",
    status: "Cured",
  },
  {
    problem: "Asthma",
    description: "Recurrent episodes of bronchial constriction",
    status: "Inactive",
  },
];

export function DiagnosticList() {
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
            {sample.map((item) => (
              <tr
                key={item.problem}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-2 font-medium text-gray-800">
                  {item.problem}
                </td>
                <td className="px-4 py-2 text-gray-600">{item.description}</td>
                <td className="px-4 py-2">
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
