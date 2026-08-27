# CardioFed — Heart Disease Prediction (Frontend Demo)

A **frontend-only** React + Vite prototype for a federated-learning heart disease
prediction platform, with three role-based portals: **Admin**, **Hospital / Client**,
and **User / Patient**.

There is no backend, database, API, authentication server, or real ML/FL model here.
All data comes from `src/data/sampleData.js`, and predictions are computed with a
simple local scoring function in `src/pages/patient/Prediction.jsx` purely for demo
purposes.

## Getting started locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Building for production

```bash
npm install
npm run build
```

This outputs a static site to `dist/`. Preview it locally with:

```bash
npm run preview
```

## Logging in

On the login screen, enter **any** username/email and password, pick a role from the
**"Login as"** dropdown (Admin, Hospital / Client, or User / Patient), and click
**Login**. You'll be dropped straight into that role's dashboard — no code edits
needed. Use **Logout** in the sidebar to return to the login screen and switch roles.

## Project structure

```
src/
  components/     Shared UI building blocks (Login, Shell, Sidebar, Header,
                  StatCard, Panel, Workflow, HospitalCard, ActivityFeed, SettingsPage)
  pages/
    admin/        Dashboard, Hospitals, Hospital detail, FL Monitoring,
                  Global Model, Performance, Users
    hospital/     Dashboard, Local Training, Model Updates, FL Activity, Global Model
    patient/      Dashboard, Prediction, Prediction History, About Project, Profile
  data/
    sampleData.js All demo/sample data used across the app
  App.jsx         Role-based state, navigation, and page routing (no react-router;
                  plain useState drives the current page)
  index.css       Design system (colors, layout, components) for the whole app
```

## Deploying on Render

1. Push this project to a GitHub repository.
2. In Render, create a new **Static Site** from that repo.
3. **Build Command:** `npm install && npm run build`
4. **Publish Directory:** `dist`
5. Deploy — Render will serve the contents of `dist/`.

## Notes

- Icons are from [`lucide-react`](https://lucide.dev/).
- No routing library is used; navigation is handled with React state
  (`currentPage`) inside `App.jsx`, matching the "no manual code edits to switch
  roles" requirement.
- Everything shown (hospitals, metrics, activity, users, prediction history) is
  static sample data meant to make the UI feel alive — none of it is live or real.
