import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private tasks = [
    { id: 1, titre: 'Faire les courses', termine: false },
    { id: 2, titre: 'Lire un article', termine: true },
    { id: 3, titre: 'Finir le projet Angular', termine: false }
  ];

  getTasks() {
    return this.tasks;
  }
}
