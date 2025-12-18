import { Component, inject, signal } from '@angular/core';
import { TaskService } from '../../core/services/task';
import { TaskComponent } from '../../features/tasks/task/task';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent, AsyncPipe, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  // Injection du service
  private taskService = inject(TaskService);

  // Abonnement au flux tasks$ via | async dans le template
  tasks$ = this.taskService.tasks$;

  // Signals pour le formulaire
  newTaskTitle = signal('');
  newTaskDescription = signal('');

  // Ajouter une tâche
  addTask(): void {
    const title = this.newTaskTitle().trim();
    const description = this.newTaskDescription().trim();

    if (title && description) {
      this.taskService.addTask(title, description);
      // Réinitialiser le formulaire
      this.newTaskTitle.set('');
      this.newTaskDescription.set('');
    }
  }

  // Basculer l'état de complétion
  onToggleTask(id: number): void {
    this.taskService.toggleTask(id);
  }

  // Supprimer une tâche
  onRemoveTask(id: number): void {
    this.taskService.removeTask(id);
  }
}
