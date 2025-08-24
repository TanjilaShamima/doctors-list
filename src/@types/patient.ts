// Domain patient-related data models
export interface DiagnosisHistoryPoint {
    month: string; // e.g. "Oct, 2023"
    systolic?: number;
    diastolic?: number;
    respiratory_rate?: number;
    temperature?: number;
    heart_rate?: number;
    [key: string]: unknown;
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
    id?: string;
    name: string; // full name
    gender?: string;
    age?: number;
    date_of_birth?: string;
    phone_number?: string;
    emergency_contact?: string;
    insurance_type?: string;
    diagnosis_history?: unknown[]; // structure not guaranteed from API
    diagnostic_list?: unknown[];
    lab_results?: unknown[];
    profile_picture?: string;
    [key: string]: unknown;
}

export interface Patient {
    id: string;
    first_name: string;
    last_name: string;
    gender?: string;
    date_of_birth?: string;
    age?: number;
    phone_number?: string;
    emergency_contact?: string;
    insurance_type?: string;
    diagnosis_history?: DiagnosisHistoryPoint[];
    diagnostic_list?: DiagnosticListItem[];
    lab_results?: LabResultCategory[];
    profile_picture?: string;
    raw?: RawPatient; // original untransformed record
}
