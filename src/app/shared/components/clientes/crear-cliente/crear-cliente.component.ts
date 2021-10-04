import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Cliente } from '../interfaces/cliente.interface';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss']
})
export class CrearClienteComponent implements OnInit {
  constructor(private form: FormBuilder, private clienteSvc: ClientesService, private router: Router) { }

  ngOnInit(): void {
  }

  submitForm: FormGroup = this.form.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    cedula: ['', [Validators.required]],
    monto: ['', [Validators.required, Validators.min(10000), Validators.max(100000)]],
    fecha: [''],
  })

  onSubmit() {
    if (!this.submitForm.valid) {
      return;
    }
    
    let values = this.submitForm.value
    values.id = `${values.cedula}-${(Math.round(Math.random() * (20000 - 10) + 10))}`
    if(values.fecha !== "") {
      var date = new Date(values.fecha);
      values.fecha = date.toLocaleString("en-GB").substring(0,10);
    }
    
    const cliente: Cliente = {
      id: values.id,
      nombre: values.nombre,
      correo: values.email,
      cedula: values.cedula,
      valor_solicitado: values.monto,
      fecha_pagar: values.fecha ?? '',
      estado_credito: false,
      pago_credito: false,
      solicitado: false,
      adeudo: false,
      historial: []
    }

    this.clienteSvc.addClientes(cliente)
      .pipe(
        tap((cliente) => {
          this.router.navigate(['clientes']);
        })
      )
      .subscribe();

  }

}
