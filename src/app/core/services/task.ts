import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TaskItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // BehaviorSubject pour stocker et émettre la liste des tâches
  private tasksSubject = new BehaviorSubject<TaskItem[]>([
    { id: 1, title: 'Apprendre Angular', description: 'Maîtriser les concepts réactifs', completed: false },
    { id: 2, title: 'Créer une app', description: 'Développer TaskBoard Pro', completed: true },
    { id: 3, title: 'Tester l\'application', description: 'Vérifier toutes les fonctionnalités', completed: false }
  ]);

  // Observable public pour que les composants puissent s'abonner
  tasks$: Observable<TaskItem[]> = this.tasksSubject.asObservable();

  private nextId = 4;

  // Ajouter une tâche et émettre la nouvelle liste
  addTask(title: string, description: string): void {
    const currentTasks = this.tasksSubject.value;
    const newTask: TaskItem = {
      id: this.nextId++,
      title,
      description,
      completed: false
    };
    // Émission de la nouvelle liste via next()
    this.tasksSubject.next([...currentTasks, newTask]);
  }

  // Supprimer une tâche et émettre la liste mise à jour
  removeTask(id: number): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.filter(task => task.id !== id);
    // Émission de la liste mise à jour via next()
    this.tasksSubject.next(updatedTasks);
  }

  // Basculer l'état de complétion d'une tâche
  toggleTask(id: number): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    // Émission de la liste mise à jour via next()
    this.tasksSubject.next(updatedTasks);
  }
}
