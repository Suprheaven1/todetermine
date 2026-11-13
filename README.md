# Présence — magnétisme & pratiques énergétiques

Site vitrine React + Vite, en français. **Présence est un nom provisoire.** Palette bleu nuit / mauve, animation orbitale CSS, six pratiques dépliantes, six photographies fournies, galerie modale, FAQ et formulaire de contact sans téléphone.

## Démarrage

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Le dossier `dist` est autonome après compilation. `base: './'` permet la publication dans le sous-répertoire du dépôt sur GitHub Pages.

## Publication GitHub Pages

Le workflow `.github/workflows/pages.yml` compile et publie lors d'un push sur `main`. Dans Settings → Pages → Build and deployment, choisir **GitHub Actions**. Cette sélection nécessite l'accès administrateur GitHub. Le push du code ne garantit pas à lui seul que Pages est activé.

## Configurer le contact

Aucun destinataire fictif n'est utilisé et aucun message n'est envoyé dans la configuration initiale. Un statut explicite le confirme. Le formulaire contrôle prénom, e-mail, message et accord de traitement. Aucun numéro de téléphone n'est demandé.

1. Choisir l'adresse e-mail professionnelle et un prestataire de formulaires acceptant les requêtes POST `FormData` avec réponse JSON et CORS (par exemple Formspree), ou créer son propre endpoint.
2. Configurer et vérifier l'adresse destinataire chez ce prestataire.
3. En local, copier `.env.example` en `.env.local`, puis renseigner `VITE_CONTACT_ENDPOINT` avec l'URL HTTPS du formulaire.
4. Pour GitHub Pages, définir la variable du dépôt `VITE_CONTACT_ENDPOINT` dans Settings → Secrets and variables → Actions → Variables, puis relancer le workflow.
5. Vérifier la réception réelle d'un message et compléter la notice de confidentialité : prestataire, finalité, durée de conservation, droits et contact.

`VITE_` est public dans le navigateur : ne jamais y mettre de clé API secrète. Le serveur choisi doit gérer validation, anti-spam et limitation de débit; le honeypot côté interface ne suffit pas à lui seul. Une réponse HTTP réussie confirme l'acceptation du prestataire, pas la livraison définitive de l'e-mail.

## PHP : utile ?

PHP ne change pas la qualité du design et n'est pas exécuté par GitHub Pages. Pour cette vitrine, React, JavaScript et CSS suffisent. PHP deviendrait pertinent avec un hébergement compatible et un besoin serveur, par exemple un envoi SMTP sécurisé. Une fonction serveur JavaScript serait aussi possible. Ne pas multiplier les langages sans nécessité.

## Personnaliser avant ouverture commerciale

- Remplacer le nom provisoire dans `index.html`, `src/main.jsx` et `DESIGN.md`.
- Compléter identité professionnelle, mentions de l'éditeur et de l'hébergeur, modalités, tarifs et confidentialité. La fenêtre actuelle signale honnêtement les éléments manquants; elle n'est pas une page juridique finalisée.
- Confirmer l'autorisation de publier chaque photographie.
- Les captures sont présentées comme illustrations logicielles, sans diagnostic, garantie ou preuve de guérison. Aucun avant/après n'est inventé.

## Design et vérifications

Les neuf sections de `DESIGN.md` documentent l'intention. Navigation clavier, contrôles natifs, focus visible, champs étiquetés, réduction des animations via `prefers-reduced-motion`, grille mobile et dialogue natif avec fermeture Échap.

Build de production vérifié. Parcours bureau inspecté dans un vrai navigateur : accueil, galerie et formulaire non configuré. Le navigateur CLI local n'a pas pu démarrer dans cet environnement; l'audit exact à 390 × 844 reste à exécuter avec les commandes suivantes dans un environnement disposant de Playwright CLI.

```sh
playwright-cli open http://localhost:5173
playwright-cli snapshot
playwright-cli resize 1440 900
playwright-cli screenshot
playwright-cli resize 390 844
playwright-cli snapshot
playwright-cli screenshot
```

Contrôler : absence de débordement horizontal, menu mobile, dépliants, agrandissement et fermeture clavier des images, champs obligatoires et message explicite sans endpoint. Refaire les contrôles sur la version compilée (`npm run preview`, port indiqué par Vite).

Polissage appliqué : halo lent au lieu de symboles inquiétants; pratiques en liste éditoriale plutôt qu'en cartes répétitives; zone contact ivoire pour créer une respiration et faciliter la lecture.
