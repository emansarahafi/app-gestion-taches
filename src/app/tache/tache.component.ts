import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TacheService, Tache } from '../services/tache.service';
import { AjoutTacheComponent } from '../ajout-tache/ajout-tache.component';

@Component({
  selector: 'app-tache',
  standalone: true,
  imports: [CommonModule, AjoutTacheComponent],
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.scss']
})
export class TacheComponent implements OnInit {
  tasks: Tache[] = [];
  afficherFormulaire = false;

  constructor(private tacheService: TacheService, private router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tacheService.getTaches().subscribe({
      next: (data) => this.tasks = data,
      error: (err) => console.error('Erreur API', err)
    });
  }
  
  goToTaskDetail(id: number) {
    this.router.navigate(['/tache', id]);
  }

  toggleTask(id: number) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.termine = !task.termine;
      this.tacheService.modifierTache(task).subscribe({
        next: () => this.ngOnInit(),
        error: (err) => console.error('Erreur lors de la modification :', err)
      });
    }
  }

  deleteTask(id: number) {
    this.tacheService.supprimerTache(id).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => console.error('Erreur lors de la suppression :', err)
    });
  }

  supprimer(id: number) {
    this.tacheService.supprimerTache(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
    });
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
