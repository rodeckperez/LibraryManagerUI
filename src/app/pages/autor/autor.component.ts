import { Component, OnInit } from '@angular/core';
import { AutorserviceService } from '../../../services/autors/autorservice.service';
import { Autors } from '../../../models/autors';
import { FormGroup, FormControl, Validators, ControlContainer, NgForm } from '@angular/forms';
import { Respuesta } from '../../../models/respuesta';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  moduleId: module.id,
  styleUrls: ['./autor.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class AutorComponent implements OnInit {
  autorForm = new FormGroup({
    nombres: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required])
  });

  IdAutor: number = 0;
  estadoSolicitud: boolean = false;
  peticionDatos: boolean = false;
  lsAutors: Autors[];
  dataAutor = new Autors(null);


  constructor(private _autorservice: AutorserviceService) {

  }

  ngOnInit() {
    this.getAutors();
  }

  public getAutors() {
    this._autorservice.consultaAutores().then(
      response => {
        this.lsAutors = response;
      });
  };


  public guardarAutor() {
    if (this.autorForm.valid) {
      this.dataAutor.Nombres = this.autorForm.controls['nombres'].value;
      this.dataAutor.Apellidos = this.autorForm.controls['apellidos'].value;
      if (this.IdAutor == 0) {
        this._autorservice.crearAutor(this.dataAutor).then(
          response => {
            this.peticionDatos = true;
            if (response.Codigo == 1) {
              this.autorForm.reset();
              this.estadoSolicitud = true;
            }
            else {
              this.estadoSolicitud = false;
              this.autorForm.reset();
            }
          });
      }
      else {
        this.dataAutor.IdAutor = this.IdAutor;
        this._autorservice.editarAutor(this.dataAutor).then(
          response => {
            this.peticionDatos = true;
            if (response.Codigo == 1) {
              this.autorForm.reset();
              this.estadoSolicitud = true;
              this.IdAutor = 0;
            }
            else {
              this.estadoSolicitud = false;
              this.autorForm.reset();
              this.IdAutor = 0;
            }
          });
      }
    }
  }

  public verAutor(autor: Autors) {
    this.autorForm.controls['nombres'].setValue(autor.Nombres);
    this.autorForm.controls['apellidos'].setValue(autor.Apellidos);
    this.IdAutor = autor.IdAutor;
  }
}
