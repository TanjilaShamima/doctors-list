"use client";
import { usePatientStore } from "@/@stores/patientStore";
import Image from "next/image";
import { useEffect } from "react";

export function PatientProfilePanel() {
  const { selected, ensureSelected } = usePatientStore();
  useEffect(() => {
    ensureSelected();
  }, [ensureSelected]);
  const patient = selected;
  if (!patient)
    return <div className="p-6 text-sm text-gray-500">Loading...</div>;
  const fullName = `${patient.first_name} ${patient.last_name}`;
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col items-center p-6 pb-4">
        <div className="h-28 w-28 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-semibold text-gray-600">
          <Image
            src={patient.profile_picture || ''}
            alt={fullName}
            width={112}
            height={112}
            className="object-cover"
          />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-gray-800">{fullName}</h2>
      </div>
      <div className="px-6 pb-6 space-y-4 text-sm">
        <InfoRow
          label="Date Of Birth"
          value={
            patient.date_of_birth
              ? new Date(patient.date_of_birth).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "—"
          }
        />
        <InfoRow label="Gender" value={patient.gender || "—"} />
        <InfoRow label="Contact Info." value={patient.phone_number || "—"} />
        <InfoRow
          label="Emergency Contacts"
          value={patient.emergency_contact || "—"}
        />
        <InfoRow
          label="Insurance Provider"
          value={patient.insurance_type || "—"}
        />
      </div>
      <div className="px-6 pb-6 mt-auto">
        <button className="w-full rounded-full bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium py-2 transition">
          Show All Information
        </button>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-1 min-w-0">
        <div className="text-[11px] uppercase tracking-wide text-gray-500 font-medium">
          {label}
        </div>
        <div className="text-gray-800 mt-0.5 truncate">{value}</div>
      </div>
    </div>
  );
}
