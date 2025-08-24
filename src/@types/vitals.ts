// Chart / vitals computation types
export interface ParsedPoint {
    label: string;
    date: Date;
    sys: number | null;
    dia: number | null;
    respiratory?: number | null;
    temperature?: number | null;
    heart?: number | null;
}

export interface BloodPressureSummary {
    labels: string[];
    systolic: (number | null)[];
    diastolic: (number | null)[];
    datasets: { label: string; data: (number | null)[]; color: string }[];
}

export interface VitalStatuses {
    respiratoryStatus: string;
    tempStatus: string;
    heartStatus: string;
}
