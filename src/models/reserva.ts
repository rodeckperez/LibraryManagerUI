export class Reserva {
  FechaReserva: Date
  FechaFinReserva: Date
  IdUsuario: number
  IdLibro: number
  IdEstadoReserva: number

  constructor(data: any) {
    if (data == null) {
      this.FechaReserva = null;
      this.FechaFinReserva = null;
      this.IdUsuario = 0;
      this.IdLibro = 0;
      this.IdEstadoReserva = 1;

    }
    else {
      this.FechaReserva = data.FechaReserva;
      this.FechaFinReserva = data.FechaFinReserva;
      this.IdUsuario = data.IdUsuario;
      this.IdLibro = data.IdLibro;
      this.IdEstadoReserva = 1;
    }
  }
}
