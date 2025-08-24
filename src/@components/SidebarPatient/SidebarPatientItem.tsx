"use client";
import more from "@/@assets/more.png";
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
      className={`group relative px-4 py-5 flex items-center gap-3 cursor-pointer text-sm transition-colors ${
        selected ? "bg-teal-100" : "hover:bg-gray-50"
      }`}
    >
      <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-xs font-medium text-gray-600">
        {patient.profile_picture ? (
          <Image
            src={patient.profile_picture}
            alt={`${patient.name}`}
            width={48}
            height={48}
            className="object-cover"
          />
        ) : (
          <span>{patient.name.charAt(0)}</span>
        )}
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <span className="font-bold truncate text-sm text-brand-deep">
          {patient.name}
        </span>
        <span className="text-sm mt-1 text-gray-mid truncate">
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
        className="opacity-100 transition p-1 shrink-0 cursor-pointer"
        aria-label="More patient actions"
      >
        <Image
          src={more}
          alt="More"
          width={4}
          height={20}
          className="rotate-90"
        />
      </button>
    </li>
  );
};
