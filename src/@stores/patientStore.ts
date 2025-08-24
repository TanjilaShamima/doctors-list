"use client";
import { fetchAllPatients, fetchJessica, fetchPatientByIdOrName } from "@/@services/api/patientService";
import type { PatientState } from "@/@types/store";
import { create } from 'zustand';

export const usePatientStore = create<PatientState>((set, get) => ({
    patients: [],
    loading: false,
    initialized: false,
    async loadPatients() {
        try {
            set({ loading: true, error: undefined });
            const list = await fetchAllPatients();
            set({ patients: list, loading: false, initialized: true });
            // If nothing selected yet, default to Jessica
            const jess = list.find(p => `${p.first_name} ${p.last_name}`.toLowerCase() === 'jessica taylor');
            if (!get().selectedId && jess) {
                set({ selectedId: jess.id, selected: jess });
            }
        } catch (e) {
            const msg = e instanceof Error ? e.message : 'Failed to load patients';
            set({ error: msg, loading: false });
        }
    },
    selectPatient(id) {
        const { patients } = get();
        const found = patients.find(p => p.id === id);
        if (found) set({ selectedId: id, selected: found });
    },
    async ensureSelected() {
        const { selected, selectedId } = get();
        if (selected) return; // already loaded via patients list
        if (selectedId) {
            const p = await fetchPatientByIdOrName(selectedId);
            if (p) set({ selected: p });
            return;
        }
        const j = await fetchJessica();
        if (j) set({ selected: j, selectedId: j.id });
    }
}));
