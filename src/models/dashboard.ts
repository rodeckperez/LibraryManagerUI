export class Dashboard {
  CantidadReserva: number; 
  CantidadMora: number;
  CantidadUsuarios: number;
  CantidadDisponibles: number;
  Respuesta: string;

  constructor(data: any) {
    if (data == null) {
      this.CantidadDisponibles = 0;
      this.CantidadMora = 0;
      this.CantidadReserva = 0;
      this.CantidadUsuarios = 0;
      this.Respuesta = "";
    }
    else {
     let jsonObj: any = JSON.parse(data);
      for (let prop in jsonObj) {
        this[prop] = jsonObj[prop];
      }
    }
  }
}
