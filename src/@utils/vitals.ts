import type { DiagnosisHistoryPoint } from "@/@types/patient";
import type { BloodPressureSummary, ParsedPoint, VitalStatuses } from "@/@types/vitals";

export function parseDiagnosisHistory(history: DiagnosisHistoryPoint[] = []): ParsedPoint[] {
    const parsed: ParsedPoint[] = history
        .map((pt) => {
            const raw = (pt.month || "").replace(/,/g, " ").trim();
            let dt = new Date(raw);
            if (isNaN(dt.getTime())) {
                dt = new Date(raw + " 1");
            }
            if (isNaN(dt.getTime())) dt = new Date();
            const label = dt.toLocaleDateString(undefined, { month: "short", year: "numeric" });
            return {
                label,
                date: dt,
                sys: typeof pt.systolic === "number" ? pt.systolic : null,
                dia: typeof pt.diastolic === "number" ? pt.diastolic : null,
                respiratory: typeof pt.respiratory_rate === "number" ? pt.respiratory_rate : null,
                temperature: typeof pt.temperature === "number" ? pt.temperature : null,
                heart: typeof pt.heart_rate === "number" ? pt.heart_rate : null,
            } as ParsedPoint;
        })
        .sort((a, b) => a.date.getTime() - b.date.getTime());

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
