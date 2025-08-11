import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TacheService } from '../services/tache.service';

@Component({
  selector: 'app-tache',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.scss']
})
export class TacheComponent implements OnInit {
  tasks: any[] = [];

  constructor(private tacheService: TacheService, private router: Router) {}

  ngOnInit() {
    this.tasks = this.tacheService.getTasks();
  }
  
  goToTaskDetail(id: number) {
    this.router.navigate(['/tache', id]);
  }
}
