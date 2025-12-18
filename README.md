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
   git clone [URL_DU_DEPOT]
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
│       └── task/            ← Composant réutilisable pour une tâche
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

## Architecture réactive avec RxJS

### 1. Structure de flux
- Le service `TaskService` utilise un `BehaviorSubject` pour stocker et émettre la liste des tâches
- Le composant `Tasks` s'abonne à ce flux via `tasks$` et le **pipe async** pour afficher les tâches
- Les données sont "vivantes" et se mettent à jour automatiquement

### 2. Mise à jour des données

**Service TaskService (`core/services/task.ts`) :**
```typescript
private tasksSubject = new BehaviorSubject<TaskItem[]>([...]);
tasks$: Observable<TaskItem[]> = this.tasksSubject.asObservable();
```

**Méthodes réactives :**
- `addTask()` — Ajoute une tâche puis appelle `next()` pour émettre la nouvelle liste
- `removeTask()` — Supprime une tâche puis émet la liste mise à jour
- `toggleTask()` — Bascule l'état de complétion d'une tâche

**Dans le composant (`pages/tasks/tasks.ts`) :**
```typescript
tasks$ = this.taskService.tasks$;
```

**Dans le template :**
```html
@if (tasks$ | async; as tasks) {
  @for (task of tasks; track task.id) {
    <app-task [task]="task" ... />
  }
}
```

### 3. Points clés retenus

- ✅ Pas besoin d'appeler `getTasks()` à chaque fois : la donnée est "vivante"
- ✅ `| async` gère l'abonnement et la désinscription automatiquement
- ✅ Le flux reste cohérent entre le service et la vue
- ✅ La vue est automatiquement réactualisée sans rechargement

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
- **Mise à jour en temps réel** : Toutes les modifications sont instantanées

### Composants partagés

**Header (`shared/header/`)** :
- Navigation vers Home et Tasks
- Indication visuelle de la page active avec `routerLinkActive`

**Footer (`shared/footer/`)** :
- Copyright © 2025 TaskBoardPro
- Lien vers la page About

## Architecture des features

La structure avec `features/` permet une organisation modulaire :

- **`features/`** : Fonctionnalités métier de l'application
  - `tasks/task/` — Composant réutilisable pour afficher une tâche
- **`pages/`** : Pages principales de l'application
  - Chaque page peut être lazy-loadée
- **`shared/`** : Composants réutilisables (header, footer)
- **`core/`** : Services globaux et logique métier partagée

**Avantages :**
- Isolation des fonctionnalités
- Facilite le lazy loading
- Meilleure maintenabilité
- Facilite le travail en équipe

## Modèle de données

### Interface TaskItem
```typescript
export interface TaskItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}
```

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

## Auteur

- **Loris** — Développeur Angular

## Licence

Tous droits réservés © 2025 TaskBoardPro
