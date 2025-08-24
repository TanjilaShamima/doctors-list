// Domain patient-related data models

type VitalSign = { levels: string; value: number | string };

export interface DiagnosisHistoryPoint {
    month: string; // e.g. "Oct"
    year: string; // e.g. "2023"
    respiratory_rate?: VitalSign;
    temperature?: VitalSign;
    heart_rate?: VitalSign;
    blood_pressure?: { systolic: VitalSign; diastolic: VitalSign };
}

export interface DiagnosticListItem {
    name: string; // problem / diagnosis
    description?: string;
    status?: string;
}

export interface LabResultCategory {
    name: string;
    items?: string[];
}

export interface RawPatient {
    id: string;
    name: string; // full name
    gender?: string;
    age?: number;
    date_of_birth?: string;
    phone_number?: string;
    emergency_contact?: string;
    insurance_type?: string;
    diagnosis_history?: DiagnosisHistoryPoint[]; // structure not guaranteed from API
    diagnostic_list?: DiagnosticListItem[];
    lab_results?: string[];
    profile_picture?: string;
    [key: string]: unknown;
}

export interface Patient {
    id: string;
    name: string; // full name
    gender?: string;
    age?: number;
    date_of_birth?: string;
    phone_number?: string;
    emergency_contact?: string;
    insurance_type?: string;
    diagnosis_history?: DiagnosisHistoryPoint[]; // structure not guaranteed from API
    diagnostic_list?: DiagnosticListItem[];
    lab_results?: string[];
    profile_picture?: string;
    raw?: RawPatient; // original untransformed record
}
