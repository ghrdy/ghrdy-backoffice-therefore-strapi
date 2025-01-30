import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
  })
  export class ApiSirenService {
  
    private apiSirenUrl = environment.apiSirenUrl;
    private apiKeySiren = environment.tokenApiSiren;

    constructor(private http: HttpClient) { }
    
    getSiren(endpoint: string): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-INSEE-Api-Key-Integration': this.apiKeySiren,
    });


    const url = `${this.apiSirenUrl}${endpoint}`;

    return this.http.get(url, { headers }).pipe(
        catchError((error: HttpErrorResponse) => {
            console.error('Erreur API détectée:', error);

            let errorMessage = 'Erreur inconnue';
            if (error.status === 0) {
                errorMessage = 'Impossible de contacter le serveur. Vérifiez votre connexion ou le proxy.';
            } else if (error.status === 401) {
                errorMessage = 'Erreur d\'authentification : clé API invalide.';
            } else {
                errorMessage = `Erreur API (HTTP ${error.status}): ${error.message}`;
            }
            return throwError(() => new Error(errorMessage));
            })
        );
       
    }
  }