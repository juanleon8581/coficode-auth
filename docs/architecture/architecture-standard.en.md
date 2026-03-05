# Clean Architecture Standard with Next.js (App Router)

To achieve a structure based on Clean Architecture and layers (Domain, Infrastructure, and Presentation) without breaking the Next.js routing (App Router), the recommendation is to leverage the `src/` folder as the root of our logical architecture.

Since Next.js strictly requires the routing folder to be named `app/` (in the root or inside `src/`), we can conceptually treat the `app/` folder as part of the **Presentation** layer, while the rest of the visual and state elements explicitly reside in a `presentation/` folder.

## Proposed Folder Structure

```text
src/
├── app/                  # (Presentation Layer - Next.js Routing)
│   ├── (auth)/           # Logical route groups
│   ├── layout.tsx        # Global/specific layouts
│   ├── page.tsx          # Application pages
│   └── api/              # (Optional) API routes if applicable, act as Controllers
│
├── presentation/         # (Presentation Layer - UI and View Logic)
│   ├── components/       # React Components (Buttons, Forms, Visual Layouts)
│   ├── hooks/            # Custom React Hooks
│   ├── stores/           # Global state management (Zustand, Context, Redux)
│   └── styles/           # Global CSS files, Tailwind configuration, etc.
│
├── domain/               # (Domain Layer - Business Logic and Core Rules)
│   ├── entities/         # Domain types, interfaces, and models (e.g., User.ts)
│   ├── repositories/     # Interfaces that define contracts for Infrastructure (e.g., IUserRepository.ts)
│   └── useCases/         # Application logic or use cases (e.g., registerUser.ts)
│
└── infrastructure/       # (Infrastructure Layer - External Services and Data)
    ├── http/             # HTTP Clients (Axios, Fetch wrappers)
    ├── repositories/     # Concrete implementations of the domain layer (e.g., UserRepositoryImpl.ts)
    └── services/         # Third-party integrations (Firebase, AWS, SDKs, Auth)
```

## Dependency Rules (The Golden Rule)

In Clean Architecture, dependencies must always point inward, toward the Domain layer:

1. **Domain**: Depends on nothing. It must not import packages from React, Next.js, or infrastructure libraries like Axios.
2. **Infrastructure**: Depends on `Domain`. Here we import interfaces from `domain/repositories/` and implement them. Contains external libraries.
3. **Presentation** (`app/` and `presentation/`): Depends on `Domain` and, at the assembly point or Dependency Injection point, on `Infrastructure`. In Next.js, Server Components inside `app/` often inject `infrastructure/` implementations into use cases from `domain/`.

### Why doesn't this structure break Next.js?

By keeping `app/` at `src/app/`, Next.js continues to work with its "File-system based router" without issues. You treat everything related to Server Components (pages, metadata, Server Actions) and routing exclusively in `app/`, while delegating route-agnostic presentation (client components, hooks, UI) to `src/presentation/`.

This structure sets a clear, scalable, and highly robust standard for your future projects.
