# Patient Record Application

A responsive patient dashboard built with Next.js (App Router) and TypeScript. It visualizes a single patient's historical vital signs, diagnoses and laboratory results with a design modeled after a clinical admin interface. The default loaded patient is Jessica (can be changed via the patient list). State, data shaping and chart rendering are implemented with a small, modular architecture for clarity and extensibility.

## Core Features

1. **Scalable Component Architecture**: Reusable UI primitives and composable sections with full TypeScript support and accessibility features.
2. **Internationalization**: Complete i18n system with no hardcoded text, TypeScript-safe translation keys, and parameter interpolation.
3. **Design Token System**: Comprehensive Tailwind v4 design tokens for colors, typography, spacing, and responsive breakpoints.
4. **Patient Dashboard**: Interactive patient selection sidebar with persistent state management (Zustand store).
5. **Blood Pressure Visualization**: Dynamic line chart (systolic/diastolic) with Chart.js, featuring time range filtering (2 months, 6 months, 1 year).
6. **Vital Signs Monitoring**: KPI cards for respiratory rate, temperature, and heart rate with intelligent status derivation (Normal/High/Low).
7. **Diagnosis Management**: Grid-based diagnosis list with consistent styling and accessibility support.
8. **Lab Results Panel**: Scrollable lab results with fixed height layout and internal scroll management.
9. **Accessibility**: WCAG AA compliant with keyboard navigation, focus management, semantic HTML, and screen reader support.
10. **Testing Infrastructure**: Jest + React Testing Library setup with component and utility function tests.
11. **Environment Configuration**: Type-safe environment variable validation with Zod schemas.

## Technology Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **UI Layer**: Tailwind CSS v4 with design tokens and utility classes
- **State Management**: Zustand for patient selection state
- **Charts**: Chart.js 4 + react-chartjs-2
- **Internationalization**: Custom i18n system with TypeScript safety
- **Testing**: Jest + React Testing Library
- **Development**: TypeScript 5, ESLint 9, Turbopack dev/build
- **Environment**: Zod-based environment variable validation

## Project Structure (Updated)

```
src/
	components/
		ui/                   # Reusable UI primitives (Button, Card, Input, Container)
		sections/             # Page sections (Header, Footer)
	lib/                      # Shared utilities and helpers
		i18n.ts              # Internationalization system
		utils.ts             # Common utility functions
	locales/                  # Translation files
		en/                  # English translations
			common.json      # Common UI text and labels
	config/                   # Application configuration
		env.ts               # Typed environment variables with validation
	
	[Legacy Structure - Being Migrated]
	@assets/                  # Static images / icons (imported via next/image)
	@components/              # Legacy reusable components
		layout/              # Top navigation, layout shell pieces
		PatientHistory/      # Chart, vitals, diagnostic list, lab panels
		SidebarPatient/      # Patient list and related UI
		common/              # Shared UI primitives (legacy)
	@contents/                # Legacy static text/content constants
	@services/                # (Reserved) data fetching or integration services
	@stores/                  # Zustand stores (patient selection)
	@types/                   # Domain TypeScript type definitions
	@utils/                   # Pure utility modules (vitals parsing, summarization)
	app/                      # Next.js App Router entrypoints (layout.tsx, pages)
	features/                 # Feature-specific components and pages
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

Run tests:

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode for development
npm run test:coverage # Generate coverage report
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

The project uses typed environment variable validation with Zod. Copy `.env.example` to `.env.local` and configure required variables:

```bash
cp .env.example .env.local
```

Required environment variables are documented in `.env.example`. The application validates all environment variables at startup and provides clear error messages for missing or invalid configurations.

## Frontend Architecture

This project implements a scalable, accessible frontend architecture with:

- **Zero hardcoded text**: All UI text uses i18n keys
- **Design token system**: Centralized colors, typography, and spacing
- **Component composition**: Reusable UI primitives and page sections
- **Type safety**: Full TypeScript coverage with runtime validation
- **Accessibility**: WCAG AA compliant with screen reader support
- **Testing**: Comprehensive test coverage for components and utilities

See `docs/frontend-structure.md` for detailed documentation on adding components, translations, and design tokens.

## Testing Strategy

- **Unit Tests**: Components, utilities, and helper functions
- **Integration Tests**: Component interactions and data flow
- **Accessibility Tests**: Screen reader compatibility and keyboard navigation
- **Type Safety**: TypeScript compilation and ESLint validation

All tests run automatically in CI/CD pipeline with coverage reporting.

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
