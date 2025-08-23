export interface Patient {
    id: string;
    first_name: string;
    last_name: string;
    date_of_birth?: string;
    gender?: string;
    phone_number?: string;
    email?: string;
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    insurance?: string;
    policy_number?: string;
    allergies?: string[];
    medications?: string[];
    emergency_contact?: string;
    emergency_contact_phone?: string;
}

// NOTE: The actual API docs page didn't load content via fetch preview.
// Assumption: Base URL and endpoints follow a typical pattern.
// Adjust BASE_URL and endpoints once confirmed from docs.
const BASE_URL = process.env.NEXT_PUBLIC_PATIENT_API_BASE || "https://fedskillstest.coalitiontechnologies.workers.dev";
const API_KEY = process.env.NEXT_PUBLIC_PATIENT_API_KEY; // if needed

async function fetchJSON<T>(url: string, init: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(init.headers as Record<string, string> | undefined),
    };
    if (API_KEY) headers.Authorization = `Bearer ${API_KEY}`;
    const res = await fetch(url, { ...init, headers, cache: 'no-store' });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Request failed ${res.status}: ${text}`);
    }
    return res.json();
}

export async function getPatients(): Promise<Patient[]> {
    // Placeholder endpoint; replace with actual from docs if different
    return fetchJSON<Patient[]>(`${BASE_URL}/patients`);
}

export async function getPatient(id: string): Promise<Patient> {
    return fetchJSON<Patient>(`${BASE_URL}/patients/${id}`);
}
