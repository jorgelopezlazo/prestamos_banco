import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from './services/clientes.service';
import { tap } from 'rxjs/operators';
import { Cliente } from './interfaces/cliente.interface';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmMontoComponent } from '../confirm-monto/confirm-monto.component';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  clientes: Cliente[] = [];
  constructor(private clienteSvc: ClientesService, private router: Router, public matDialog: MatDialog) { }

  displayedColumns: string[] = ['nombre', 'correo', 'cedula', 'valor_solicitado', 'fecha_pagar', 'estado_credito', 'pago_credito', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes() {
    this.clienteSvc.getClientes()
    .pipe(
      tap((clientes: Cliente[]) => {
        console.log(clientes)
        if (localStorage.getItem('ruta_menu') === 'aprobadas') {
          clientes = clientes.filter(item => item.solicitado && item.estado_credito)
        }
        if (localStorage.getItem('ruta_menu') === 'rechazadas') {
          clientes = clientes.filter(item => item.solicitado && item.estado_credito === false)
        }
        console.log(clientes)
        this.clientes = clientes
        this.dataSource = new MatTableDataSource(this.clientes)
      })
    )
    .subscribe();
  }  

  goTo(url: string) {
    this.router.navigate([url]);
  }

  openDialog(value: any) {
    console.log(value)
    let historial = value.historial
    this.matDialog.open(ConfirmDialogComponent, {
      data: historial,
    })
  }

  openDialogInput(value: any) {
    console.log(value)
    const dialogo1 = this.matDialog.open(ConfirmMontoComponent)
    dialogo1.afterClosed().subscribe(cantidad => {
      console.log(cantidad)
    });
  }

  solicitarPrestamo(data: any) {
    console.log(data)
    let random_boolean = true;
    let date = new Date();
    if (!data.solicitado) {
      random_boolean = Math.random() >= 0.5;
    }
    if(random_boolean) data.historial.push({
      'fecha_autorizado': date.toLocaleString("en-GB").substring(0,10),
      'prestamo': data.valor_solicitado
    })

    console.log(data)

    const cliente: Cliente = {
      id: data?.id,
      nombre: data?.nombre,
      correo: data?.correo,
      cedula: data?.cedula,
      valor_solicitado: data?.valor_solicitado,
      fecha_pagar: data?.fecha_pagar ?? '',
      estado_credito: random_boolean,
      pago_credito: false,
      solicitado: true,
      adeudo: random_boolean,
      historial: data.historial
    }

    console.log(cliente)

    this.clienteSvc.editCliente(cliente)
      .pipe(
        tap((cliente) => {
          console.log(cliente)
          this.listarClientes();
        })
      )
      .subscribe();
  }

  pagarPrestamo(data: any) {
    console.log(data)
    const cliente: Cliente = {
      id: data?.id,
      nombre: data?.nombre,
      correo: data?.correo,
      cedula: data?.cedula,
      valor_solicitado: data?.valor_solicitado,
      fecha_pagar: data?.fecha ?? '',
      estado_credito: true,
      pago_credito: true,
      solicitado: true,
      adeudo: false,
      historial: data.historial
    }

    console.log(cliente)

    this.clienteSvc.editCliente(cliente)
      .pipe(
        tap((cliente) => {
          console.log(cliente)
          this.listarClientes();
        })
      )
      .subscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    if (this.clientes.length) this.dataSource.paginator = this.paginator;

  }

}

