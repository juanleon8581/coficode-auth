# Estándar de Arquitectura Limpia con Next.js (App Router)

Para lograr una estructura basada en Arquitectura Limpia y capas (Domain, Infrastructure y Presentation) sin romper el enrutamiento de Next.js (App Router), la recomendación es aprovechar la carpeta `src/` como raíz de nuestra arquitectura lógica.

Dado que Next.js requiere obligatoriamente que la carpeta de rutas se llame `app/` (en la raíz o dentro de `src/`), podemos tratar conceptualmente a la carpeta `app/` como parte de la capa **Presentation**, mientras que el resto de los elementos visuales y de estado residen explícitamente en una carpeta `presentation/`.

## Estructura de Carpetas Propuesta

```text
src/
├── app/                  # (Capa Presentation - Enrutamiento Next.js)
│   ├── (auth)/           # Grupos de rutas lógicas
│   ├── layout.tsx        # Layouts globales/específicos
│   ├── page.tsx          # Páginas de la aplicación
│   └── api/              # (Opcional) Rutas API si aplican, actúan como Controladores
│
├── presentation/         # (Capa Presentation - UI y Lógica de Vista)
│   ├── components/       # Componentes React (Botones, Formularios, Layouts visuales)
│   ├── hooks/            # Custom Hooks de React
│   ├── stores/           # Manejo de estado global (Zustand, Context, Redux)
│   └── styles/           # Archivos CSS globales, configuración de Tailwind, etc.
│
├── domain/               # (Capa Domain - Lógica de Negocio y Reglas Core)
│   ├── entities/         # Tipos, interfaces y modelos de dominio (ej: User.ts)
│   ├── repositories/     # Interfaces que definen los contratos para Infraestructura (ej: IUserRepository.ts)
│   └── useCases/         # Lógica de aplicación o casos de uso (ej: registerUser.ts)
│
└── infrastructure/       # (Capa Infrastructure - Servicios Externos y Datos)
    ├── http/             # Clientes HTTP (Axios, Fetch wrappers)
    ├── repositories/     # Implementaciones concretas de la capa de domininio (ej: UserRepositoryImpl.ts)
    └── services/         # Integraciones con terceros (Firebase, AWS, SDKs, Auth)
```

## Reglas de Dependencia (La Regla de Oro)

En Arquitectura Limpia, las dependencias siempre deben apuntar hacia adentro, hacia la capa de Dominio:

1. **Domain**: No depende de nada. No debe importar paquetes de React, Next.js, ni librerías de infraestructura como Axios.
2. **Infrastructure**: Depende de `Domain`. Aquí importamos interfaces de `domain/repositories/` y las implementamos. Contiene librerías externas.
3. **Presentation** (`app/` y `presentation/`): Depende de `Domain` y, en el punto de ensamblaje o Inyección de Dependencias, de `Infrastructure`. En Next.js, Server Components dentro de `app/` a menudo inyectan las implementaciones de `infrastructure/` a los Casos de Uso del `domain/`.

### ¿Por qué esta estructura no rompe Next.js?

Al mantener `app/` en `src/app/`, Next.js sigue funcionando con su "File-system based router" sin problemas. Tratas a todo lo relacionado a Server Components (páginas, metadatos, Server Actions) y enrutamiento exclusivamente en `app/`, mientras que delegas la presentación agnóstica de rutas (componentes clientes, hooks, UI) a `src/presentation/`.

Esta estructura sienta un estándar claro, escalable y muy robusto para tus futuros proyectos.
