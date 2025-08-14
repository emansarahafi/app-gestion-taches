import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tache } from '../services/tache.service';

@Component({
  selector: 'app-tache-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tache-item.component.html',
  styleUrls: ['./tache-item.component.scss']
})
export class TacheItemComponent {
  @Input() tache!: Tache;
  @Output() supprimer = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<number>();
  @Output() statusChange = new EventEmitter<{id: number, statut: string}>();

  supprimerTache() {
    this.supprimer.emit(this.tache.id);
  }

  toggleTask() {
    this.toggle.emit(this.tache.id);
  }

  onStatusChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const newStatus = select.value;
    this.statusChange.emit({id: this.tache.id, statut: newStatus});
  }
}
