import { Component, inject, signal, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { TaskService, TaskItem } from '../../core/services/task';
import { TaskComponent } from '../../features/tasks/task/task';
import { TaskHighlight } from '../../features/tasks/task-highlight/task-highlight';
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

  // ViewContainerRef pour l'injection de composants dynamiques
  @ViewChild('highlightContainer', { read: ViewContainerRef })
  highlightContainer!: ViewContainerRef;

  // Référence au composant dynamique créé
  private highlightComponentRef: ComponentRef<TaskHighlight> | null = null;

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

  // Mettre en avant une tâche (injection dynamique)
  onHighlightTask(task: TaskItem): void {
    // Vider le container avant d'ajouter un nouveau composant
    this.highlightContainer.clear();

    // Créer le composant dynamiquement
    this.highlightComponentRef = this.highlightContainer.createComponent(TaskHighlight);

    // Passer des données au composant via ses inputs
    this.highlightComponentRef.setInput('taskId', task.id);
    this.highlightComponentRef.setInput('taskTitle', task.title);
    this.highlightComponentRef.setInput('taskDescription', task.description);

    // S'abonner à l'événement de fermeture
    this.highlightComponentRef.instance.close.subscribe(() => {
      this.closeHighlight();
    });
  }

  // Fermer le highlight
  closeHighlight(): void {
    if (this.highlightContainer) {
      this.highlightContainer.clear();
      this.highlightComponentRef = null;
    }
  }
}
