import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users, TipoDocumento } from '../../models/users';
import { ReactiveFormsModule, FormsModule, ControlContainer } from '@angular/forms';
import { range } from "rxjs";
import { map, filter, tap } from "rxjs/operators";
import { Respuesta } from '../../models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  apiURL: string = '/api';

  constructor(private httpClient: HttpClient) { }

  public crearUsuario(dataUsuario: Users): Promise<Respuesta> {
    return this.httpClient.post<any>(`${this.apiURL}/Usuarios/crearUsuario`, dataUsuario )
      .toPromise()
      .then(
        response => new Respuesta(response)
      )
      .catch(this.handleError);
  }

  public editarUsuario(dataUsuario: Users): Promise<Respuesta> {
    return this.httpClient.post<any>(`${this.apiURL}/Usuarios/editarUsuario`, dataUsuario)
      .toPromise()
      .then(
        response => new Respuesta(response)
      )
      .catch(this.handleError);
  }

  public consultarTipoDoc(): Promise<TipoDocumento[]> {
    let lstTipoDoc = new Array<TipoDocumento>();
    return this.httpClient.get(`${this.apiURL}/Usuarios/consultarTipoDocumento`)
      .toPromise()
      .then(response => {
        var jsonObj: any = JSON.parse(JSON.parse(JSON.stringify(response)));
        for (var i = 0; i<= jsonObj.length - 1; i++) {
          lstTipoDoc.push(new TipoDocumento(jsonObj[i]));
        }
        return lstTipoDoc;
      })
      .catch(this.handleError);
  }

  public consultarUsuarios(): Promise<Users[]> {
    let lstUsers = new Array<Users>();
    return this.httpClient.get(`${this.apiURL}/Usuarios/consultarUsuarios`)
      .toPromise()
      .then(response => {
        var jsonObj: any = JSON.parse(JSON.parse(JSON.stringify(response)));
        for (var i = 0; i <= jsonObj.length - 1; i++) {
          lstUsers.push(new Users(jsonObj[i]));
        }
        return lstUsers;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
