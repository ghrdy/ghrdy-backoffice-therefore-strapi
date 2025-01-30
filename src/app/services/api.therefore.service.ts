import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders   } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class ApiThereforeService {
  
    // l'URL de l'API
    private apiUrl = environment.apiThereforeUrl;
    private username = environment.username;
    private password = environment.password;
  
    constructor(private http: HttpClient) { }
  
    getServices(): Observable<any> {
      // Création de l'en-tête d'authentification pour Basic Auth
      const headers = new HttpHeaders({
        Authorization: 'Basic ' + btoa(`${this.username}:${this.password}`)
      });
  
      // Envoie de la requête GET avec l'en-tête d'authentification
      return this.http.get<any>(`${this.apiUrl}/endpoint`, { headers });
    }
  
    //la requete pour recuperer collecte_D3E
    GetCollecteD3E(): Observable<any> {
        const requestBody = {
            "Query":{
                "Fulltext":null,
                "CategoryNo":50,
                "CaseDefinitionNo":null,
                "MaxRows":0,
                "Mode":0,
                "RowBlockSize":0,
                "OrderByFieldsNoOrNames":["1342"],
                "Conditions":[
                    {
                        "Condition":"",
                        "FieldNoOrName":"1344"
                    },
                    {
                        "Condition":"",
                        "FieldNoOrName":"1358"
                    }
                ],
                "SelectedFieldsOrNames":[""]
            }
        }
      const headers = new HttpHeaders({
        Authorization: 'Basic ' + btoa(`${this.username}:${this.password}`),
        'Content-Type': 'application/json',
        'TenantName':'demo-ramananmanmatharajah',
      });
      return this.http.post<any>(`${this.apiUrl}/ExecuteSingleQuery`, requestBody, { headers });
    }
    
    //la requete pour recuperer destruction_archive
    GetDestructionArchives(): Observable<any> {
        const requestBody = {
            "Query":{
                "Fulltext":null,
                "CategoryNo":49,
                "CaseDefinitionNo":null,
                "MaxRows":0,
                "Mode":0,
                "RowBlockSize":0,
                "OrderByFieldsNoOrNames":["1333"],
                "Conditions":[
                    {
                        "Condition":"",
                        "FieldNoOrName":"1334"
                    },
                    {
                        "Condition":"",
                        "FieldNoOrName":"1335"
                    }
                    ,
                    {
                        "Condition":"",
                        "FieldNoOrName":"1336"
                    }
                ],
                "SelectedFieldsOrNames":[""]
            }
        }
      const headers = new HttpHeaders({
        Authorization: 'Basic ' + btoa(`${this.username}:${this.password}`),
        'Content-Type': 'application/json',
        'TenantName':'demo-ramananmanmatharajah',
      });
      return this.http.post<any>(`${this.apiUrl}/ExecuteSingleQuery`, requestBody, { headers });
    }
  
      //la requete pour recuperer destruction_media
      GetDestructionMedia(): Observable<any> {
        const requestBody = {
          "Query":{
              "Fulltext":null,
              "CategoryNo":51,
              "CaseDefinitionNo":null,
              "MaxRows":0,
              "Mode":0,
              "RowBlockSize":0,
              "OrderByFieldsNoOrNames":["1349"],
              "Conditions":[
                  {
                      "Condition":"",
                      "FieldNoOrName":"1348"
                  },
                  {
                      "Condition":"",
                      "FieldNoOrName":"1349"
                  }
              ],
              "SelectedFieldsOrNames":[""]
          }
        }
        const headers = new HttpHeaders({
          Authorization: 'Basic ' + btoa(`${this.username}:${this.password}`),
          'Content-Type': 'application/json',
          'TenantName':'demo-ramananmanmatharajah',
        });
        return this.http.post<any>(`${this.apiUrl}/ExecuteSingleQuery`, requestBody, { headers });
      }
  
    postDevis(data: any): Observable<any> {
      //return this.http.post(this.apiUrl, data);
      const headers = new HttpHeaders({
        Authorization: 'Basic ' + btoa(`${this.username}:${this.password}`),
        'Content-Type': 'application/json',
        'TenantName':'demo-ramananmanmatharajah',
      });
      return this.http.post<any>(`${this.apiUrl}/CreateDocument`, data, { headers });
    }
  
    getDevis(docNo: number): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: 'Basic ' + btoa(`${this.username}:${this.password}`),
        'Content-Type': 'application/json',
        'TenantName': 'demo-ramananmanmatharajah',
      });
      const body = {
        "DocNo": docNo,
        "IsAccessMaskNeeded": true,
        "TitleHideCategory": true
      };
      return this.http.post<any>(`${this.apiUrl}/GetDocumentIndexData`, body, { headers });
    }
  
}
  
  
  