import type { DiagnosisHistoryPoint, DiagnosticListItem, LabResultCategory, Patient, RawPatient } from "@/@types/patient";

// Base API info (single endpoint returns all patients)
const BASE_URL = process.env.NEXT_PUBLIC_PATIENT_API_BASE || "https://fedskillstest.coalitiontechnologies.workers.dev";
const USERNAME = process.env.NEXT_PUBLIC_PATIENT_API_USERNAME || ""; // should be set server-side
const PASSWORD = process.env.NEXT_PUBLIC_PATIENT_API_PASSWORD || ""; // should be set server-side

function buildAuthHeader(): string | undefined {
    if (!USERNAME || !PASSWORD) return undefined;
    try {
        let token: string;
        if (typeof window !== 'undefined' && typeof btoa === 'function') {
            token = btoa(`${USERNAME}:${PASSWORD}`);
        } else {
            // Node / server side

            const buff = Buffer.from(`${USERNAME}:${PASSWORD}`);
            token = buff.toString('base64');
        }
        return `Basic ${token}`;
    } catch {
        return undefined;
    }
}

async function fetchJSON<T>(url: string): Promise<T> {
    const auth = buildAuthHeader();
    const headers: Record<string, string> = {};
    if (auth) headers.Authorization = auth;
    const res = await fetch(url, { headers, cache: "no-store" });
    console.log("res", res)
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Request failed ${res.status}: ${text}`);
    }
    return res.json() as Promise<T>;
}

function mapPatient(raw: RawPatient): Patient {
    const [first_name, ...rest] = raw.name.split(" ");
    const last_name = rest.join(" ") || "";
    return {
        id: raw.id || raw.name, // fallback if id missing
        first_name,
        last_name,
        gender: raw.gender,
        date_of_birth: raw.date_of_birth,
        age: raw.age,
        phone_number: raw.phone_number,
        emergency_contact: raw.emergency_contact,
        insurance_type: raw.insurance_type,
        diagnosis_history: raw.diagnosis_history as DiagnosisHistoryPoint[] | undefined,
        diagnostic_list: raw.diagnostic_list as DiagnosticListItem[] | undefined,
        lab_results: raw.lab_results as LabResultCategory[] | undefined,
        profile_picture: raw.profile_picture,
        raw,
    };
}

export async function fetchAllPatients(): Promise<Patient[]> {
    const data = await fetchJSON<RawPatient[]>(BASE_URL);
    console.log("data", data);
    return data.map(mapPatient);
}

export async function fetchJessica(): Promise<Patient | undefined> {
    const patients = await fetchAllPatients();
    return patients.find(p => `${p.first_name} ${p.last_name}`.toLowerCase() === "jessica taylor");
}

export async function fetchPatientByIdOrName(idOrName: string): Promise<Patient | undefined> {
    const patients = await fetchAllPatients();
    return patients.find(p => p.id === idOrName || `${p.first_name} ${p.last_name}`.toLowerCase() === idOrName.toLowerCase());
}
