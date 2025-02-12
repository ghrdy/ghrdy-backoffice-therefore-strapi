import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StrapiService {
  private apiUrl = environment.strapiUrl;

  constructor(private http: HttpClient) {}

  // Récupérer le contenu de la page d'accueil
  getHomeContent(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/home`);
  }

  // Récupérer les services
  getServices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/services`);
  }

  // Récupérer les expertises
  getExpertises(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/expertises`);
  }

  // Récupérer la vision
  getVision(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/vision`);
  }

  // Récupérer les FAQ
  getFaqs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/faqs`);
  }
}