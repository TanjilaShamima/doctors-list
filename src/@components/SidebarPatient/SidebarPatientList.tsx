"use client";
import { usePatientStore } from "@/@stores/patientStore";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { SidebarPatientItem } from "./SidebarPatientItem";
import search from '@/@assets/search.png';
import Image from "next/image";

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
      `${p.name}`.toLowerCase().includes(q)
    );
  }, [patients, query]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <div className="font-extrabold text-brand-deep select-none text-2xl">Patients</div>
        <button
          aria-label={showSearch ? "Close search" : "Open search"}
          className="h-8 w-8 flex items-center justify-center rounded-md transition cursor-pointer"
          onClick={() => setShowSearch((s) => !s)}
        >
          {showSearch ? (
            <X className="h-4 w-4" />
          ) : (
            <Image
              src={search}
              alt="Search"
              width={18}
              height={18}
            />
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
      <ul className="flex-1 overflow-y-auto thin-scroll pr-1 space-y-1 pt-4">
        {loading && (
          <li className="px-4 py-2 text-xs text-gray-500">Loading...</li>
        )}
        {!loading &&
          filtered.map((p) => (
            <SidebarPatientItem
              key={p.id}
              patient={p}
              selected={p.id === selectedId}
              onSelect={selectPatient}
            />
          ))}
        {!loading && !filtered.length && (
          <li className="px-4 py-4 text-xs text-gray-500">
            No patients found.
          </li>
        )}
      </ul>
    </div>
  );
}
