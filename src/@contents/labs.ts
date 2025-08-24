import { FileImage, FileText, FlaskConical, ScanLine, TestTube } from "lucide-react";
import React from "react";

export interface LabCategory {
    name: string;
    downloadable?: boolean;
    Icon?: React.ElementType;
}

export const LAB_CATEGORIES: LabCategory[] = [
    { name: "Blood Tests", downloadable: true, Icon: FlaskConical },
    { name: "CT Scans", downloadable: true, Icon: ScanLine },
    { name: "Radiology Reports", downloadable: true, Icon: FileText },
    { name: "X-Rays", downloadable: true, Icon: FileImage },
    { name: "Urine Test", downloadable: true, Icon: TestTube },
];
