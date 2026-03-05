# Product Context

## Why this project exists

This project arises from the need to optimize startup times in software development for the company or `coficode` project creators. Over time, repository initialization consumed valuable resources due to manual configurations required in authentication, UI, bundling, and tests.

## Problems we solve

1. Dead times in initial configuration (Boilerplating).
2. Diversity of standards: Centralizing core tools ensures that new projects will maintain the same organizational structure (clean and coherent architecture).
3. Hardcoding environment variables: Centralizing customization (branding, keys) strictly to a configuration file (`.env`).

## How it should work globally

CofiAuth should work silently "behind the scenes", offering pre-made interfaces, scripts (`package.json`), and components ready for work. A developer clones the project, enters the `.env`, changes the project name, adds the base credentials of their self-managed backend or BaaS (like Supabase), and runs `npm run dev` to have a solid login system in less than five minutes.
