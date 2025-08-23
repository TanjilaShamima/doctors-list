import { getPatients, Patient } from "@/@services/api/patientService";

export async function PatientList() {
  let patients: Patient[] = [];
  try {
    patients = await getPatients();
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return (
      <div className="p-4 text-red-600">Failed to load patients: {message}</div>
    );
  }
  return (
    <div className="overflow-x-auto rounded border border-gray-200 shadow-sm bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-600 font-semibold">
          <tr>
            <th className="px-3 py-2 text-left">Name</th>
            <th className="px-3 py-2 text-left hidden md:table-cell">DOB</th>
            <th className="px-3 py-2 text-left hidden sm:table-cell">Gender</th>
            <th className="px-3 py-2 text-left hidden lg:table-cell">Phone</th>
            <th className="px-3 py-2 text-left hidden xl:table-cell">Email</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr
              key={p.id}
              className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
            >
              <td className="px-3 py-2 font-medium">
                {p.first_name} {p.last_name}
              </td>
              <td className="px-3 py-2 hidden md:table-cell">
                {p.date_of_birth || "-"}
              </td>
              <td className="px-3 py-2 hidden sm:table-cell">
                {p.gender || "-"}
              </td>
              <td className="px-3 py-2 hidden lg:table-cell">
                {p.phone_number || "-"}
              </td>
              <td className="px-3 py-2 hidden xl:table-cell">
                {p.email || "-"}
              </td>
            </tr>
          ))}
          {patients.length === 0 && (
            <tr>
              <td className="px-3 py-4 text-center text-gray-500" colSpan={5}>
                No patients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
