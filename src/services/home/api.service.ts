import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dashboard } from '../../models/dashboard';
import { range } from "rxjs";
import { map, filter, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL: string = '/api';

  constructor(private httpClient: HttpClient) { }

  public consultarDashboard(): Promise<Dashboard> {
    return this.httpClient.get(`${this.apiURL}/values/dataDashboard`)
      .toPromise()
      .then(response => new Dashboard(response)) 
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
