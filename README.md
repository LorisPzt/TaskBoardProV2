# TaskBoardProV2

Projet Angular pour une application de gestion de tâches avec routing lazy loading et architecture réactive.

## Description
Application Angular moderne avec gestion complète de tâches. Utilise une architecture basée sur les features, le lazy loading pour les routes, et une approche réactive avec RxJS pour la gestion des données.

## Prérequis
- Node.js (version 18+)
- npm (version 9+)
- Angular CLI (version 21)

## Installation
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/LorisPzt/TaskBoardProV2.git
   cd TaskBoardProV2
   ```
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Lancer l'application :
   ```bash
   npm start
   ```
   L'application sera disponible sur `http://localhost:4200/`

## Structure du projet

```
src/app/
├── core/
│   └── services/
│       └── task.ts          ← Service TaskService avec BehaviorSubject
├── features/
│   └── tasks/
│       ├── task/            ← Composant réutilisable pour une tâche
│       └── task-highlight/  ← Composant dynamique pour mise en avant
├── pages/
│   ├── home/                ← Page d'accueil
│   ├── about/               ← Page à propos
│   └── tasks/               ← Page de gestion des tâches
├── shared/
│   ├── header/              ← Composant header avec navigation
│   └── footer/              ← Composant footer
└── app.routes.ts            ← Configuration des routes lazy loading
```

## Routing
Routes principales disponibles avec lazy loading :
- `"/"` ou `"/home"` — Page d'accueil
- `"/about"` — Page à propos (accessible via le footer)
- `"/tasks"` — Page de gestion des tâches

### Lazy Loading
Toutes les routes utilisent le lazy loading pour optimiser les performances :
```typescript
{
  path: 'tasks',
  loadComponent: () => import('./pages/tasks/tasks').then(m => m.Tasks)
}
```

**Avantages :**
- Réduction du bundle initial
- Temps de chargement plus rapide
- Meilleure expérience utilisateur

## Séquence 2 - Logique réactive du flux de données

### 1. Structure de flux
- Le service `TaskService` utilise un `BehaviorSubject` pour stocker et émettre la liste des tâches.
- Le composant 'Home' s'abonne à ce flux via 'task$' et le **pipe async** pour afficher les tâches.

### 2. Mise à jour des données

- La méthode 'addTask()' ajout une tâche puis appelle 'next()' pour émettre la nouvelle liste.
- La méthode 'removeTask()' supprime une tâche puis émet la liste mise à jour.
- La vue est automatiquement réactualisée sans rechargement

### 3. Points clés retenus

- Pas besoin d'appeler 'getTasks()' à chaque fois : la donnée est 'vivante'.
- '| async' gère l'abonnement et la désinscription automatiquement.
- Le flux reste cohérent entre le service et la vue .

## Séquence 3 - Lazy Loading & Composants dynamiques

### Lazy Loading
Technique qui charge le code d'une route uniquement quand l'utilisateur y accède.

**Implémentation :**
```typescript
{
  path: 'tasks',
  loadComponent: () => import('./pages/tasks/tasks').then(m => m.Tasks)
}
```

**Avantages :** Bundle initial plus léger, démarrage plus rapide.

### Structure features/
Organisation modulaire du code :
- **`core/`** : Services globaux
- **`features/`** : Fonctionnalités métier isolées
- **`pages/`** : Pages routées (lazy-loadées)
- **`shared/`** : Composants réutilisables (header, footer)

### Composants dynamiques
Composants créés programmatiquement au lieu d'être déclarés dans le HTML.

**Cas d'usage :** Modals, notifications, highlights à la demande.

**Implémentation avec ViewContainerRef :**
```typescript
// 1. Déclarer le conteneur dans le template
<div #highlightContainer></div>

// 2. Récupérer la référence
@ViewChild('highlightContainer', { read: ViewContainerRef }) 
highlightContainer!: ViewContainerRef;

// 3. Créer le composant dynamiquement
onHighlightTask(task: TaskItem): void {
  this.highlightContainer.clear(); // Vider avant d'ajouter
  const ref = this.highlightContainer.createComponent(TaskHighlight);
  ref.setInput('taskId', task.id);
  ref.instance.close.subscribe(() => this.closeHighlight());
}
```

**Bonnes pratiques :**
- Appeler `clear()` avant chaque injection
- Utiliser `setInput()` pour passer des données
- Se désabonner proprement des Observables

## Fonctionnalités

### Page d'accueil (`/home`)
- Message de bienvenue
- Présentation de l'application

### Page à propos (`/about`)
- Informations sur l'application
- Fonctionnalités principales
- Technologies utilisées
- Version et copyright

### Page de gestion des tâches (`/tasks`)
- **Affichage des tâches** : Liste réactive de toutes les tâches
- **Ajout de tâches** : Formulaire avec titre et description
- **Suppression de tâches** : Bouton de suppression sur chaque tâche
- **Marquer comme terminée** : Checkbox pour basculer l'état de complétion
- **Mettre en avant une tâche** : Composant dynamique `TaskHighlight` injecté à la demande
- **Mise à jour en temps réel** : Toutes les modifications sont instantanées

### Composants partagés

**Header (`shared/header/`)** :
- Navigation vers Home et Tasks
- Indication visuelle de la page active avec `routerLinkActive`

**Footer (`shared/footer/`)** :
- Copyright © 2025 TaskBoardPro
- Lien vers la page About




## Commandes utiles

### Développement
```bash
npm start              # Lancer le serveur de développement
ng serve              # Alternative avec Angular CLI
```

### Build
```bash
npm run build         # Build de production
ng build              # Alternative avec Angular CLI
```

### Tests
```bash
ng test               # Lancer les tests unitaires
```

### Génération de composants
```bash
ng g c pages/ma-page              # Générer une page
ng g c features/mon-feature       # Générer une feature
ng g c shared/mon-composant       # Générer un composant partagé
ng g s core/services/mon-service  # Générer un service
```

## Technologies utilisées

- **Angular 21** — Framework principal
- **TypeScript** — Langage de programmation
- **RxJS** — Programmation réactive avec Observables et BehaviorSubject
- **Standalone Components** — Architecture moderne Angular sans modules NgModule
- **Signals** — Gestion d'état réactive avec Angular Signals
- **Router** — Navigation avec lazy loading
- **FormsModule** — Gestion des formulaires

## Bonnes pratiques implémentées

1. **Lazy Loading** sur toutes les routes pour optimiser les performances
2. **Architecture réactive** avec BehaviorSubject et pipe async
3. **Standalone Components** pour une architecture moderne
4. **Signals** pour la gestion d'état locale
5. **Structure features/** pour une organisation modulaire
6. **Composants réutilisables** dans shared/
7. **Services injectables** dans core/services
8. **TypeScript strict** pour la sécurité du typage
9. **Composants dynamiques** avec ViewContainerRef pour des fonctionnalités à la demande

## Auteur

- **Loris** — Développeur Angular

## Licence

Tous droits réservés © 2025 TaskBoardPro
