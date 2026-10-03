# Digiassur React Template

Template React / TypeScript / Vite pour Digiassur. Il comprend une page d’accueil, huit parcours d’assurance, une page Épargne détaillée héritée de la branche `work` et des formulaires de simulation locaux. Le style reprend les catégories et le langage visuel du site `digiassur.ma` et du fichier Figma Digiassur.

## Lancer l’aperçu

```bash
pnpm install
pnpm dev:static
```

Le site s’ouvre sur le port 3000. Pour produire les fichiers statiques et lancer les diagnostics TypeScript :

```bash
pnpm build:static
pnpm check
```

## Pages

- `/` : accueil avec recherche et filtres par besoin, puis accès aux assurances.
- Le menu « Nos assurances » propose la même recherche et les mêmes filtres, sur ordinateur et mobile; la navigation est partagée avec la page Épargne.
- `/assurance/:slug` : pages Auto, Moto, Accident, Habitation, Voyage, Santé/Prévoyance, Épargne et Loisir, avec repères de comparaison et parcours de démonstration. La route Épargne ouvre la page détaillée existante.
- `/epargne` : accès direct à la page Épargne héritée de la branche `work`.
- `/devis/:slug` : parcours de simulation adapté à la catégorie.

Les simulations comportent quatre étapes — Assuré, détails du produit, Formule, Confirmation — avec validation, progression, retour, réinitialisation et récapitulatif. Elles restent des démonstrations front-end : aucun tarif réel n’est calculé, aucune demande n’est envoyée à Digiassur ou à un assureur et les réponses ne sont pas enregistrées. La boîte de dialogue de simulation de la page Épargne est également locale.

## Architecture

Les données des produits et les définitions de champs vivent dans `client/src/lib/insurance-products.ts`. Les routes sont dans `client/src/App.tsx`, le wizard dans `client/src/components/InsuranceWizard.tsx`, le guide de lecture d’un contrat dans `client/src/components/InsuranceSelectionGuide.tsx` et les styles dans `client/src/pages/digiassur.css`. La page Épargne et ses ressources sont dans `client/src/pages/Epargne.tsx`, `client/src/pages/epargne.css`, `client/src/components/epargne/` et `client/public/images/epargne/`. Le manifeste `client/public/manus-routes.json` déclare les routes de l’aperçu.

Le serveur Express, tRPC et la base de données hérités du starter ne sont pas activés pour cette intégration statique.
