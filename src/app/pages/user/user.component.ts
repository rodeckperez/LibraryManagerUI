import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../../../services/users/userservice.service';
import { Users, TipoDocumento } from '../../../models/users';
import { UserdataComponent } from '../userdata/userdata.component'
import { FormGroup, FormControl, Validators, ControlContainer, NgForm } from '@angular/forms';
import { Respuesta } from '../../../models/respuesta';


@Component({
  selector: 'user-cmp',
  moduleId: module.id,
  templateUrl: 'user.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})

export class UserComponent implements OnInit {
  angForm = new FormGroup({
    nombres: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    documento: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    tipodoc: new FormControl(0)
  });

  idUsuario: number = 0; 
  estadoSolicitud: boolean = false;
  peticionDatos: boolean = false;
  lstTIpoDocumento: TipoDocumento[];
  lstUsuarios: Users[];
  dataUsuario = new Users(null);


  constructor(private _userservice: UserserviceService) {

  }

  ngOnInit() {
    this.getTipoDocumento();
    this.getUsers();
  }



  public getTipoDocumento() {
    this._userservice.consultarTipoDoc().then(
      response => {
        this.lstTIpoDocumento = response;
      });
  };

  public getUsers() {
    this._userservice.consultarUsuarios().then(
      response => {
        this.lstUsuarios = response;
        console.log(this.lstUsuarios)
      });
  };

  public getTipoDoc(id: number): string {
    var tipoDoc = ""
    switch (id) {
      case 1:
        tipoDoc = "CC";
        break;
      case 2:
        tipoDoc = "TI";
        break;
      case 3:
        tipoDoc = "NIT";
        break
      case 4:
        tipoDoc = "PT";
        break;
      default:
        tipoDoc = "";
        break;
    }
    return tipoDoc;
  }

  public getEstado(e: boolean): string {
    var estado = e ? "Activo" : "Inactivo";
    return estado; 

  }

  public guardarUsuario() {
    if (this.angForm.valid) {
      this.dataUsuario.Nombres = this.angForm.controls['nombres'].value;
      this.dataUsuario.Apellidos = this.angForm.controls['apellidos'].value;
      this.dataUsuario.IdTipoDocumento = this.lstTIpoDocumento.find(x => x.Tipo == this.angForm.controls['tipodoc'].value).Id;
      this.dataUsuario.NumeroIdentificacion = this.angForm.controls['documento'].value;
      this.dataUsuario.Direccion = this.angForm.controls['direccion'].value;
      this.dataUsuario.Telefono = this.angForm.controls['telefono'].value;
      this.dataUsuario.Estado = true;
      debugger;
      if (this.idUsuario == 0) {
        this._userservice.crearUsuario(this.dataUsuario).then(
          response => {
            this.peticionDatos = true;
            if (response.Codigo == 1) {
              this.angForm.reset();
              this.estadoSolicitud = true;
            }
            else {
              this.estadoSolicitud = false;
              this.angForm.reset();
            }
          });
      }
      else {
        this.dataUsuario.IdUsuario = this.idUsuario;
        this._userservice.editarUsuario(this.dataUsuario).then(
          response => {
            this.peticionDatos = true;
            if (response.Codigo == 1) {
              this.angForm.reset();
              this.estadoSolicitud = true;
              this.idUsuario = 0;
            }
            else {
              this.estadoSolicitud = false;
              this.angForm.reset();
              this.idUsuario = 0;
            }
          });
      }
    }
  }

  public verUsuario(user: Users) {
    this.angForm.controls['nombres'].setValue(user.Nombres);
    this.angForm.controls['apellidos'].setValue(user.Apellidos);
    this.angForm.controls['tipodoc'].setValue(this.getTipoDoc(user.IdTipoDocumento));
    this.angForm.controls['documento'].setValue(user.NumeroIdentificacion);
    this.angForm.controls['direccion'].setValue(user.Direccion);
    this.angForm.controls['telefono'].setValue(user.Telefono);
    this.idUsuario = user.IdUsuario; 
  }
}
