"use client";
import type { Patient } from "@/@types/patient";
import Image from "next/image";
import React from "react";

export interface SidebarPatientItemProps {
  patient: Patient;
  selected: boolean;
  onSelect: (id: string) => void;
}

export const SidebarPatientItem: React.FC<SidebarPatientItemProps> = ({
  patient,
  selected,
  onSelect,
}) => {
  return (
    <li
      onClick={() => onSelect(patient.id)}
      className={`group relative pl-4 pr-2 py-2 flex items-center gap-3 cursor-pointer text-sm transition-colors ${
        selected ? "bg-teal-100" : "hover:bg-gray-50"
      }`}
    >
      <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-xs font-medium text-gray-600">
        {patient.profile_picture ? (
          <Image
            src={patient.profile_picture}
            alt={`${patient.first_name} ${patient.last_name}`}
            width={40}
            height={40}
            className="object-cover"
          />
        ) : (
          <span>
            {patient.first_name.charAt(0)}
            {patient.last_name.charAt(0)}
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <span className="font-medium truncate text-gray-800">
          {patient.first_name} {patient.last_name}
        </span>
        <span className="text-[11px] text-gray-500 truncate">
          {patient.gender || "—"},{" "}
          {patient.date_of_birth
            ? new Date(patient.date_of_birth).getFullYear()
            : ""}
        </span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-gray-600 p-1"
        aria-label="More patient actions"
      >
        •••
      </button>
    </li>
  );
};
