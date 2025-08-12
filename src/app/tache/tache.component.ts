import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TacheService, Tache } from '../services/tache.service';

@Component({
  selector: 'app-tache',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.scss']
})
export class TacheComponent implements OnInit {
  tasks: Tache[] = [];

  constructor(private tacheService: TacheService, private router: Router) {}

  ngOnInit() {
    this.tasks = this.tacheService.getTasks();
  }
  
  goToTaskDetail(id: number) {
    this.router.navigate(['/tache', id]);
  }

  toggleTask(id: number) {
    this.tacheService.toggleTask(id);
  }

  deleteTask(id: number) {
    this.tacheService.deleteTask(id);
    this.tasks = this.tacheService.getTasks(); // Refresh the list
  }

  // Statistics methods
  getTotalTasks(): number {
    return this.tasks.length;
  }

  getCompletedTasks(): number {
    return this.tasks.filter(task => task.termine).length;
  }

  getPendingTasks(): number {
    return this.tasks.filter(task => !task.termine).length;
  }

  // Track by function for better performance
  trackByTaskId(index: number, task: Tache): number {
    return task.id;
  }
}
