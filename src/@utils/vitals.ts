import type { DiagnosisHistoryPoint } from "@/@types/patient";
import type { BloodPressureSummary, ParsedPoint, VitalStatuses } from "@/@types/vitals";

// Helper to coerce possible string/number into number
function toNum(val: unknown): number | null {
    if (val == null) return null;
    if (typeof val === 'number' && isFinite(val)) return val;
    if (typeof val === 'string') {
        const n = parseFloat(val);
        return isFinite(n) ? n : null;
    }
    return null;
}

export function parseDiagnosisHistory(history: DiagnosisHistoryPoint[] = []): ParsedPoint[] {
    const parsed: ParsedPoint[] = history
        .map((pt) => {
            // Month + Year combination (e.g. "Oct" + "2023")
            const monthPart = (pt.month || '').trim();
            const yearPart = (pt.year || '').trim();
            const dateString = [monthPart, yearPart].filter(Boolean).join(' '); // e.g. "Oct 2023"
            let dt = new Date(dateString);
            if (isNaN(dt.getTime()) && dateString) {
                // Try adding day if only month-year fails
                dt = new Date(dateString + ' 1');
            }
            if (isNaN(dt.getTime())) {
                dt = new Date(); // fallback to now
            }
            const label = dt.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });

            // Support two possible shapes:
            // Old (flat): pt.systolic, pt.diastolic, pt.respiratory_rate (number), etc.
            // New (nested VitalSign): pt.blood_pressure.systolic.value, pt.respiratory_rate.value, etc.
            // Access possibly dual-shaped properties safely
            type VitalLike = { value?: number | string } | number | string | undefined;
            const flatSys: VitalLike = (pt as unknown as { systolic?: VitalLike }).systolic;
            const flatDia: VitalLike = (pt as unknown as { diastolic?: VitalLike }).diastolic;
            const flatResp: VitalLike = (pt as unknown as { respiratory_rate?: VitalLike }).respiratory_rate;
            const flatTemp: VitalLike = (pt as unknown as { temperature?: VitalLike }).temperature;
            const flatHeart: VitalLike = (pt as unknown as { heart_rate?: VitalLike }).heart_rate;

            const extract = (v: VitalLike): number | string | undefined => {
                if (v && typeof v === 'object' && 'value' in v) {
                    const obj = v as { value?: number | string };
                    return obj.value;
                }
                return v as number | string | undefined;
            };
            const sys = toNum(extract(flatSys)) ?? toNum(pt.blood_pressure?.systolic?.value);
            const dia = toNum(extract(flatDia)) ?? toNum(pt.blood_pressure?.diastolic?.value);
            const respiratory = toNum(extract(flatResp));
            const temperature = toNum(extract(flatTemp));
            const heart = toNum(extract(flatHeart));

            return { label, date: dt, sys, dia, respiratory, temperature, heart } as ParsedPoint;
        })
        .sort((a, b) => a.date.getTime() - b.date.getTime());

    // Deduplicate by label, keeping the last chronologically
    const lastByLabel = new Map<string, ParsedPoint>();
    parsed.forEach((p) => lastByLabel.set(p.label, p));
    return Array.from(lastByLabel.values());
}

export function summarizeBloodPressure(points: ParsedPoint[]): BloodPressureSummary {
    const labels = points.map((p) => p.label);
    const systolic = points.map((p) => p.sys);
    const diastolic = points.map((p) => p.dia);
    const datasets = [
        { label: "Systolic", data: systolic, color: "#7E6CAB" },
        { label: "Diastolic", data: diastolic, color: "#5B8DEF" },
    ];
    return { labels, systolic, diastolic, datasets };
}

export function latestValue(points: ParsedPoint[], selector: (p: ParsedPoint) => number | null | undefined): number | null {
    for (let i = points.length - 1; i >= 0; i--) {
        const v = selector(points[i]);
        if (typeof v === "number") return v;
    }
    return null;
}

export function deriveVitalStatuses(latestResp: number | null, latestTemp: number | null, latestHeart: number | null): VitalStatuses {
    const respiratoryStatus =
        latestResp == null
            ? "No data"
            : latestResp < 12
                ? "Low"
                : latestResp > 20
                    ? "High"
                    : "Normal";
    const tempStatus =
        latestTemp == null
            ? "No data"
            : latestTemp < 97
                ? "Low"
                : latestTemp > 99
                    ? "High"
                    : "Normal";
    const heartStatus =
        latestHeart == null
            ? "No data"
            : latestHeart < 60
                ? "Lower than Average"
                : latestHeart > 100
                    ? "Higher than Average"
                    : "Normal";
    return { respiratoryStatus, tempStatus, heartStatus };
}
