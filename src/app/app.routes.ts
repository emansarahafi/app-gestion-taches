import { Routes } from '@angular/router';
import { TacheComponent } from './tache/tache.component';
import { AboutComponent } from './about/about.component';
import { AjoutTacheComponent } from './ajout-tache/ajout-tache.component';

export const routes: Routes = [
  { path: '', redirectTo: '/taches', pathMatch: 'full' },
  { path: 'taches', component: TacheComponent },
  { path: 'ajouter-tache', component: AjoutTacheComponent },
  { path: 'apropos', component: AboutComponent }
];
