# Application Gestion de Tâches

## Configuration avec json-server

### Étape 1 : Lancer json-server

Créer un fichier `db.json` avec :

```json
{
  "taches": [
    { "id": 1, "titre": "Faire le TP", "statut": "en_attente", "termine": false },
    { "id": 2, "titre": "Réviser Angular", "statut": "terminee", "termine": false },
    { "id": 3, "titre": "Préparer la présentation", "statut": "en_attente", "termine": false },
    { "id": 4, "titre": "Tester l'application", "statut": "en_cours", "termine": false }
  ]
}
```

Puis lancer :

```bash
json-server --watch db.json --port 3000
```

Ou utiliser le script npm :

```bash
npm run json-server
```

Le serveur sera disponible sur <http://localhost:3000>

### Étape 2 : Adapter TacheService

```typescript
private baseUrl = 'http://localhost:3000/taches';

getTaches(): Observable<Tache[]> {
  return this.http.get<Tache[]>(this.baseUrl);
}

ajouterTache(tache: Tache): Observable<Tache> {
  return this.http.post<Tache>(this.baseUrl, tache);
}

supprimerTache(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${id}`);
}
```

### Étape 3 : Affichage dans TacheComponent

```typescript
ngOnInit() {
  this.tacheService.getTaches().subscribe({
    next: (data) => this.tasks = data,
    error: (err) => console.error('Erreur API', err)
  });
}
```

### Étape 4 : Ajouter une méthode de suppression

Template HTML :

```html
<ul>
  <li *ngFor="let t of tasks">
    {{ t.titre }}
    <button (click)="supprimer(t.id)">Supprimer</button>
  </li>
</ul>
```

Méthode dans le composant :

```typescript
supprimer(id: number) {
  this.tacheService.supprimerTache(id).subscribe(() => {
    this.tasks = this.tasks.filter(t => t.id !== id);
  });
}
```

## API Endpoints disponibles

- GET <http://localhost:3000/taches> - Récupérer toutes les tâches
- POST <http://localhost:3000/taches> - Ajouter une nouvelle tâche
- PUT <http://localhost:3000/taches/:id> - Modifier une tâche
- DELETE <http://localhost:3000/taches/:id> - Supprimer une tâche

## Démarrage de l'application

1. **Terminal 1** - Démarrer json-server :

```bash
npm run json-server
```

1. **Terminal 2** - Démarrer l'application Angular :

```bash
npm start
```

L'application sera disponible sur <http://localhost:4200>
