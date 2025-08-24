"use client";
import { Skeleton } from "@/@components/common/Skeleton";
import { PROFILE_LABELS } from "@/@contents/profileFields";
import { usePatientStore } from "@/@stores/patientStore";
import { Calendar, Phone, ShieldCheck, Venus } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export function PatientProfilePanel() {
  const { selected, ensureSelected } = usePatientStore();
  useEffect(() => {
    ensureSelected();
  }, [ensureSelected]);
  const patient = selected;
  if (!patient)
    return (
      <div className="flex flex-col h-auto px-5 py-5 animate-pulse">
        <div className="flex flex-col items-center pb-6">
          <Skeleton className="h-28 w-28 rounded-full" />
          <Skeleton className="mt-5 h-5 w-40" />
        </div>
        <div className="space-y-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2 pt-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 pb-6 mt-8">
          <Skeleton className="h-10 w-full rounded-full" />
        </div>
      </div>
    );
  const fullName = `${patient.name}`;
  return (
    <div className="flex flex-col h-auto px-5 py-5">
      <div className="flex flex-col items-center pb-4">
        <div className="h-28 w-28 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-semibold text-gray-600">
          <Image
            src={patient.profile_picture || ""}
            alt={fullName}
            width={120}
            height={120}
            className="object-cover"
          />
        </div>
        <p className="mt-5 text-xl font-semibold text-gray-800">{fullName}</p>
      </div>
      <div className="pb-8 space-y-5 text-sm">
        <InfoRow
          icon={<Calendar className="h-5 w-5 text-brand-deep" />}
          label={PROFILE_LABELS.dateOfBirth}
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
        <InfoRow
          icon={<Venus className="h-5 w-5 text-brand-deep" />}
          label={PROFILE_LABELS.gender}
          value={patient.gender || "—"}
        />
        <InfoRow
          icon={<Phone className="h-5 w-5 text-brand-deep" />}
          label={PROFILE_LABELS.contact}
          value={patient.phone_number || "—"}
        />
        <InfoRow
          icon={<Phone className="h-5 w-5 text-brand-deep" />}
          label={PROFILE_LABELS.emergency}
          value={patient.emergency_contact || "—"}
        />
        <InfoRow
          icon={<ShieldCheck className="h-5 w-5 text-brand-deep" />}
          label={PROFILE_LABELS.insurance}
          value={patient.insurance_type || "—"}
        />
      </div>
      <div className="px-6 pb-6 mt-auto">
        <button className="w-full rounded-full bg-accent-teal text-brand-deep text-sm font-medium py-2.5 transition cursor-pointer">
          {PROFILE_LABELS.showAll}
        </button>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-500">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm tracking-wide text-brand-deep font-normal">
          {label}
        </div>
        <div className="text-brand-deep font-bold mt-0.5 truncate">{value}</div>
      </div>
    </div>
  );
}
