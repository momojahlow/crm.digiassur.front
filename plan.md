# Digiassur React — plan d’intégration complète

## Objectif et références
Intégrer dans le template React les catégories du fichier Figma `Digiassur-low-fidelity-wireframe`, préserver la page Épargne déjà développée sur la branche GitHub `work` et fournir un aperçu web interactif. Références de travail :
- Site existant fourni par l’utilisateur : https://digiassur.ma/ — référence complémentaire pour la marque, la navigation et les contenus publics. Lecture seule : ne pas modifier le site en ligne.
- Figma : https://www.figma.com/design/DNh2vAgDQDdvyqaOAmR3bI/Digiassur-low-fidelity-wireframe
- Nœuds demandés : `115:73` pour la demande initiale d’export PNG, et `238:494` fourni ensuite comme repère. Le nœud `238:494` est le frame bureau `Desktop - 9` (1 440 × 1 923 px) du parcours Moto.
- Pages Figma à couvrir : `High-fi Auto & habitation & Loisir`, `Hi-fi Moto & Accident & Epargne`, `high-fi voyage & Santé/Prévoyance`.

## Résultat attendu
- Page d’accueil interactive à `/` avec le langage de marque Digiassur et une navigation vers Auto, Moto, Accident, Habitation, Voyage, Santé/Prévoyance, Épargne et Loisir.
- Pages de catégorie réutilisables et données propres à chaque assurance, avec liens directs vers leur parcours de simulation.
- Formulaire multi-étapes adapté au produit, avec progression, validation, retour/continuer, réinitialisation, choix de formule, récapitulatif et fin de démonstration.
- Préserver la page Épargne existante aux chemins `/epargne` et `/assurance/epargne`.
- Routes statiques déclarées dans `client/public/manus-routes.json`.
- Accueil à visée pédagogique : inviter à comparer garanties, exclusions, franchises, plafonds et modalités; contextualiser les prix indicatifs et identifier clairement les parcours comme des démonstrations locales.
- Créer/pousser uniquement la branche `manus-work`; ne pas modifier `main` et ne pas publier le site.

## Direction visuelle
- **Mouvement :** insurtech marocaine accessible, inspirée de l’intégration Digiassur actuelle et des écrans Figma plutôt que d’un thème générique.
- **Principes :** navigation immédiate et filtrable entre produits; formulaires lisibles et guidés; hiérarchie éditoriale claire; mêmes repères sur bureau et mobile.
- **Couleurs :** bleu/teal pour la confiance, corail/orange pour les actions, blanc pour les formulaires et gris bleuté pour les champs et séparateurs.
- **Mise en page :** navigation compacte à deux niveaux avec un panneau de recherche/filtrage des produits; le niveau supérieur est un bandeau bleu marine de conseil, avec l’invitation « Un conseil ? Nos équipes sont là pour vous. » à gauche et « Parlons de votre projet » à droite. L’accès Espace client reste dans la navigation principale. Pages d’assurance structurées en hero, repères contractuels, éléments à préparer et prochaine étape. Les devis utilisent une barre d’étapes, une zone de formulaire claire et un panneau de confiance.
- **Signatures :** icônes circulaires, surfaces arrondies et nuancées, filtres en pastilles, progression teal et panneaux d’information bien hiérarchisés.
- **Interactions :** recherche tolérante aux accents, filtres clavier accessibles, menus refermables, états actifs visibles, transitions discrètes, validation près du champ, focus clavier visible et respect de `prefers-reduced-motion`.
- **Typographie :** sans-serif nette et compacte, titres robustes, labels courts.
- **Essence de marque :** courtier numérique qui rend les assurances plus accessibles aux particuliers au Maroc; personnalité claire, chaleureuse et réactive.
- **Voix :** rassurante, directe, sans jargon; exemples : « Assurer votre voiture à partir de 153 DHS TTC/Mois » et « Recevez votre attestation à domicile ou au bureau ».
- **Logo :** wordmark Digiassur public; couleur signature corail/orange avec bleu/teal institutionnel.

## Architecture du projet
- `client/src/App.tsx` : accueil, page Épargne héritée, catégories, parcours devis et route introuvable.
- `client/src/lib/insurance-products.ts` : données des huit produits et champs adaptés.
- `client/src/pages/Home.tsx` : accueil et accès aux produits/simulations.
- `client/src/pages/InsuranceProductPage.tsx` : page produit réutilisable.
- `client/src/pages/QuotePage.tsx` et `client/src/components/InsuranceWizard.tsx` : parcours de démonstration multi-étapes.
- `client/src/pages/Epargne.tsx`, `client/src/pages/epargne.css`, `client/src/components/epargne/` : page Épargne originale et ses composants de menu, assistance et pied de page.
- `client/public/images/epargne/` : photos, logos et ressources locales de la page Épargne.
- `client/src/components/` : en-tête, hero, cartes de produits, guide pratique pour lire un contrat, réassurance et pied de page.
- `client/src/pages/digiassur.css` : styles du site et des parcours d’assurance.
- `client/public/manus-routes.json` : routes `/`, `/epargne`, `/assurance/:slug`, `/devis/:slug` et `/404`.

## Page Épargne héritée de la branche `work`
La page Épargne existante provient de captures bureau/mobile fournies antérieurement. Elle conserve un menu Digiassur dédié, une hero partagée photo/panneau bleu, une présentation produit, un carrousel de partenaires, un pied de page et des actions d’assistance adaptées au mobile. Son bouton de simulation ouvre une boîte de dialogue locale, sans envoi backend. Les images et logos restent dans `client/public/images/epargne/` pour être servis localement; les sources publiques d’origine sont documentées dans l’historique du projet.

## Limites produit
Le projet reste un template React/Vite statique (server et database désactivés pour le nouveau parcours). Les nouveaux formulaires sont une démonstration côté navigateur : ils ne créent pas de contrat, ne transmettent pas et ne conservent pas les données saisies. La page Épargne garde son dialogue local. Ne pas imiter un CAPTCHA opérationnel ni afficher une confirmation laissant croire qu’une vraie souscription a été soumise.

## Référence Figma
Le navigateur authentifié a permis d’inspecter le fichier et le frame `238:494`, mais son export PNG n’a pas été transféré dans le sandbox. Le rendu s’appuie donc sur le frame visible et les actifs publics Digiassur; une comparaison pixel par pixel reste à faire si l’export est fourni dans `design-reference/`.
