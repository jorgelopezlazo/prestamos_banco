import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../interfaces/cliente.interface';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  // @Input() cliente!: Cliente;
  constructor() { }

  ngOnInit(): void {
  }

}
