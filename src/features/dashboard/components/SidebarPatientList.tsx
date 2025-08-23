import { getPatients, Patient } from "@/@services/api/patientService";

export async function SidebarPatientList({ activeId }: { activeId?: string }) {
  let patients: Patient[] = [];
  try {
    patients = await getPatients();
  } catch {
    return <div className="p-4 text-sm text-red-600">Failed to load.</div>;
  }
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 font-semibold text-gray-800">Patients</div>
      <div className="px-4 pb-2">
        <input
          placeholder="Search"
          className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <ul className="flex-1 overflow-y-auto thin-scroll pr-1 space-y-1">
        {patients.map((p) => {
          const selected = p.id === activeId;
          return (
            <li
              key={p.id}
              className={`group relative rounded-lg pl-4 pr-2 py-2 flex items-center gap-3 cursor-pointer text-sm ${
                selected
                  ? "bg-teal-50 ring-1 ring-teal-200"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                {p.first_name.charAt(0)}
                {p.last_name.charAt(0)}
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-medium truncate text-gray-800">
                  {p.first_name} {p.last_name}
                </span>
                <span className="text-[11px] text-gray-500 truncate">
                  {p.gender || "—"},{" "}
                  {p.date_of_birth
                    ? new Date(p.date_of_birth).getFullYear()
                    : ""}
                </span>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-gray-600 p-1">
                •••
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
