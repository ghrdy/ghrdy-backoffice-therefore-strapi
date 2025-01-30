import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders   } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class ApiSpringService {
  
    // l'URL de l'API
    private apiSpringUrl = environment.apiSpringUrl;
    private apiKey = environment.keyApiSpring;



    constructor(private http: HttpClient) { }
    
    // Méthode pour effectuer une requête GET avec la clé d'API dans les en-têtes
    getDataWithApiKey(endpoint: string): Observable<any> {
        // Définir les en-têtes HTTP avec la clé d'API
        const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-API-KEY': this.apiKey,
      });
      const url = `${this.apiSpringUrl}${endpoint}`;
      //Envoye une requête GET vers votre backend avec les en-têtes définis
      return this.http.get(url,{ headers });
    }

    // Méthode pour effectuer une mise à jour avec la clé d'API
    updateDataWithApiKey(endpoint: string, id: string, data: any): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-API-KEY': this.apiKey,
      });
      const url = `${this.apiSpringUrl}${endpoint}/${id}`;
      return this.http.put(url, data, { headers });
    }


}
    
