# Digiassur React — implementation plan

## Scope
Convert the supplied Figma file `Digiassur low-fidelity-wireframe`, linked at node `115:73`, into a reusable React template. The confirmed requirements are a faithful reproduction of the visible layout, hierarchy and content; maintainable React components; responsive behavior; Figma-derived graphic resources and styles; and implementation of the interactions shown or explicitly specified.

## Source observation and working assumption
The file opens in a read-only Figma view with several desktop and iPhone frames. The supplied node URL does not focus a single canvas object in the available viewer. The first implementation therefore follows the visible Digiassur desktop screen structure: white navigation, a wide lifestyle hero, service/insurance choices, coral calls to action and a deep-blue footer. Exact node-level text and assets remain subject to correction if the selected frame is different.

## Design direction
- **Design movement:** contemporary French insurtech with an editorial, human-centered service interface.
- **Core principles:** reassuring, clear, warm, and action-oriented.
- **Color philosophy:** deep navy conveys reliability; coral highlights the next helpful action; white and pale blue-gray keep dense insurance content calm and legible.
- **Layout paradigm:** full-width image-led hero with content anchored to a centered service-selector panel, followed by asymmetric editorial sections and a substantial navy footer.
- **Signature elements:** coral pill-shaped CTA; soft-radius white service cards with small icon badges; a navy footer band with grouped contact and help links.
- **Interaction philosophy:** simple, reversible selection states; navigation stays obvious; key CTAs scroll users to relevant insurance choices; mobile navigation expands and closes with accessible controls.
- **Animation:** short 160–220 ms opacity/transform transitions for menu and card states; respect `prefers-reduced-motion`; no distracting looping effects.
- **Typography system:** Inter (if already supplied by the project/runtime) or a clean system sans fallback; generous display sizing, compact labels, strong contrast and readable French body copy.
- **Brand essence:** insurance for everyday life made easier to understand and compare; personality: reassuring, straightforward, human.
- **Brand voice:** direct and helpful, never alarmist. Examples: “Votre quotidien, bien protégé.” and “Choisissez une protection qui vous ressemble.”
- **Wordmark & logo:** a compact shield/house-line icon paired with the Digiassur wordmark; authored as inline SVG so it remains crisp and reusable.
- **Signature brand color:** coral `#F28E7F`, paired with navy `#123B5A` and pale blue `#EAF4F7`.

## Project structure
- `client/src/pages/Home.tsx`: page composition and lightweight local interactions.
- `client/src/components/`: reusable header, hero, insurance selector, feature sections and footer.
- `client/src/index.css`: responsive design tokens, typography, layout and interaction states.
- `client/public/images/hero-home.jpg`: original hero photograph used only in the hero.
- `client/public/manus-routes.json`: static route manifest for the current `/` page.

## Runtime
The initialized project is a React/TypeScript WebDev starter with server and database disabled. Use its static Vite development command on the configured port 3000; no authentication, private API, or persistent data is needed for this template.
