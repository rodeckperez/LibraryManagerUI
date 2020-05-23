import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categories } from '../../models/categories';
import { Respuesta } from '../../models/respuesta';
@Injectable({
  providedIn: 'root'
})
export class CategorieserviceService {

  apiURL: string = '/api';

  constructor(private httpClient: HttpClient) { }

  public crearAutor(dataCategorie: Categories): Promise<Respuesta> {
    return this.httpClient.post<any>(`${this.apiURL}/Categoria/crearCategoria`, dataCategorie)
      .toPromise()
      .then(
        response => new Respuesta(response)
      )
      .catch(this.handleError);
  }

  public editarCategoria(dataCategorie: Categories): Promise<Respuesta> {
    return this.httpClient.post<any>(`${this.apiURL}/Categoria/editarCategoria`, dataCategorie)
      .toPromise()
      .then(
        response => new Respuesta(response)
      )
      .catch(this.handleError);
  }

  public consultaCategoria(): Promise<Categories[]> {
    let lstAutors = new Array<Categories>();
    return this.httpClient.get(`${this.apiURL}/Categoria/consultaCategorias`)
      .toPromise()
      .then(response => {
        var jsonObj: any = JSON.parse(JSON.parse(JSON.stringify(response)));
        for (var i = 0; i <= jsonObj.length - 1; i++) {
          lstAutors.push(new Categories(jsonObj[i]));
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
