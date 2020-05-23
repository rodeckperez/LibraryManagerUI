import { Component, OnInit } from '@angular/core';
import { CategorieserviceService } from '../../../services/categories/categorieservice.service';
import { Categories } from '../../../models/categories';
import { FormGroup, FormControl, Validators, ControlContainer, NgForm } from '@angular/forms';
import { Respuesta } from '../../../models/respuesta';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  moduleId: module.id,
})
export class CategoriesComponent implements OnInit {
  categorieForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required])
  });

  IdCategorie: number = 0;
  estadoSolicitud: boolean = false;
  peticionDatos: boolean = false;
  lsCategories: Categories[];
  dataCategorie = new Categories(null);


  constructor(private _categoriaservice: CategorieserviceService) {

  }

  ngOnInit() {
    this.getCategories();
  }

  public getCategories() {
    this._categoriaservice.consultaCategoria().then(
      response => {
        this.lsCategories = response;
      });
  };


  public guardarCategoria() {
    if (this.categorieForm.valid) {
      this.dataCategorie.Nombre = this.categorieForm.controls['nombre'].value;
      this.dataCategorie.Descripcion = this.categorieForm.controls['descripcion'].value;
      if (this.IdCategorie == 0) {
        this._categoriaservice.crearAutor(this.dataCategorie).then(
          response => {
            this.peticionDatos = true;
            if (response.Codigo == 1) {
              this.categorieForm.reset();
              this.estadoSolicitud = true;
            }
            else {
              this.estadoSolicitud = false;
              this.categorieForm.reset();
            }
          });
      }
      else {
        this.dataCategorie.IdCategoria = this.IdCategorie;
        this._categoriaservice.editarCategoria(this.dataCategorie).then(
          response => {
            this.peticionDatos = true;
            if (response.Codigo == 1) {
              this.categorieForm.reset();
              this.estadoSolicitud = true;
              this.IdCategorie = 0;
            }
            else {
              this.estadoSolicitud = false;
              this.categorieForm.reset();
              this.IdCategorie = 0;
            }
          });
      }
    }
  }

  public verCategoria(categoria: Categories) {
    this.categorieForm.controls['nombre'].setValue(categoria.Nombre);
    this.categorieForm.controls['descripcion'].setValue(categoria.Descripcion);
    this.IdCategorie = categoria.IdCategoria;
  }
}
