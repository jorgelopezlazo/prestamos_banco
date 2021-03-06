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
import { environment } from 'src/environments/environment';


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
        if (localStorage.getItem('ruta_menu') === 'aprobadas') {
          clientes = clientes.filter(item => item.solicitado && item.estado_credito)
        }
        if (localStorage.getItem('ruta_menu') === 'rechazadas') {
          clientes = clientes.filter(item => item.solicitado && item.estado_credito === false)
        }
        this.clientes = clientes
        this.dataSource = new MatTableDataSource(this.clientes)
        if (this.clientes.length) this.dataSource.paginator = this.paginator;
      })
    )
    .subscribe();
  }  

  goTo(url: string) {
    this.router.navigate([url]);
  }

  openDialog(value: any) {
    let historial = value.historial
    this.matDialog.open(ConfirmDialogComponent, {
      data: historial,
    })
  }

  openDialogInput(value: any) {
    const dialogo1 = this.matDialog.open(ConfirmMontoComponent)
    dialogo1.afterClosed().subscribe(cantidad => {
      value.valor_solicitado = cantidad.monto
      this.solicitarPrestamo(value)
    });
  }

  solicitarPrestamo(data: any) {
    let random_boolean = true;
    let date = new Date();
    if (!data.solicitado) {
      random_boolean = Math.random() >= 0.5;
    }
    if(random_boolean) {
      data.historial.push({
        'fecha_autorizado': date.toLocaleString("en-GB").substring(0,10),
        'prestamo': data.valor_solicitado
      })
    } 

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

    this.clienteSvc.editCliente(cliente)
      .pipe(
        tap((cliente) => {
          environment.capital = environment.capital - data.valor_solicitado
          this.listarClientes();
        })
      )
      .subscribe();
  }

  pagarPrestamo(data: any) {
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

    this.clienteSvc.editCliente(cliente)
      .pipe(
        tap((cliente) => {
          environment.capital = environment.capital + data.valor_solicitado
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
    console.log(this.clientes.length)
    if (this.clientes.length) this.dataSource.paginator = this.paginator;

  }

}

