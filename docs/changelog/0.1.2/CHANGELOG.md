# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.2] - 2026-03-19

### ✨ Added

- Implement main dashboard for the authenticated (internal) zone.
- Add a specific header and sidebar for the internal zone with navigation logic.
- Integrate shadcn UI components including Avatar, Sidebar, Sheet, and Separator.
- Add `UserAvatar` component with full unit test coverage.
- Add `useLogout` hook for secure session termination.
- Implement new core design tokens and styles using modern Oklch color space.

### 🔄 Changed

- Restructure routing into `(external)` and `(internal)` logic-separated zones.
- Update authentication middleware to enforce route protection and handle automatic redirections.
- Adapt domain entities and infrastructure adapters to support enhanced authentication state.

### 🔥 Removed

- Legacy authentication route directories in favor of the new route organization.

### 🔧 Chore

- Update application version to 0.1.2.
