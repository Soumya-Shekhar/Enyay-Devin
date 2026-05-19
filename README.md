# ENyay - Angular Boilerplate

Industry-standard Angular boilerplate with best practices, built with Angular CLI v21.

## Project Structure

```
src/app/
├── core/                    # Singleton services, guards, interceptors (imported once in AppModule)
│   ├── constants/           # Application-wide constants
│   ├── guards/              # Route guards (Auth, NoAuth, Role)
│   ├── interceptors/        # HTTP interceptors (Auth, Error, Logging)
│   ├── models/              # Core data models and interfaces
│   ├── services/            # Singleton services (Auth, Notification, Storage, Theme)
│   └── core.module.ts
│
├── shared/                  # Reusable components, directives, pipes (imported in feature modules)
│   ├── components/          # Shared UI components (LoadingSpinner, ConfirmDialog, PageNotFound)
│   ├── directives/          # Custom directives (Highlight, DebounceClick, Tooltip)
│   ├── models/              # Shared interfaces
│   ├── pipes/               # Custom pipes (Truncate, SafeHtml, TimeAgo)
│   ├── validators/          # Custom form validators
│   └── shared.module.ts
│
├── layout/                  # Application shell
│   ├── header/              # Top navigation bar
│   ├── sidebar/             # Side navigation
│   ├── footer/              # Footer
│   ├── main-layout/         # Layout wrapper with router outlet
│   └── layout.module.ts
│
├── features/                # Lazy-loaded feature modules
│   ├── home/                # Home page
│   ├── dashboard/           # Dashboard page
│   └── about/               # About page
│
├── app-module.ts            # Root module
├── app-routing-module.ts    # Root routing with lazy loading
├── app.ts                   # Root component
└── app.html
```

## Key Features

- **Modular Architecture**: Core, Shared, Layout, and Feature modules
- **HTTP Interceptors**: Auth token injection, error handling, request logging
- **Route Guards**: Authentication, role-based access control
- **Lazy Loading**: Feature modules loaded on demand
- **Theme Support**: Light/dark theme toggle with CSS variables
- **Shared Components**: Loading spinner, confirm dialog, 404 page
- **Custom Directives**: Highlight, debounce click, tooltip
- **Custom Pipes**: Truncate, safe HTML, time ago
- **Custom Validators**: Password strength, field matching, whitespace check
- **Environment Configs**: Separate dev/prod environment files

## Development Server

```bash
cd enyay-app
npm install
ng serve
```

Navigate to `http://localhost:4200/`.

## Build

```bash
ng build
```

Build artifacts are stored in `dist/`.

## Running Tests

```bash
ng test
```

## Additional Resources

- [Angular CLI Reference](https://angular.dev/tools/cli)
- [Angular Documentation](https://angular.dev)
