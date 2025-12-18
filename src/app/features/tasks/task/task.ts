import { Component, input, output } from '@angular/core';
import { TaskItem } from '../../../core/services/task';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class TaskComponent {
  // Input pour recevoir la tâche
  task = input.required<TaskItem>();

  // Outputs pour émettre les actions
  toggleComplete = output<number>();
  remove = output<number>();

  onToggle(): void {
    this.toggleComplete.emit(this.task().id);
  }

  onRemove(): void {
    this.remove.emit(this.task().id);
  }
}
