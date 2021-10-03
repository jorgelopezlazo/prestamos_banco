import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from './services/clientes.service';
import { tap } from 'rxjs/operators';
import { Cliente } from './interfaces/cliente.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

// export interface PeriodicElement {
//   nombre: string;
//   correo: string;
//   cedula: string;
//   monto: number;
//   fecha: string;
//   aprobado: boolean;
// }


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  clientes: Cliente[] = [];
  constructor(private clienteSvc: ClientesService, private router: Router) { }
  // ELEMENT_DATA: Cliente[] = [
  //   {id: 0, nombre: 'Juan Perez', correo: 'juan@gmail.com', cedula: 'JUPER058', valor_solicitado: 25000, fecha_pagar: '', estado_credito: true, pago_credito: false, solicitado: true, historial: []},
  //   {id: 1, nombre: 'Pedro López', correo: 'juan@gmail.com', cedula: 'JUPER058', valor_solicitado: 25000, fecha_pagar: '25/10/2021', estado_credito: true, pago_credito: false, solicitado: true, historial: []},
  //   {id: 2, nombre: 'Esteban Vega', correo: 'juan@gmail.com', cedula: 'JUPER058', valor_solicitado: 25000, fecha_pagar: '31/10/2021', estado_credito: false, pago_credito: false, solicitado: false, historial: []},
  //   {id: 3, nombre: 'Juan Perez', correo: 'juan@gmail.com', cedula: 'JUPER058', valor_solicitado: 25000, fecha_pagar: '', estado_credito: true, pago_credito: false, solicitado: true, historial: []},
  //   {id: 4, nombre: 'Pedro López', correo: 'juan@gmail.com', cedula: 'JUPER058', valor_solicitado: 25000, fecha_pagar: '25/10/2021', estado_credito: true, pago_credito: false, solicitado: true, historial: []},
  //   {id: 5, nombre: 'Esteban Vega', correo: 'juan@gmail.com', cedula: 'JUPER058', valor_solicitado: 25000, fecha_pagar: '31/10/2021', estado_credito: false, pago_credito: false, solicitado: false, historial: []},
  //   {id: 6, nombre: 'Juan Perez', correo: 'juan@gmail.com', cedula: 'JUPER058', valor_solicitado: 25000, fecha_pagar: '', estado_credito: true, pago_credito: false, solicitado: true, historial: []},
  //   {id: 7, nombre: 'Pedro López', correo: 'juan@gmail.com', cedula: 'JUPER058', valor_solicitado: 25000, fecha_pagar: '25/10/2021', estado_credito: true, pago_credito: false, solicitado: true, historial: []},
  //   {id: 8, nombre: 'Esteban Vega', correo: 'juan@gmail.com', cedula: 'JUPER058', valor_solicitado: 25000, fecha_pagar: '31/10/2021', estado_credito: false, pago_credito: false, solicitado: false, historial: []},
  // ];

  displayedColumns: string[] = ['nombre', 'correo', 'cedula', 'valor_solicitado', 'fecha_pagar', 'estado_credito', 'pago_credito', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  ngOnInit(): void {
    this.clienteSvc.getClientes()
      .pipe(
        tap((clientes: Cliente[]) => {
          console.log(clientes)
          this.clientes = clientes
          this.dataSource = new MatTableDataSource(this.clientes)
        })
      )
      .subscribe();
    
    }
    ngAfterViewInit() {
      if(this.clientes.length) this.dataSource.paginator = this.paginator;
      
  }

  goTo(url: string){
    this.router.navigate([url]);
   }

  // cargarClientes() {
  //   this.clientes = this.clienteSvc.getClientes();
  // }
  
  detalleUsuario(obj: object){
    console.log(obj)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

