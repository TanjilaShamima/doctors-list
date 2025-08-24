import {
  FileImage,
  FileText,
  FlaskConical,
  ScanLine,
  TestTube,
} from "lucide-react";
import type { ReactElement } from "react";

export interface LabCategory {
  name: string;
  downloadable?: boolean;
  icon?: ReactElement;
}

const iconCls = "h-4 w-4";

export const LAB_CATEGORIES: LabCategory[] = [
  {
    name: "Blood Tests",
    downloadable: true,
    icon: <FlaskConical className={iconCls} />,
  },
  {
    name: "CT Scans",
    downloadable: true,
    icon: <ScanLine className={iconCls} />,
  },
  {
    name: "Radiology Reports",
    downloadable: true,
    icon: <FileText className={iconCls} />,
  },
  {
    name: "X-Rays",
    downloadable: true,
    icon: <FileImage className={iconCls} />,
  },
  {
    name: "Urine Test",
    downloadable: true,
    icon: <TestTube className={iconCls} />,
  },
];
