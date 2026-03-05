# Clean Architecture & App Router

## High-Level Architecture

This project utilizes Clean Architecture integrated with the Next.js App Router.

- **Presentation (`src/app/`, `src/presentation/`)**: Contains Next.js routing, UI components, custom hooks, and global state. Depends on Domain and Infrastructure layers.
- **Domain (`src/domain/`)**: Emphasizes business logic, containing Entities, Repository interfaces, and Use Cases. Strictly no external dependencies.
- **Infrastructure (`src/infrastructure/`)**: Contains concrete implementations of domain repositories, HTTP clients, and third-party APIs/services. Depends strictly on the Domain layer.
