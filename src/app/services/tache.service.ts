import { Injectable } from '@angular/core';

export interface Tache {
  id: number;
  titre: string;
  termine: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private tasks: Tache[] = [
    { id: 1, titre: 'Faire les courses', termine: false },
    { id: 2, titre: 'Lire un article', termine: true },
    { id: 3, titre: 'Finir le projet Angular', termine: false }
  ];

  getTasks(): Tache[] {
    return this.tasks;
  }

  addTask(titre: string): void {
    const newTask: Tache = {
      id: this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1,
      titre: titre,
      termine: false
    };
    this.tasks.push(newTask);
  }

  toggleTask(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.termine = !task.termine;
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}
