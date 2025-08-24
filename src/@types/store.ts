import type { Patient } from "./patient";

export interface PatientState {
    patients: Patient[];
    loading: boolean;
    error?: string;
    selectedId?: string; // patient id or name key
    selected?: Patient;
    initialized: boolean;
    loadPatients: () => Promise<void>;
    selectPatient: (id: string) => void;
    ensureSelected: () => Promise<void>;
}
