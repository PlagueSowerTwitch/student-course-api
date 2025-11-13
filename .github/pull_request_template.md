# StudentCourseAPI - Pull Request Template

## Description

Merci de décrire les changements apportés par cette PR.  
Exemple : correction d’un bug, ajout d’un endpoint `/students`, amélioration de la couverture de tests.

## Contexte / Problème

Explique le contexte ou le problème que cette PR résout.  
Exemple : "La recherche par email ne fonctionnait pas correctement" ou "Ajout de la vérification d’unicité pour les titres de cours".

## Type de changement

- [x] Bugfix
- [x] Nouvelle fonctionnalité
- [x] Amélioration / Refactor
- [x] Documentation
- [x] Tests
- [x] CI/CD / Qualité du code

## Checklist avant de soumettre

- [ ] Mon code suit les standards du projet (ESLint / Prettier)
- [ ] Les tests unitaires et d’intégration sont complets et passent (`npm test`)
- [ ] La couverture de tests est mise à jour
- [ ] Les endpoints Swagger sont documentés correctement
- [ ] Les changements sont intégrés dans la pipeline CI/CD
- [ ] Codacy / SonarQube ne remonte pas d’issues bloquantes
- [ ] Le dépôt reste propre et structuré
- [ ] Les commits sont clairs et descriptifs

## Modifications apportées

Liste des changements principaux :

- Endpoint(s) modifié(s) ou ajouté(s)
- Règles métier mises à jour
- Tests ajoutés / modifiés
- Documentation Swagger mise à jour

---

## Checklist pour les Reviewers

### 📋 Qualité du code

- [ ] Le code suit la convention ESLint du projet (`npm run lint` ne remonte aucune erreur)
- [ ] Le formatage est correct avec Prettier (`npm run format` n'a rien à changer)
- [ ] Pas de code en dur (hardcoded values), pas de `console.log` superflus
- [ ] Les variables/fonctions sont bien nommées et explicites
- [ ] Le code est lisible et maintenable

### ✅ Tests

- [ ] Les tests unitaires passent (`npm test`)
- [ ] Les tests d'intégration passent (`npm test -- --testPathPattern=integration`)
- [ ] La couverture de tests a augmenté ou s'est maintenue
- [ ] Les nouveaux tests couvrent les cas nominaux et les cas limites/erreurs
- [ ] Les mocks sont correctement utilisés

### 🛡️ Logique métier

- [ ] Les règles métier sont correctement implémentées
- [ ] Les validations des données d'entrée sont présentes
- [ ] La gestion des erreurs est appropriée (messages clairs, codes HTTP corrects)
- [ ] Les cas limites sont traités (valeurs null, vides, doublons, etc.)
- [ ] Les performances ne se sont pas dégradées

### 📚 Documentation

- [ ] Les endpoints sont documentés dans Swagger (commentaires JSDoc)
- [ ] Les commentaires expliquent la logique complexe
- [ ] Le README est mis à jour si nécessaire
- [ ] Les schémas de données sont clairs

### 🔄 Intégration continue

- [ ] Les workflows CI/CD passent (badge ✅)
- [ ] Codacy/SonarQube ne remonte pas d'issues bloquantes
- [ ] Aucune régression détectée

### 📦 Structure et organisation

- [ ] Les fichiers sont au bon endroit (contrôleurs, routes, services)
- [ ] Aucun fichier non utilisé n'a été ajouté
- [ ] Les imports sont nécessaires et bien organisés
- [ ] La PR reste focalisée (pas de changements hors scope)

### 🔐 Sécurité et bonnes pratiques

- [ ] Les données sensibles ne sont pas exposées (tokens, mots de passe)
- [ ] Les validations sur les IDs et paramètres sont présentes
- [ ] Pas de vulnérabilités connues dans les dépendances
- [ ] Les bonnes pratiques REST sont respectées

### 💬 Communication

- [ ] La description de la PR est claire et précise
- [ ] Les commits sont clairs et atomiques
- [ ] Le contexte du problème résolu est bien expliqué
- [ ] Les questions/discussions sont constructives

---

**Merci pour cette revue ! 🚀**
