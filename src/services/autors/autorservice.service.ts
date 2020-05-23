import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Autors } from '../../models/autors';
import { Respuesta } from '../../models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class AutorserviceService {

  apiURL: string = '/api';

  constructor(private httpClient: HttpClient) { }

  public crearAutor(dataAutor: Autors): Promise<Respuesta> {
    return this.httpClient.post<any>(`${this.apiURL}/Autor/crearAutor`, dataAutor)
      .toPromise()
      .then(
        response => new Respuesta(response)
      )
      .catch(this.handleError);
  }

  public editarAutor(dataAutor: Autors): Promise<Respuesta> {
    return this.httpClient.post<any>(`${this.apiURL}/Autor/editarAutor`, dataAutor)
      .toPromise()
      .then(
        response => new Respuesta(response)
      )
      .catch(this.handleError);
  }

 public consultaAutores(): Promise<Autors[]> {
    let lstAutors = new Array<Autors>();
   return this.httpClient.get(`${this.apiURL}/Autor/consultarAutores`)
      .toPromise()
      .then(response => {
        var jsonObj: any = JSON.parse(JSON.parse(JSON.stringify(response)));
        for (var i = 0; i <= jsonObj.length - 1; i++) {
          lstAutors.push(new Autors(jsonObj[i]));
        }
        return lstAutors;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
