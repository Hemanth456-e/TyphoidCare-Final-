<plan_state>status=done</plan_state>

## Overview
This is a frontend-only Vite React application for a heart-disease federated learning system. It provides a role-selecting login screen and interactive, locally stateful dashboards for administrators, hospitals, and patients. No external services, server routes, schema files, or backend APIs are present in the source.

## Services to resolve

| service | role | source signals | candidate resource type(s) | resolved |
|---|---|---|---|---|

## Routes & pages

| route | page file | purpose | auth required |
|---|---|---|---|
| / | /frontend/pages/Login.tsx | Role-selecting welcome and sign-in page | no |
| /admin | /frontend/pages/AdminDashboard.tsx | Federated learning administration dashboard | no |
| /hospital | /frontend/pages/HospitalDashboard.tsx | Hospital client dashboard | no |
| /patient | /frontend/pages/PatientDashboard.tsx | Patient prediction dashboard | no |

## Component tree

- App (stateful)
  - Login (stateful)
  - AdminDashboard (stateful)
  - HospitalDashboard (stateful)
  - PatientDashboard (stateful)

## Source → target mapping

| source path | target path | class | transform notes |
|---|---|---|---|
| /imported-source/src/Login.css | /frontend/pages/styles/Login.css | A | Byte-identical stylesheet copy. |
| /imported-source/src/Admin.css | /frontend/pages/styles/Admin.css | A | Byte-identical stylesheet copy. |
| /imported-source/src/Hospital.css | /frontend/pages/styles/Hospital.css | A | Byte-identical stylesheet copy. |
| /imported-source/src/User.css | /frontend/pages/styles/User.css | A | Byte-identical stylesheet copy. |
| /imported-source/src/Login.jsx | /frontend/pages/Login.tsx | D | Full TypeScript rewrite to type props and use React Router navigation while preserving interactions and layout. |
| /imported-source/src/Admin.jsx | /frontend/pages/AdminDashboard.tsx | D | Full TypeScript rewrite to type local dashboard state and preserve all admin views. |
| /imported-source/src/Hospital.jsx | /frontend/pages/HospitalDashboard.tsx | D | Full TypeScript rewrite to provide a valid exported page and preserve hospital portal state and views. |
| /imported-source/src/User.jsx | /frontend/pages/PatientDashboard.tsx | D | Full TypeScript rewrite to provide a valid exported page and preserve patient portal state and prediction behavior. |
| /imported-source/src/main.jsx | /frontend/App.tsx | D | Full rewrite from manual role switching to React Router routes and route protection-free navigation. |

## Styling & theming adapters
The source uses standalone global CSS with fixed colors, gradients, and responsive media queries. Port the four corresponding stylesheets unchanged and import them from their owning page components to retain the source visual design.

## Dependency delta
- `lucide-react`: skip — already present in `/frontend/package.json`.
- `react` and `react-dom`: skip — already present in `/frontend/package.json`.
- `react-router-dom`: substitute → `/frontend/App.tsx` for route-level navigation.

## Cut list
- `/imported-source/index.html` — sandbox owns the HTML shell.
- `/imported-source/vite.config.js` — sandbox owns Vite configuration.
- `/imported-source/package.json` — sandbox manifest already supplies required dependencies.
- `/imported-source/README.md` — deployment instructions are source-platform specific.

## Open questions
- The source contains demo-only actions and all state is transient; this fidelity is retained without connecting data storage.

## Phased build order
1. Port the four CSS stylesheets.
2. Port the login and three dashboard page components.
3. Configure routes and application entry wiring.
