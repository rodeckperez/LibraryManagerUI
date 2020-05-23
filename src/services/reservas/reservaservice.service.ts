import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Librosdata } from '../../models/librosdata';
import { Libros } from '../../models/libros';
import { Respuesta } from '../../models/respuesta';
import { Reserva } from '../../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaserviceService {

  apiURL: string = '/api';

  constructor(private httpClient: HttpClient) { }

  public crearReserva(dataReserva: Reserva): Promise<Respuesta> {
    return this.httpClient.post<any>(`${this.apiURL}/values/crearReserva`, dataReserva)
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
