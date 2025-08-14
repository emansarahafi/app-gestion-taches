import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Tache {
  id: number;
  titre: string;
  termine: boolean;
}

export interface NouvelletTache {
  titre: string;
  termine: boolean;
}

@Injectable({ providedIn: 'root' })
export class TacheService {
  private baseUrl = 'http://localhost:3000/taches';

  constructor(private http: HttpClient) {}

  getTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.baseUrl);
  }

  ajouterTache(tache: NouvelletTache): Observable<Tache> {
    return this.http.post<Tache>(this.baseUrl, tache);
  }

  modifierTache(tache: Tache): Observable<Tache> {
    return this.http.put<Tache>(`${this.baseUrl}/${tache.id}`, tache);
  }

  supprimerTache(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
