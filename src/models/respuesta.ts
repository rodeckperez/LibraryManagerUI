export class Respuesta {
  Codigo: number;
  Descripcion: string;

  constructor(data: any) {
    if (data == null) {
      this.Codigo = 0;
      this.Descripcion = ""; 
    }
    else {
      let jsonObj: any = JSON.parse(data);
      for (let prop in jsonObj) {
        this[prop] = jsonObj[prop];
      }
    }
  } 
}
