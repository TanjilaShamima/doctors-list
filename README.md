# Patient Record Application

A responsive patient dashboard built with Next.js (App Router) and TypeScript. It visualizes a single patient's historical vital signs, diagnoses and laboratory results with a design modeled after a clinical admin interface. The default loaded patient is Jessica (can be changed via the patient list). State, data shaping and chart rendering are implemented with a small, modular architecture for clarity and extensibility.

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
src/
	@assets/              # Static images / icons (imported via next/image)
	@components/          # Reusable presentational & composite components
		layout/             # Top navigation, layout shell pieces
		PatientHistory/     # Chart, vitals, diagnostic list, lab panels
		SidebarPatient/     # Patient list and related UI
		common/             # Shared UI primitives (e.g., KPI card)
	@contents/            # Static text/content constants
	@services/            # (Reserved) data fetching or integration services
	@stores/              # Zustand stores (patient selection)
	@types/               # Domain TypeScript type definitions
	@utils/               # Pure utility modules (vitals parsing, summarization)
	app/                  # Next.js App Router entrypoints (`layout.tsx`, pages)
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
