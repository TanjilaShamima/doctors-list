# Patient Record Application

A responsive patient dashboard built with Next.js (App Router) and TypeScript. It visualizes a single patient's historical vital signs, diagnoses and laboratory results with a design modeled after a clinical admin interface. The default loaded patient is Jessica (can be changed via the patient list). State, data shaping and chart rendering are implemented with a small, modular architecture for clarity and extensibility.

## Quick Start (Installation & Run Flow)

Prerequisites:

- Node.js 20+ (Next.js 15 & Tailwind v4 features assume a modern runtime)
- npm (bundled with Node) or pnpm/yarn if you prefer (examples use npm)

Steps:

1. Clone repository
   ```bash
   git clone <repo-url>
   cd patient-record-app
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start development server (Turbopack)
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000
4. Type checking & lint (optional during dev)
   ```bash
   npm run lint
   ```
5. Production build & start
   ```bash
   npm run build
   npm start
   ```

Scripts Overview:

- `dev` – Start Next.js (Turbopack) in dev mode
- `build` – Production build
- `start` – Run built app
- `lint` – ESLint over source

Deployment Flow (generic):

1. `npm ci`
2. `npm run build`
3. `npm start` (or deploy `.next`/.output depending on target platform)

No environment variables required currently.

## Core Features

1. Patient selection sidebar with persistent currently selected patient (Zustand store).
2. Blood pressure history line chart (systolic / diastolic) rendered with Chart.js via react-chartjs-2, dynamic range filtering (last 2 months, 6 months, 1 year).
3. KPI cards for respiratory rate, temperature and heart rate with derived textual status (Normal / High / Low etc.).
4. Diagnosis list presented in a grid layout with header-only rounded styling and consistent alignment.
5. Lab results panel with constrained height and internal scroll for long lists while preserving overall layout stability.
6. Global thin scrollbar styling and project-specific color tokens defined in CSS variables.
7. Robust parsing utilities that tolerate inconsistent API structures (flat vs nested vital sign objects) while producing clean time-series points.
8. Pure CSS large breakpoint utilities (1440px, 1920px) without relying on a Tailwind configuration file, enabling wider layout containers.

## Technology Stack

- Framework: Next.js 15 (App Router, TypeScript)
- UI Layer: Tailwind CSS v4 (utility classes) supplemented by custom CSS variables and media-query utilities in `globals.css`
- State Management: Zustand for selected patient state
- Charts: Chart.js 4 + react-chartjs-2
- Language / Tooling: TypeScript 5, ESLint 9, Turbopack dev/build

## Project Structure (Selected)

```
.
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── public/                # Static public assets
├── src/
│   ├── @assets/           # Images & icons
│   ├── @components/
│   │   ├── common/        # UI primitives (Skeleton, KPI card)
│   │   ├── layout/        # Layout & navigation (TopNav, Header)
│   │   ├── PatientHistory/# Patient-centric panels (chart, diagnostics, labs, profile)
│   │   └── SidebarPatient/# Patient list & sidebar items
│   ├── @contents/         # Centralized text constants / labels
│   ├── @services/         # API service modules (patientService)
│   ├── @stores/           # Zustand stores (patientStore)
│   ├── @types/            # Domain types (patient, vitals, store)
│   ├── @utils/            # Pure utilities (vitals parsing, status derivation)
│   ├── app/               # Next.js App Router entry (layout.tsx, page.tsx)
│   └── features/          # Feature-level composed pages (dashboard)
└── README.md
```

## Data & Parsing

The raw patient object may contain vital signs either as flat numeric fields or nested objects with `value` properties. The parser (`@utils/vitals.ts`) normalizes this into a chronological array of points with consistent properties (`sys`, `dia`, `respiratory`, `temperature`, `heart`) plus a formatted label (`Mon, YYYY`). Deduplication keeps only the latest record per month label, ensuring clean chart axes.

Derived helper functions:

- `parseDiagnosisHistory` – resilient normalization of raw diagnosis history entries.
- `summarizeBloodPressure` – returns labeled datasets for the chart component.
- `latestValue` – retrieves the most recent non-null reading in a series.
- `deriveVitalStatuses` – computes qualitative statuses for KPI display.

## State Management

Zustand maintains the currently selected patient and exposes a helper to ensure a default patient is loaded on first render. This keeps components lean and avoids prop drilling through the dashboard tree.

## Styling and Theming

Color tokens and scrollbar styles are defined in `app/globals.css`. Custom media queries implement large breakpoint utilities (2xl at 1440px, 3xl at 1920px) without extending Tailwind configuration. The top navigation uses a sticky container; content panels use consistent rounded borders, subtle shadows and controlled internal scroll areas for predictable vertical rhythm.

## Chart Implementation

The blood pressure chart uses two datasets (systolic and diastolic) with distinct brand-aligned colors. Labels on the x-axis are formatted as `Oct, 2023`. The chart component accepts filtered subsets of parsed points when the user changes the displayed range. Legend is removed for a cleaner compact card layout; axis tick styling (size and color) follows design specifications.

## Loading Skeleton Strategy

The UI shows a comprehensive skeleton state before patient data resolves:

- All textual headings, labels and static section titles display skeleton bars.
- Sidebar patient list renders placeholder rows matching final layout dimensions.
- Profile panel shows avatar circle + text line skeletons.
- Diagnostics, lab results, chart card and KPI cards all reserve final space to eliminate CLS (cumulative layout shift).
- A Zustand store exposes `loading` and `initialized` flags:
  - `loading` – true during active fetch.
  - `initialized` – set to true after first fetch attempt (success or fail) to swap from skeleton to empty-state messages if no data.
  - This prevents flashing an empty state before data has had a chance to load.

Implementation Notes:

- `Skeleton` component uses a CSS keyframe shimmer (`@keyframes shimmer`) defined globally (no runtime style injection).
- For reduced motion users, consider an enhancement adding a `(prefers-reduced-motion: reduce)` media query to disable the shimmer (future improvement).

## Accessibility Considerations

- Semantic text for vitals and statuses supports screen reading.
- Buttons and interactive tabs include accessible text labels.
- Further enhancements (ARIA roles for grid-based diagnostic list, keyboard focus outlines) can be iterated as needed.

## Development Workflow

Install dependencies and start the dev server (Turbopack):

```bash
npm install
npm run dev
```

Build and run production locally:

```bash
npm run build
npm start
```

Lint the project:

```bash
npm run lint
```

The app runs at: http://localhost:3000

## Environment Configuration

This project currently does not require runtime environment variables for core functionality. If future external APIs or authentication layers are introduced, document required variables in a new section here (`.env.example`).

## Testing Strategy (Planned)

No automated tests are included yet. Recommended future additions:

1. Unit tests for vital parsing and status derivation.
2. Component tests for the chart (range filtering) and KPI cards.
3. Store tests ensuring patient selection logic is deterministic.

## Extension Ideas

- Multi-patient API integration with server actions or dedicated service layer.
- Historical range presets persisted to user preferences.
- Export (PDF/CSV) of diagnostic list and vitals.
- Real-time updates via WebSocket or SSE for incoming vitals.
- Internationalization of labels and date formatting.

## Coding Standards

- Type-first: All domain data passes through typed normalizers before consumption.
- Side-effect isolation: Parsing and derivation live in pure modules under `@utils`.
- UI cohesion: Panels follow a consistent elevation, spacing and typography scale.
- Minimal global state surface: Only patient selection stored centrally.

## Deployment

The application can be deployed to any platform supporting a Next.js 15 runtime. A typical production pipeline performs the `build` step (Turbopack) followed by `start`. If deploying to Vercel, no configuration changes are required beyond repository import.

## License

No explicit license file is included. Add a LICENSE file (MIT or custom) before open-sourcing or distributing widely.

## Author

Tanjila Akter Shamima

## Support and Maintenance

For feature requests or issues, open a repository issue or create a change request outlining:

1. Problem statement
2. Proposed solution or design sketch
3. Acceptance criteria / success metrics

## Summary

This codebase demonstrates a modular, strongly typed approach to building a patient dashboard with resilient data parsing, lightweight state management and a design-focused presentation layer. It is structured for incremental extension into a fuller electronic health record (EHR) style interface.
