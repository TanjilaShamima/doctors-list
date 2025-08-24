"use client";
import { usePatientStore } from "@/@stores/patientStore";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export function SidebarPatientList() {
  const { patients, loadPatients, loading, selectedId, selectPatient, error } =
    usePatientStore();
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!patients.length && !loading) {
      loadPatients();
    }
  }, [patients.length, loading, loadPatients]);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  const filtered = useMemo(() => {
    if (!query) return patients;
    const q = query.toLowerCase();
    return patients.filter((p) =>
      `${p.first_name} ${p.last_name}`.toLowerCase().includes(q)
    );
  }, [patients, query]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="font-semibold text-gray-800 select-none">Patients</div>
        <button
          aria-label={showSearch ? "Close search" : "Open search"}
          className="h-8 w-8 flex items-center justify-center rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition"
          onClick={() => setShowSearch((s) => !s)}
        >
          {showSearch ? (
            <X className="h-4 w-4" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </button>
      </div>
      {showSearch && (
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              ref={inputRef}
              placeholder="Search patients..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-gray-50 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      )}
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
                className={`group relative pl-4 pr-2 py-2 flex items-center gap-3 cursor-pointer text-sm transition-colors ${
                  selected ? "bg-teal-100" : "hover:bg-gray-50"
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
