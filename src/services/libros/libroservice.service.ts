import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Librosdata } from '../../models/librosdata';
import { Libros } from '../../models/libros';
import { Respuesta } from '../../models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class LibroserviceService {

  apiURL: string = '/api';

  constructor(private httpClient: HttpClient) { }


  public consultaLibros(): Promise<Libros[]> {
    let lstLibros = new Array<Libros>();
    return this.httpClient.get(`${this.apiURL}/Libros/consultarLibros`)
      .toPromise()
      .then(response => {
        var jsonObj: any = JSON.parse(JSON.parse(JSON.stringify(response)));
        for (var i = 0; i <= jsonObj.length - 1; i++) {
          lstLibros.push(new Libros(jsonObj[i]));
        }
        return lstLibros;
      })
      .catch(this.handleError);
  }

  public consultarDataControles(): Promise<Librosdata> {
    debugger;
    return this.httpClient.get(`${this.apiURL}/Libros/dataLibros`)
      .toPromise()
      .then(
        response => new Librosdata(response)
      )
      .catch(this.handleError);
  }

  public crearLibro(dataLibro: Libros): Promise<Respuesta> {
    return this.httpClient.post<any>(`${this.apiURL}/Libros/crearLibre`, dataLibro)
      .toPromise()
      .then(
        response => new Respuesta(response)
      )
      .catch(this.handleError);
  }

  public editarLibro(dataLibro: Libros): Promise<Respuesta> {
    return this.httpClient.post<any>(`${this.apiURL}/Libros/editarAutor`, dataLibro)
      .toPromise()
      .then(
        response => new Respuesta(response)
      )
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
