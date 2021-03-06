import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  constructor(private form: FormBuilder) {
  }

  ngOnInit(): void {
    
  }

  submitForm: FormGroup = this.form.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    cedula: ['', [Validators.required]],
    monto: ['', [Validators.required, Validators.min(10000), Validators.max(100000)]],
  })


  onSubmit() {
    if (!this.submitForm.valid) {
      return;
    }
    
    let values = this.submitForm.value
    values.estado_credito = false;
    values.pago_credito = false;
    values.solicitado = false;
    values.historial = [];
  }

}
