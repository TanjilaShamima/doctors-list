"use client";
import { usePatientStore } from "@/@stores/patientStore";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export function SidebarPatientList() {
  const { patients, loadPatients, loading, selectedId, selectPatient, error } =
    usePatientStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!patients.length && !loading) {
      loadPatients();
    }
  }, [patients.length, loading, loadPatients]);

  const filtered = useMemo(() => {
    if (!query) return patients;
    const q = query.toLowerCase();
    return patients.filter((p) =>
      `${p.first_name} ${p.last_name}`.toLowerCase().includes(q)
    );
  }, [patients, query]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 font-semibold text-gray-800">Patients</div>
      <div className="px-4 pb-2">
        <input
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      {error && <div className="px-4 text-xs text-red-600 pb-2">{error}</div>}
      <ul className="flex-1 overflow-y-auto thin-scroll pr-1 space-y-1">
        {loading && (
          <li className="px-4 py-2 text-xs text-gray-500">Loading...</li>
        )}
        {!loading &&
          filtered.map((p) => {
            const selected = p.id === selectedId;
            return (
              <li
                key={p.id}
                onClick={() => selectPatient(p.id)}
                className={`group relative rounded-lg pl-4 pr-2 py-2 flex items-center gap-3 cursor-pointer text-sm transition-colors ${
                  selected
                    ? "bg-teal-50 ring-1 ring-teal-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-xs font-medium text-gray-600">
                  {p.profile_picture ? (
                    <Image
                      src={p.profile_picture}
                      alt={`${p.first_name} ${p.last_name}`}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <span>
                      {p.first_name.charAt(0)}
                      {p.last_name.charAt(0)}
                    </span>
                  )}
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-gray-600 p-1"
                >
                  •••
                </button>
              </li>
            );
          })}
        {!loading && !filtered.length && (
          <li className="px-4 py-4 text-xs text-gray-500">
            No patients found.
          </li>
        )}
      </ul>
    </div>
  );
}
