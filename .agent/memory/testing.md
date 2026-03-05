# TDD Testing Standard

## Core Guidelines

- **TDD Approach**: All new code and significant changes must be driven by tests following the Red -> Green -> Refactor cycle.
- **Strict Coverage**: The project targets 100% test coverage (lines, functions, branches, and statements) enforced via Vitest.
- **Co-located Tests**: Test files must reside in the exact same directory as their target source files (e.g., `Component.tsx` and `Component.test.tsx` are siblings).
- **Global Setup**: Any cross-layer configuration or global mocks (like `jest-dom`) are centralized in `src/vitest.setup.ts`.

## Core Tools

- **Runner**: Vitest
- **DOM/UI Tests**: React Testing Library
