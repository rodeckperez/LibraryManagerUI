import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Editorials } from '../../models/editorials';
import { Respuesta } from '../../models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class EditorialserviceService {

  apiURL: string = '/api';

  constructor(private httpClient: HttpClient) { }

  public crearEditorial(dataEditorial: Editorials): Promise<Respuesta> {
    return this.httpClient.post<any>(`${this.apiURL}/Editorial/crearEditorial`, dataEditorial)
      .toPromise()
      .then(
        response => new Respuesta(response)
      )
      .catch(this.handleError);
  }

  public editarEditorial(dataEditorial: Editorials): Promise<Respuesta> {
    return this.httpClient.post<any>(`${this.apiURL}/Editorial/editarEditorial`, dataEditorial)
      .toPromise()
      .then(
        response => new Respuesta(response)
      )
      .catch(this.handleError);
  }

  public consultaEditoriales(): Promise<Editorials[]> {
    let lstAutors = new Array<Editorials>();
    return this.httpClient.get(`${this.apiURL}/Editorial/consultarEditoriales`)
      .toPromise()
      .then(response => {
        var jsonObj: any = JSON.parse(JSON.parse(JSON.stringify(response)));
        for (var i = 0; i <= jsonObj.length - 1; i++) {
          lstAutors.push(new Editorials(jsonObj[i]));
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
