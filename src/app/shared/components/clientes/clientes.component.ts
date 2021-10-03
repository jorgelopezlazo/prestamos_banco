import { Component, OnInit } from '@angular/core';
import { ClientesService } from './services/clientes.service';
import { tap } from 'rxjs/operators';
import { Cliente } from './interfaces/cliente.interface';

// export interface PeriodicElement {
//   nombre: string;
//   correo: string;
//   cedula: string;
//   monto: number;
//   fecha: string;
//   aprobado: boolean;
// }

const ELEMENT_DATA: Cliente[] = [
  {id: 0, nombre: 'Juan Perez', correo: 'juan@gmail.com', cedula: 'JUPER058', valor_solicitado: 25000, fecha_pagar: '', estado_credito: true, pago_credito: false, solicitado: true, historial: []},
  {id: 1, nombre: 'Pedro López', correo: 'juan@gmail.com', cedula: 'JUPER058', valor_solicitado: 25000, fecha_pagar: '25/10/2021', estado_credito: true, pago_credito: false, solicitado: true, historial: []},
  {id: 2, nombre: 'Esteban Vega', correo: 'juan@gmail.com', cedula: 'JUPER058', valor_solicitado: 25000, fecha_pagar: '31/10/2021', estado_credito: false, pago_credito: false, solicitado: false, historial: []},
  // {nombre: 'Luis Perez', correo: 'juan@gmail.com', cedula: 'JUPER058', valor_solicitado: 25000, fecha_pagar: '', aprobado: true},
  // {nombre: 'Gabriel Perez', correo: 'juan@gmail.com', cedula: 'JUPER058', valor_solicitado: 25000, fecha_pagar: '', aprobado: true},
  // {nombre: 'Cesar Perez', correo: 'juan@gmail.com', cedula: 'JUPER058', valor_solicitado: 25000, fecha_pagar: '', aprobado: true},
  // {nombre: 'Jesús Perez', correo: 'juan@gmail.com', cedula: 'JUPER058', valor_solicitado: 25000, fecha_pagar: '', aprobado: true},
  // {nombre: 'Erick Perez', correo: 'juan@gmail.com', cedula: 'JUPER058', valor_solicitado: 25000, fecha_pagar: '', aprobado: true},
  // {nombre: 'Francisco Perez', correo: 'juan@gmail.com', cedula: 'JUPER058', valor_solicitado: 25000, fecha_pagar: '', aprobado: true},
];

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  // clientes!: Cliente[];
  // constructor(private clienteSvc: ClientesService) { }
  displayedColumns: string[] = ['nombre', 'correo', 'cedula', 'valor_solicitado', 'fecha_pagar', 'estado_credito', 'pago_credito'];
  dataSource = ELEMENT_DATA;
  ngOnInit(): void {
    // this.clienteSvc.getClientes()
    //   .pipe(
    //     tap((clientes: Cliente[]) => this.clientes = clientes)
    //   )
    //   .subscribe();
  }

}

