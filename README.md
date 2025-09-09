# Plateforme eLearning - Frontend React

[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![Axios](https://img.shields.io/badge/Axios-1.3-green)](https://axios-http.com/)
[![React Router](https://img.shields.io/badge/React_Router-6.8-lightgrey)](https://reactrouter.com/)

## 📝 Table des matières
- [Contexte et objectifs](#-contexte-et-objectifs)
- [Fonctionnalités](#-fonctionnalités)
- [Structure du projet](#-structure-du-projet)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Endpoints API](#-endpoints-api)
- [Contribuer](#-contribuer)
- [Licence](#-licence)

## 🌍 Contexte et objectifs

### Contexte
Ce projet est le frontend React d'une plateforme eLearning qui s'interconnecte avec une API REST Laravel. L'application permet la gestion complète des cours, mentors, élèves, catégories et tags.

### Objectifs
- Développer une SPA (Single Page Application) avec React.js
- Consommer les endpoints de l'API Laravel
- Créer des interfaces utilisateur intuitives
- Implémenter une gestion robuste des erreurs

## 🚀 Fonctionnalités

### Principales
- 📚 Gestion des cours (CRUD complet)
- 🏷️ Gestion des catégories et tags
- 🔍 Filtrage et recherche des cours
- 📊 Tableau de bord statistique

### Techniques
- 🛣️ Navigation avec React Router
- 🔄 Gestion des états avec React Hooks
- ⚡ Optimisation des performances
- 🛡️ Gestion des erreurs API

## 🗂️ Structure du projet

```
src/
├── components/
│   ├── common/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx
│   │   └── ErrorMessage.jsx
│   ├── courses/
│   │   ├── CourseCard.jsx
│   │   ├── CourseList.jsx
│   │   └── CourseForm.jsx
│   ├── categories/
│   │   │   └── CategoryList.jsx
│   ├── pages/
│   ├── Home.jsx
│   ├── Courses.jsx
│   ├── CourseDetail.jsx
│   ├── Categories.jsx
│   └── Stats.jsx
├── services/
│   └── api.js
└── App.jsx
```

## ⚙️ Installation

1. **Cloner le dépôt**
```bash
git clone https://github.com/MouadHallaffou/eLearning_platform_frontend.git
cd eLearning_platform_frontend/frontend
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer l'application**
```bash
npm run dev
```

## 🔧 Configuration

Créer un fichier `.env` à la racine du projet frontend :
```ini
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=plateforme_mentorat
VITE_APP_ENV=development
```
> **Note**  
> `VITE_APP_NAME` définit le nom affiché de l'application dans l'interface utilisateur et peut être utilisé pour la personnalisation du branding, (ex: "MentoratPro", "eLearningAcademy", etc.)

## 🌐 Endpoints API

| Fonctionnalité | Méthode | Endpoint |
|----------------|---------|----------|
| Liste des cours | GET | `/api/courses` |
| Détail d'un cours | GET | `/api/courses/{id}` |
| Créer un cours | POST | `/api/courses` |
| Modifier un cours | PUT | `/api/courses/{id}` |
| Supprimer un cours | DELETE | `/api/courses/{id}` |
| Liste des catégories | GET | `/api/category` |
| Détail catégorie | GET | `/api/category/{id}` |
| Créer une catégorie | POST | `/api/category` |
| Modifier une catégorie | PUT | `/api/category/{id}` |
| Supprimer une catégorie | DELETE | `/api/category/{id}` |
| Liste des tags | GET | `/api/tag` |
| Détail d'un tag | GET | `/api/tag/{id}` |
| Créer un tag | POST | `/api/tag` |
| Modifier un tag | PUT | `/api/tag/{id}` |
| Supprimer un tag | DELETE | `/api/tag/{id}` |

## 🤝 Contribuer

1. Forker le projet
2. Créer une branche (`git checkout -b feature/ma-nouvelle-fonctionnalite`)
3. Commiter vos changements (`git commit -am 'Ajout d'une super fonctionnalité'`)
4. Pusher vers la branche (`git push origin feature/ma-nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📜 Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

<div align="center">
  <p>Développé avec ❤️ par Mouad Hallaffou</p>
</div>
