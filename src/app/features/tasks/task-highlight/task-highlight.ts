import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-task-highlight',
  imports: [],
  templateUrl: './task-highlight.html',
  styleUrl: './task-highlight.css',
})
export class TaskHighlight {
  // Inputs pour recevoir les données de la tâche mise en avant
  taskId = input.required<number>();
  taskTitle = input.required<string>();
  taskDescription = input.required<string>();

  // Output pour fermer le highlight
  close = output<void>();

  onClose(): void {
    this.close.emit();
  }
}
