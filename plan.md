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

## Active continuation: Épargne page (2026-10-01)

The user supplied a desktop page capture and a long mobile capture for the Digiassur savings landing page. The original Figma viewer returned HTTP 403, but the supplied captures are the design source for this implementation. Add a dedicated `/epargne` route and preserve the existing `/` homepage.

- **Desktop composition:** two-tier header (audience, language, client access, insurance navigation with Épargne active); split hero with the savings photo and blue piggy-bank watermark panel; centered welcome heading; introductory copy beside the savings photo; partner-logo strip; deep-blue multi-column footer; fixed contact shortcuts and Digibot action.
- **Mobile composition:** compact audience/search/menu header and brand/account row; centered blue hero with a decorative piggy-bank motif; floating savings icon between hero and centered heading; full-width intro photo before body copy and CTA; horizontally browsable partner logos; stacked footer; accessible fixed assistance actions.
- **Implementation:** add a dedicated React page and scoped styles, use locally cropped photo panels from the user-supplied desktop screenshot, implement the mobile menu, partner carousel and a no-backend simulation/contact dialog using the contact channels shown in the reference. Do not replace the current home page or invent a backend/data submission flow.
- **Routing:** add `/epargne` and its page title to `client/public/manus-routes.json`; retain `/`, `/404`, and fallback behavior.

## Official public-site assets and destinations

Reference pages: [Digiassur homepage](https://digiassur.ma/) and [Épargne page](https://digiassur.ma/epargne). The live Épargne CTA leads to [https://digiassur.ma/epargne/obtenir-un-devis](https://digiassur.ma/epargne/obtenir-un-devis); the site also displays the monthly starting amount of 120 DHS TTC, while this implementation follows the supplied captures' visible copy and section order. Original locally copied assets: hero photo [https://digiassur.ma/assets/img-front/banner-epargne.jpg](https://digiassur.ma/assets/img-front/banner-epargne.jpg), introduction photo [https://digiassur.ma/assets/img-front/epargne-pic.jpg](https://digiassur.ma/assets/img-front/epargne-pic.jpg), savings watermark [https://digiassur.ma/assets/img/epargne-drawer.png](https://digiassur.ma/assets/img/epargne-drawer.png), Digiassur wordmark [https://digiassur.ma/assets/img/frame-4.svg](https://digiassur.ma/assets/img/frame-4.svg), and partner logos AXA, Allianz, Sanlam, RMA, Assur’Wi and AtlantaSanad from their `https://digiassur.ma/assets/img/` assets. Official visible contacts are `(+212) 522 36 81 82`, `contact@digiassur.ma`, and WhatsApp at [https://api.whatsapp.com/send/?phone=212711454567&text&type=phone_number&app_absent=0](https://api.whatsapp.com/send/?phone=212711454567&text&type=phone_number&app_absent=0). Official social/legal destinations are the Facebook, LinkedIn, Instagram, YouTube and legal links exposed in the live-page footer; use local copies of raster/vector design assets rather than hotlinking image files at runtime.

Partner-logo source URLs retained for traceability: AXA `https://digiassur.ma/assets/img/axa-768-1-2.svg`; Allianz `https://digiassur.ma/assets/img/allianz-2-1-2.svg`; Sanlam `https://digiassur.ma/assets/img/groupe-2798@2x.png`; RMA `https://digiassur.ma/assets/img/rma-1-1.svg`; Assur’Wi `https://digiassur.ma/assets/img/group-138@2x.png`; AtlantaSanad `https://digiassur.ma/assets/img/rectangle-9@2x.png`. Navigation assets include `https://digiassur.ma/assets/img/fluent-vehicle-car-20-regular-4.svg`, `union-4.svg`, `fluent-building-home-20-regular-1.svg`, `vector.svg`, `frame-137-1.svg`, `frame-138-1.svg`, `fluent-money-hand-20-regular.svg`, `fluent-sport-24-regular-1.svg`, and `ri-search-line.svg` under the same `/assets/img/` directory. The header logo is `https://digiassur.ma/assets/img/frame-4.svg`; client/login destination observed in source is `http://new.digiassur.com/connexion`.
