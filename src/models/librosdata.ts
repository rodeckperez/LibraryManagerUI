import { Autors } from '../models/autors';
import { Categories } from '../models/categories';
import { Editorials } from '../models/editorials';

export class Librosdata {
  Autores: Autors[];
  Categorias: Categories[];
  Editorial: Editorials[];
  
  constructor(data: any) {
    debugger;
    if (data == null) {
      this.Autores = new Array<Autors>();
      this.Categorias = new Array<Categories>();
      this.Editorial = new Array<Editorials>();
    }
    else {
      let jsonObj: any = JSON.parse(data);
      for (let prop in jsonObj) {
        this[prop] = jsonObj[prop];
      }
    }
  }
}
