# StudentCourseAPI

Projet pédagogique pour le module **Tests et Qualité** à l’Efrei.

## Contexte

Ce projet back-end (Node.js/Express) sert de base pour l’évaluation finale du module.  
L’objectif est d’améliorer la qualité du code et la couverture de tests à partir d’un projet existant.

## Objectifs pour les étudiants

- **Appliquer les standards de qualité** : linters (ESLint), formatage (Prettier), bonnes pratiques.
- **Intégrer des outils d’analyse statique** : exemple : SonarQube, Codacy.
- **Réaliser une revue de code collaborative** et la documenter.
- **Mettre en place une suite de tests automatisés** (unitaires et intégration) avec Jest, Mocha ou Cypress.
- **Intégrer les tests dans une pipeline CI/CD** (GitHub Actions).
- **Gérer la couverture de tests**.
- **Compléter la documentation technique** : installation, architecture, endpoints API, guides d’usage.
- **Finaliser la documentation Swagger** (manuelle ou automatique).
- **Fournir un dépôt Git propre, structuré et commenté**.

## Fonctionnalités

- Gestion des étudiants et des cours (création, modification, suppression, inscription).
- Règles métier : unicité email/titre, pagination, recherche, suppression protégée, etc.
- API REST documentée avec Swagger.

## À faire

- Corriger et compléter les tests existants.
- Ajouter de nouveaux tests pour améliorer la couverture.
- Mettre en place ESLint et Prettier.
- Intégrer la vérification de qualité et les tests dans la CI.
- Finaliser la documentation Swagger.
- Intégrer Codacy comme outil d’analyse statique
- Ajouter un template de Pull Request (.github/pull_request_template.md).
- Produire une Pull Request bien documentée avec des messages de commits pertinents.
- Rédiger une documentation technique complète (Markdown ou générateur).
- Fournir un dépôt Git propre, lisible et bien organisé.

## Démarrage rapide

```sh
npm install
npm run dev
```

- Accès à la documentation Swagger : `/api-docs`
- Lancer les tests : `npm test`
- Linter : `npm run lint`
- Formatage : `npm run format`

---

**À vous de jouer pour améliorer la qualité et la fiabilité du projet !**

---

# Guide complet du projet

## Présentation

StudentCourseAPI est une API REST Node.js/Express permettant de gérer des étudiants et des cours, conçue pour l’apprentissage des bonnes pratiques de qualité logicielle et de tests automatisés.

## Fonctionnalités principales
- CRUD étudiants et cours
- Inscription d’un étudiant à un cours
- Règles métier : unicité email/titre, pagination, recherche, suppression protégée
- Documentation Swagger accessible sur `/api-docs`
- Couverture de tests avec Jest
- Intégration continue via GitHub Actions

## Structure du projet
```
student-course-api/
├── src/
│   ├── app.js                # Point d’entrée Express
│   ├── controllers/          # Logique métier
│   ├── routes/               # Définition des routes
│   └── services/             # Stockage et utilitaires
├── tests/                    # Tests unitaires et d’intégration
├── swagger.json              # Documentation OpenAPI
├── swaggerDef.js             # Définition Swagger
├── .eslintrc.js              # Configuration ESLint
├── .prettierrc               # Configuration Prettier
├── .github/                  # CI/CD et templates PR
├── coverage/                 # Rapport de couverture
└── README.md                 # Documentation
```

## Installation

1. Cloner le dépôt :
   ```sh
   git clone <url-du-repo>
   cd student-course-api
   ```
2. Installer les dépendances :
   ```sh
   npm install
   ```

## Lancement du serveur

- En mode développement :
  ```sh
  npm run dev
  ```
- Par défaut, le serveur écoute sur le port 3000 (modifiable via la variable d’environnement `PORT`).

## Endpoints principaux

- `GET /students` : liste paginée des étudiants
- `POST /students` : ajouter un étudiant
- `GET /courses` : liste paginée des cours
- `POST /courses` : ajouter un cours
- `POST /students/:id/courses/:courseId` : inscrire un étudiant à un cours
- Voir `/api-docs` pour la documentation complète (Swagger)

## Tests et qualité

- Lancer tous les tests :
  ```sh
  npm test
  ```
- Vérifier la qualité du code :
  ```sh
  npm run lint
  npm run format
  ```
- Consulter la couverture :
  Ouvrir `coverage/lcov-report/index.html` dans un navigateur.

## Bonnes pratiques

- Respecter la structure des dossiers
- Utiliser des messages de commit clairs et précis
- Documenter les Pull Requests
- Maintenir une documentation technique à jour
- Corriger les erreurs ESLint et Prettier
- Ajouter des tests pour chaque nouvelle fonctionnalité

## CI/CD

- Les workflows GitHub Actions vérifient la qualité et les tests à chaque push/pull request
- Un template de PR est disponible dans `.github/pull_request_template.md`

## Ressources utiles
- [Express.js](https://expressjs.com/)
- [Jest](https://jestjs.io/)
- [Swagger](https://swagger.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

---

Pour toute question ou amélioration, n’hésitez pas à ouvrir une issue ou une Pull Request sur le dépôt GitHub.

