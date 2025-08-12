import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TacheService } from '../services/tache.service';

@Component({
  selector: 'app-ajout-tache',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './ajout-tache.component.html'
})
export class AjoutTacheComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private tacheService: TacheService,
    private router: Router
  ) {
    this.form = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const titre = this.form.value.titre;
      this.tacheService.addTask(titre);
      console.log('Tâche ajoutée:', titre);
      this.form.reset();
      // Navigate back to tasks list
      this.router.navigate(['/taches']);
    }
  }
}
