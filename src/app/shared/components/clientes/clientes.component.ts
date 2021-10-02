import { Component, OnInit } from '@angular/core';
import { ClientesService } from './services/clientes.service';
import { tap } from 'rxjs/operators';
import { Cliente } from './interfaces/cliente.interface';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes!: Cliente[];
  constructor(private clienteSvc: ClientesService) { }

  ngOnInit(): void {
    this.clienteSvc.getClientes()
      .pipe(
        tap((clientes: Cliente[]) => this.clientes = clientes)
      )
      .subscribe();
  }

}

