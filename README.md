# Digiassur React Template

React / Express / tRPC / Drizzle starter, adapted from the Sandbox web-db-user template.

- `pnpm dev:static`: run the React/Vite site on port 3000.
- `pnpm build:static`: build the static frontend into `dist/public/`.
- `pnpm check` / `pnpm test`: run the TypeScript and application checks.

Start with the Webdev skill's default-template guide. Platform login, storage, payments and service contracts live in its shared references; read the relevant capability before extending its helper.

`server/` and database files are inherited from the starter but are not used by this front-end-only template. The insurance selector and mobile navigation run locally in React; no customer data is submitted or stored.

`server/_core/publicConfig.ts` exposes only named public runtime values. Private keys stay server-side. The platform serves managed `/manus-storage/` assets; the application does not register a second proxy.

Platform configuration is readable and editable through `webdev.config`. Default settings are initial values, not enforced constraints. The agent may modify the files, commands and configuration or follow the flexible guide for another stack.
