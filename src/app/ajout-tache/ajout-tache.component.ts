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
      const nouvelleTache = {
        titre: titre,
        termine: false
      };
      
      this.tacheService.ajouterTache(nouvelleTache).subscribe({
        next: (tache) => {
          console.log('Tâche ajoutée:', tache);
          this.form.reset();
          // Navigate back to tasks list
          this.router.navigate(['/taches']);
        },
        error: (err) => console.error('Erreur lors de l\'ajout :', err)
      });
    }
  }
}
