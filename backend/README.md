# Plateforme de Partage de Connaissances - API RESTful

## Contexte du Projet

### Contexte
Une entreprise souhaite développer une plateforme en ligne permettant aux utilisateurs de partager des connaissances, de se former mutuellement et de suivre leurs progrès. L'API REST servira de backend pour des applications web et mobiles, offrant une expérience utilisateur sécurisée et performante.

### Objectifs
- Développer une API RESTful avec Laravel 11 pour gérer les cours, mentors, élèves, communautés, catégories, sous-catégories et tags
- Permettre aux utilisateurs de créer des cours, s'inscrire à des formations, suivre leur progression et obtenir des badges
- Fournir une interface d'administration sécurisée pour la gestion des ressources pédagogiques
- Concevoir des endpoints structurés pour les opérations CRUD sur toutes les entités
- Implémenter un système d'authentification robuste pour protéger les données sensibles
- Gérer efficacement les rôles et permissions (administrateurs, mentors, élèves)
- Intégrer un système de notifications pour informer les utilisateurs des mises à jour importantes

---

## Fonctionnalités Principales

### 1. Gestion des Cours
- Création et gestion complète de cours par les mentors (nom, description, durée, niveau de difficulté)
- Association des cours aux catégories et sous-catégories appropriées
- Gestion des statuts de cours (ouvert, en cours, terminé)
- Système d'inscription et suivi de progression pour les élèves
- Fonctionnalité de tagging pour faciliter la recherche et la classification
- Support pour l'intégration de multiples vidéos pédagogiques par cours

### 2. Gestion des Vidéos
- Interface pour l'ajout et la gestion de vidéos par les mentors
- Association des vidéos à des cours spécifiques avec métadonnées (titre, description, URL)
- Système de visionnage sécurisé pour les élèves inscrits aux cours correspondants
- Fonctionnalités administratives complètes de gestion des ressources vidéo

### 3. Gestion des Catégories et Sous-Catégories
- Structure hiérarchique de classification des cours
- Relation one-to-many entre catégories et sous-catégories
- Interface d'administration pour la gestion complète de la taxonomie

### 4. Gestion des Tags
- Système de tagging flexible pour améliorer la découvrabilité des cours
- Association many-to-many entre cours et tags
- Interface d'administration pour la gestion des tags

### 5. Statistiques et Analytique
- Tableau de bord affichant la distribution des cours par statut
- Visualisation de la répartition des cours par catégories et sous-catégories
- Métriques d'engagement et de complétion des cours

### 6. Bonnes Pratiques
- Validation rigoureuse des données pour garantir l'intégrité et prévenir les attaques
- Gestion standardisée des erreurs avec codes HTTP appropriés et messages explicites
- Documentation complète des endpoints via Swagger

---

## Spécifications Techniques

### Technologies
- **Framework** : Laravel 11
- **Base de données** : MySQL
- **Authentification** : JWT
- **Gestion des dépendances** : Composer
- **Architecture** : Service Repository Pattern
- **Tests** : Pest pour les tests unitaires et fonctionnels
- **Documentation** : L5-Swagger or Postman

### Structure des Endpoints API
#### Courses
- `GET /api/course` : Récupération de tous les cours (avec pagination)
- `GET /api/course/{id}` : Récupération des détails d'un cours spécifique
- `POST /api/course` : Création d'un nouveau cours
- `PUT /api/course/{id}` : Mise à jour d'un cours existant
- `DELETE /api/course/{id}` : Suppression d'un cours

#### Categories
- `GET /api/category` : Récupération de toutes les catégories
- `GET /api/category/{id}` : Récupération des détails d'une catégorie
- `POST /api/category` : Création d'une nouvelle catégorie
- `PUT /api/category/{id}` : Mise à jour d'une catégorie
- `DELETE /api/category/{id}` : Suppression d'une catégorie

#### Tags
- `GET /api/tag` : Récupération de tous les tags
- `GET /api/tag/{id}` : Récupération des détails d'un tag
- `POST /api/tag` : Création d'un nouveau tag
- `PUT /api/tag/{id}` : Mise à jour d'un tag
- `DELETE /api/tag/{id}` : Suppression d'un tag

#### Statistiques
- `GET /api/v1/stats/courses` : Statistiques globales sur les cours
- `GET /api/v1/stats/categories` : Analyse de la distribution par catégories
- `GET /api/v1/stats/tags` : Analyse de l'utilisation des tags

---

## Déploiement et Configuration

### Prérequis
- PHP 8.1 ou supérieur
- Composer
- MySQL 8.0 ou PostgreSQL 14
- Node.js (pour la compilation des assets frontend si nécessaire)

### Procédure d'Installation
1. **Clonage du dépôt**
   ```bash
   git clone https://github.com/MouadHallaffou/eLearning_plaftorm_frontend.git
   cd eLearning_plaftorm_frontend/backend 
   ```
2. **Installation des dépendances**
   ```bash
   composer install
   ```
3. **Configuration de l'environnement**
   - Création et configuration du fichier d'environnement
   ```bash
   cp .env.example .env
   ```
   - Configuration des paramètres de connexion à la base de données et autres variables d'environnement

4. **Génération de la clé d'application**
   ```bash
   php artisan key:generate
   ```
5. **Exécution des migrations et seeders**
   ```bash
   php artisan migrate --seed
   ```

### Lancement du serveur de développement
```bash
php artisan serve
```