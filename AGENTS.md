# AGENTS.md

## Project Overview

Briefly describe what this project does and the primary tech stack.

- **Core Stack:** [e.g., Next.js 15, TypeScript, PostgreSQL, Tailwind]
- **Package Manager:** [e.g., pnpm, npm, yarn]

## Build & Test Commands

Always use these commands to verify your changes. Do not guess commands.

- **Install:** `pnpm install`
- **Local Dev:** `pnpm dev`
- **Run Tests:** `pnpm test`
- **Lint & Fix:** `pnpm lint:fix`
- **Build Project:** `pnpm build`

## Code Style & Architecture Guidelines

Follow these patterns strictly when writing or modifying code.

- **Language:** TypeScript in strict mode. Prefer explicit types over `any`.
- **Components:** Use functional components with named exports. Avoid default exports.
- **State Management:** Use Zustand for global UI state; Server Actions for data fetching.
- **Styling:** Use utility classes via Tailwind CSS. Do not write raw CSS files.

## Testing Instructions

- **Location:** Place test files adjacent to the implementation file (e.g., `component.test.tsx`).
- **Framework:** Use Vitest and React Testing Library.
- **Coverage:** New features must include unit tests. Mock external API calls.

## Git & Commit Workflow

- **Branching:** Base all feature branches on `main`.
- **Commit Messages:** Follow Conventional Commits format (e.g., `feat(auth): add login validation`).
- **PRs:** Ensure linting and tests pass locally before declaring a task finished.

## Critical Boundaries & Constraints

- **Files to Avoid:** Never manually modify the `generated/` or `dist/` folders.
- **API Versioning:** All new API routes must be structured under `/api/v2/`.
- **Security:** Never hardcode secrets. Always read from `process.env`.
