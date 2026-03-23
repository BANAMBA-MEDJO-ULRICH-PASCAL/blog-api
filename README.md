# Blog API

Une API REST backend pour la gestion d'articles de blog, développée avec Node.js, Express et SQLite.

## Technologies utilisées

- **Node.js** — Environnement d'exécution JavaScript
- **Express** — Framework web pour Node.js
- **SQLite** — Base de données relationnelle légère
- **Sequelize** — ORM pour la gestion de la base de données
- **Dotenv** — Gestion des variables d'environnement

## Installation

### Prérequis
- Node.js (v18 ou supérieur)
- npm

### Étapes

1. Cloner le dépôt :
```bash
git clone https://github.com/BANAMBA-MEDJO-ULRICH-PASCAL/blog-api.git
cd blog-api
```

2. Installer les dépendances :
```bash
npm install
```

3. Créer le fichier `.env` à la racine :
```
PORT=3000
DB_STORAGE=./database.sqlite
```

4. Démarrer le serveur :
```bash
# En développement
npm run dev

# En production
npm start
```

## Endpoints

### Créer un article
```
POST /api/articles
```
**Corps de la requête :**
```json
{
  "titre": "Mon article",
  "contenu": "Contenu de l'article",
  "auteur": "Ulrich",
  "categorie": "Technologie",
  "tags": ["node", "api"]
}
```
**Réponse (201) :**
```json
{
  "message": "Article créé avec succès",
  "article": { "id": 1, "titre": "Mon article", "..." : "..." }
}
```

### Lire tous les articles
```
GET /api/articles
```
**Filtres optionnels :**
```
GET /api/articles?categorie=Technologie
GET /api/articles?auteur=Ulrich
GET /api/articles?date=2026-03-23
```

### Lire un article par ID
```
GET /api/articles/:id
```
**Réponse (200) :**
```json
{
  "article": { "id": 1, "titre": "Mon article", "..." : "..." }
}
```

### Modifier un article
```
PUT /api/articles/:id
```
**Corps de la requête :**
```json
{
  "titre": "Titre modifié",
  "contenu": "Contenu modifié",
  "categorie": "Développement"
}
```

### Supprimer un article
```
DELETE /api/articles/:id
```
**Réponse (200) :**
```json
{
  "message": "Article supprimé avec succès"
}
```

### Rechercher des articles
```
GET /api/articles/search?query=texte
```
**Réponse (200) :**
```json
{
  "articles": [{ "id": 1, "titre": "...", "..." : "..." }]
}
```

## Codes HTTP utilisés

| Code | Signification |
|------|---------------|
| 200  | Succès |
| 201  | Création réussie |
| 400  | Requête mal formée |
| 404  | Article non trouvé |
| 500  | Erreur serveur |

## Auteur

BANAMBA MEDJO ULRICH PASCAL — INF222 - TAF1